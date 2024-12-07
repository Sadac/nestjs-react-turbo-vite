import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const jwtAuthGuard = app.get(JwtAuthGuard);

  app.use(cookieParser());

  app.useGlobalGuards(jwtAuthGuard);

  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('Medieval Script')
    .setDescription('The Medieval AAPI description')
    .setVersion('0.1')
    .addCookieAuth('token')
    .addSecurityRequirements('bearer')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('openapi', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.enableCors({
    origin: 'http://localhost:5173', // server base url
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
