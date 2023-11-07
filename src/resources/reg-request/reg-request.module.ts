import { Module } from '@nestjs/common';
import { RegRequestService } from './reg-request.service';
import { RegRequestController } from './reg-request.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RegRequestController],
  providers: [RegRequestService, PrismaService],
})
export class RegRequestModule {}
