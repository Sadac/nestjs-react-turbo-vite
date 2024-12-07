import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { OrganizationService } from '../organization.service';
import { AuthenticatedRequest } from 'src/interfaces/authenticated-user.interface';
import { UserType, OrganizationMemberRole } from '@prisma/client';

/**
 * @Manager
 * @description allows admins or organization members to access a given organization
 */
@Injectable()
export class Manager implements CanActivate {
  constructor(private orgService: OrganizationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthenticatedRequest = context.switchToHttp().getRequest();
    const { userId, type } = request.user;
    const { id: organizationId } = request.params;

    if (type === UserType.ADMIN) return true;

    const memberships = await this.orgService.getUserMemberships(userId);

    if (memberships.length === 0) {
      throw new ForbiddenException('User does not belong to any organization');
    }

    const membership = memberships.find(
      (m) => m.organizationId === organizationId,
    );

    if (!membership) {
      throw new ForbiddenException(
        'User is not a member of the requested organization',
      );
    }

    if (membership.role !== OrganizationMemberRole.MANAGER) {
      throw new ForbiddenException('User is not manager');
    }

    return true;
  }
}
