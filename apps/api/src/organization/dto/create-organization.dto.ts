import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({ required: true, description: 'The name of the organization' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
