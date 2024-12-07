import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateStackDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: true })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ required: true })
  @IsUUID()
  @IsNotEmpty()
  organizationId: string;
}
