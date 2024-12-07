import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStackDto } from './dto/create-stack.dto';
import { UserType } from '@prisma/client';
import { RequestUser } from '../interfaces/authenticated-user.interface';

@Injectable()
export class StackService {
  constructor(private prisma: PrismaService) {}

  async create(createStackDto: CreateStackDto, actor: RequestUser) {
    const {
      userId,
      name: stackName,
      description: stackDescription,
      organizationId,
    } = createStackDto;

    if (actor.type !== UserType.ADMIN && actor.userId !== userId) {
      throw new ForbiddenException('User can not create stack');
    }

    const foundUser = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        memberships: true,
      },
    });

    if (!foundUser) throw new NotFoundException('User not found');

    const isMember = foundUser.memberships.some(
      (membership) => membership.organizationId === organizationId,
    );

    if (!isMember) {
      throw new ForbiddenException(
        'User is not an organization member. It can not have a stack here yet.',
      );
    }

    const stackOrgIsNotUnique = await this.prisma.stack.findFirst({
      where: {
        name: stackName,
        userId,
        user: {
          memberships: {
            some: {
              organizationId,
            },
          },
        },
      },
    });

    if (stackOrgIsNotUnique) {
      throw new ConflictException(
        `There is already a stack with the name [${stackName}] for the user [${foundUser.firstName}] on the organization [${organizationId}]`,
      );
    }

    return this.prisma.stack.create({
      data: {
        name: stackName,
        description: stackDescription,
        userId,
      },
    });
  }
}
