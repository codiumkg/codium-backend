import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TopicService } from '../topic/topic.service';
import { TopicContentService } from '../topic-content/topic-content.service';
import { LectureUserCompleteService } from '../lecture-user-complete/lecture-user-complete.service';
import { TaskUserAnswerService } from '../task-user-answer/task-user-answer.service';

@Module({
  controllers: [SectionController],
  providers: [
    SectionService,
    PrismaService,
    TopicService,
    TopicContentService,
    LectureUserCompleteService,
    TaskUserAnswerService,
    JwtService,
  ],
})
export class SectionModule {}
