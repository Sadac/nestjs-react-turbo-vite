import { UserType } from '@prisma/client';
import { Request } from 'express';

export interface RequestUser {
  userId: string;
  email: string;
  type: UserType;
  memberships: string[];
}

export interface AuthenticatedRequest extends Request {
  user: RequestUser;
}
