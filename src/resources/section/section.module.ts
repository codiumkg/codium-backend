import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TopicService } from '../topic/topic.service';

@Module({
  controllers: [SectionController],
  providers: [SectionService, PrismaService, TopicService, JwtService],
})
export class SectionModule {}
