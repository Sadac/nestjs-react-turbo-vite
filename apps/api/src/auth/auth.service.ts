import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterUserDto } from './dto/register.dto';
import { UsersService } from '../user/user.service';
import { UserType } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { RequestUser } from '../interfaces/authenticated-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private usersService: UsersService,
  ) {}

  async checkStatus(token: string) {
    if (!token) {
      return { authenticated: false };
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          email: true,
          type: true,
        },
      });

      if (!user) {
        return { authenticated: false };
      }

      return {
        authenticated: true,
      };
    } catch {
      return { authenticated: false };
    }
  }

  checkTokenBelongsToUser({
    loggedInUser,
    token,
  }: {
    loggedInUser: RequestUser;
    token: string;
  }) {
    const decodedUser = this.jwtService.decode(token);

    if (decodedUser.id !== loggedInUser.userId) {
      throw new BadRequestException('Invalid token');
    }
  }

  async login(user: LoginDto) {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: user.email },
      include: {
        memberships: true,
      },
    });

    if (!foundUser) {
      throw new NotFoundException('User not found');
    }

    if (
      foundUser.type !== UserType.ADMIN &&
      foundUser.memberships.length === 0
    ) {
      throw new ConflictException('User has no membership');
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      foundUser.password,
    );

    if (isPasswordValid) {
      return this.jwtService.sign(
        {
          id: foundUser.id,
          email: foundUser.email,
          type: foundUser.type,
          memberships: foundUser.memberships.map((m) => m.organizationId),
        },
        {
          expiresIn: '48h',
        },
      );
    }

    throw new NotFoundException('Wrong credentials');
  }

  async register(user: RegisterUserDto) {
    const { email, confirmEmail, password } = user;

    if (email !== confirmEmail) {
      throw new BadRequestException('Email does not match');
    }

    const defaultOrganization = await this.prisma.organization.findUnique({
      where: { id: process.env.DEFAULT_ORGANIZATION_ID },
    });

    if (!defaultOrganization) {
      throw new NotFoundException(`Default organization not found`);
    }

    const foundUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (foundUser) {
      throw new ConflictException(`Email ${email} already exists`);
    }

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        memberships: {
          create: {
            organization: {
              connect: { id: defaultOrganization.id },
            },
          },
        },
      },
    });
  }
}
