import { Module } from '@nestjs/common';
import { LectureUserCompleteService } from './lecture-user-complete.service';
import { LectureUserCompleteController } from './lecture-user-complete.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [LectureUserCompleteController],
  providers: [LectureUserCompleteService, PrismaService],
})
export class LectureUserCompleteModule {}
