import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { PrismaService } from 'src/prisma.service';
import { TopicContentService } from '../topic-content/topic-content.service';
import { LectureUserCompleteService } from '../lecture-user-complete/lecture-user-complete.service';
import { JwtService } from '@nestjs/jwt';
import { TaskUserAnswerService } from '../task-user-answer/task-user-answer.service';

@Module({
  controllers: [TopicController],
  providers: [
    TopicService,
    TopicContentService,
    LectureUserCompleteService,
    TaskUserAnswerService,
    JwtService,
    PrismaService,
  ],
})
export class TopicModule {}
