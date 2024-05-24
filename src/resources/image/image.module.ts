import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule],
  controllers: [ImageController],
})
export class ImageModule {}
