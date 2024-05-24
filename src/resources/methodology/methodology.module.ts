import { Module } from '@nestjs/common';
import { MethodologyService } from './methodology.service';
import { MethodologyController } from './methodology.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MethodologyController],
  providers: [MethodologyService, PrismaService],
  exports: [MethodologyService],
})
export class MethodologyModule {}
