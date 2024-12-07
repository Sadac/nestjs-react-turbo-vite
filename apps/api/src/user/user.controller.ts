import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { Admin } from '../auth/guards/admin.guard';
import { AuthenticatedRequest } from 'src/interfaces/authenticated-user.interface';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(Admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(Admin)
  @ApiCreatedResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @ApiCreatedResponse({ type: UserEntity })
  me(@Req() req: AuthenticatedRequest) {
    return this.usersService.findOne(req.user.userId);
  }

  @Get(':id')
  @UseGuards(Admin)
  @ApiCreatedResponse({ type: UserEntity })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UseGuards(Admin)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(Admin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
