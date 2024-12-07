import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OrganizationModule } from './organization/organization.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { StackModule } from './stack/stack.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    OrganizationModule,
    StackModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'web', 'dist'),
      renderPath: '*',
    }),
  ],
  controllers: [],
  providers: [JwtAuthGuard],
})
export class AppModule {}
