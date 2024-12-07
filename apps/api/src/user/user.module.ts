import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UserController],
  providers: [UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}
