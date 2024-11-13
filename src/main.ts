import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { spawn } from 'child_process';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['debug', 'log'] });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  try {
    console.log('Starting a docker container for code execution...');

    spawn('docker', [
      'run',
      '-d',
      '-w',
      '/code_executor',
      '--name',
      'code_executor',
      'python:3.9-slim',
      'tail',
      '-f',
      '/dev/null',
    ]);

    console.log('Docker container started successfully.');
  } catch (e) {
    console.log('Failed to create the docker container.');
    console.error(e);
  }

  await app.listen(3000);
}
bootstrap();
