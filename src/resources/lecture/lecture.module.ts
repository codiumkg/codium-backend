import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [LectureController],
  providers: [LectureService, PrismaService, JwtService],
  exports: [LectureService],
})
export class LectureModule {}
