import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateStackDto } from './dto/create-stack.dto';
import { StackService } from './stack.service';
import { AuthenticatedRequest } from 'src/interfaces/authenticated-user.interface';

@Controller('stack')
@ApiTags('stack')
export class StackController {
  constructor(private readonly stackService: StackService) {}

  @Post()
  create(
    @Body() createStackDto: CreateStackDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.stackService.create(createStackDto, req.user);
  }
}
