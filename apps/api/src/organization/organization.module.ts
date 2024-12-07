import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [OrganizationService],
  controllers: [OrganizationController],
  imports: [PrismaModule],
})
export class OrganizationModule {}
