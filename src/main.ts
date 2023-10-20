import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api', { exclude: ['auth/login', 'auth/signup'] });
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
