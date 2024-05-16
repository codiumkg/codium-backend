import { Module } from '@nestjs/common';
import { TopicContentService } from './topic-content.service';
import { TopicContentController } from './topic-content.controller';
import { PrismaService } from 'src/prisma.service';
import { TaskUserAnswerService } from '../task-user-answer/task-user-answer.service';
import { LectureUserCompleteService } from '../lecture-user-complete/lecture-user-complete.service';

@Module({
  controllers: [TopicContentController],
  providers: [
    TopicContentService,
    PrismaService,
    TaskUserAnswerService,
    LectureUserCompleteService,
  ],
})
export class TopicContentModule {}
