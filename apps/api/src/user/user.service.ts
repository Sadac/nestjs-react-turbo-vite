import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const defaultOrganization = await this.prisma.organization.findUnique({
      where: { id: process.env.DEFAULT_ORGANIZATION_ID },
    });

    if (!defaultOrganization) {
      throw new NotFoundException(`Default organization not found`);
    }

    const foundUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (foundUser) {
      throw new ConflictException(
        `Email ${createUserDto.email} already exists`,
      );
    }

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    const { password, ...user } = await this.prisma.user.create({
      data: {
        ...createUserDto,
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

    return user;
  }

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        telephone: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
        type: true,
        memberships: true,
      },
    });
  }

  async findOne(id: string) {
    const user = this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        telephone: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
        type: true,
        memberships: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { password, ...user } = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    return user;
  }

  async remove(id: string) {
    const foundUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!foundUser) {
      throw new NotFoundException(`User not found`);
    }

    const { id: userId } = await this.prisma.user.delete({ where: { id } });

    return `User ${userId} deleted`;
  }
}
