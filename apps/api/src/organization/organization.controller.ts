import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Manager } from './guards/organization-manager.guard';
import { ApiTags } from '@nestjs/swagger';
import { Admin } from '../auth/guards/admin.guard';
import { AuthenticatedRequest } from '../interfaces/authenticated-user.interface';

@Controller('organization')
@ApiTags('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get('me')
  me(@Req() req: AuthenticatedRequest) {
    return this.organizationService.getUserMemberships(req.user.userId);
  }

  @Post()
  @UseGuards(Admin)
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @Get()
  @UseGuards(Admin)
  findAll() {
    return this.organizationService.findAll();
  }

  @Get('user/:id')
  @UseGuards(Admin)
  getUserMemberships(@Param('id') id: string) {
    return this.organizationService.getUserMemberships(id);
  }

  @Get(':id')
  @UseGuards(Admin)
  findOne(@Param('id') id: string) {
    return this.organizationService.findOne(id);
  }

  // TODO:
  // Given: a user with many memberships
  // When: user requests organization memberships
  // Then:
  //    - admin can get all the organizations of an user
  //    - user member cannot use this endpoint
  //    - manager can get only the orgs of the user in which he is manager (no other)
  // User can have multiple roles: He could be organization manager for some orgs or member on different ones
  // @Get(':id/memberships')
  // @UseGuards(Manager)
  // getOrganizationMembers(@Param('id') id: string) {
  //   return this.organizationService.getOrganizationMembers(id);
  // }
}
