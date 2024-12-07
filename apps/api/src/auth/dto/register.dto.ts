import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    required: true,
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail({}, { message: 'Email must be valid' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    required: true,
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsEmail({}, { message: 'Confirmation email must be valid' })
  confirmEmail: string;

  @ApiProperty({
    required: true,
    minLength: 5,
    example: 'password123',
    description: 'User password (min 5 characters)',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(5, { message: 'Password must be at least 5 characters long' })
  password: string;
}
