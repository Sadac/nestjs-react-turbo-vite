import { ApiProperty } from '@nestjs/swagger';
import { User, UserType } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: false })
  telephone?: string;

  @ApiProperty({ required: false })
  firstName?: string;

  @ApiProperty({ required: false })
  lastName?: string;

  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ required: false, default: 'USER' })
  type?: UserType = 'USER';
}
