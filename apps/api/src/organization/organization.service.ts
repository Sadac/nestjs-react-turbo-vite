import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    return this.prisma.organization.create({
      data: createOrganizationDto,
    });
  }

  async findAll() {
    return this.prisma.organization.findMany();
  }

  async findOne(id: string) {
    return this.prisma.organization.findUnique({
      where: { id },
    });
  }

  async getUserMemberships(id: string) {
    const userMemberships = await this.prisma.organizationMembership.findMany({
      where: {
        userId: id,
      },
      include: {
        organization: true,
      },
    });

    if (!userMemberships || userMemberships.length === 0) {
      throw new NotFoundException('User is not member of any organization');
    }

    return userMemberships;
  }

  getOrganizationMembers(id: string) {
    return this.prisma.organizationMembership.findMany({
      where: {
        organizationId: id,
      },
      include: {
        user: true,
        organization: true,
      },
    });
  }
}
