import { Module } from '@nestjs/common';
import { PresentationService } from './presentation.service';
import { PresentationController } from './presentation.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PresentationController],
  providers: [PresentationService, PrismaService],
  exports: [PresentationService],
})
export class PresentationModule {}
