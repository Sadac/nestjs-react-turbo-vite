import { Module } from '@nestjs/common';
import { StackService } from './stack.service';
import { StackController } from './stack.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [StackController],
  providers: [StackService],
  imports: [PrismaModule],
})
export class StackModule {}
