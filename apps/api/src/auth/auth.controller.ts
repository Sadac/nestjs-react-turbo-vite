import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Res,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register.dto';
import { AuthenticatedRequest } from 'src/interfaces/authenticated-user.interface';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('status')
  @Public()
  async checkStatus(@Req() request: Request) {
    return this.authService.checkStatus(request.cookies['token']);
  }

  @Post('login')
  @Public()
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    // TODO: improve security with refresh token
    const token = await this.authService.login(data);

    response.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 48 * 60 * 60 * 1000,
    });

    return { success: true };
  }

  @Post('logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Req() req: AuthenticatedRequest,
  ) {
    this.authService.checkTokenBelongsToUser({
      loggedInUser: req.user,
      token: req.cookies['token'],
    });

    response.clearCookie('token');

    return { success: true };
  }

  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  register(@Body() data: RegisterUserDto) {
    return this.authService.register(data);
  }
}
