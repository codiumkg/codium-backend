import { Module } from '@nestjs/common';
import { TopicContentService } from './topic-content.service';
import { TopicContentController } from './topic-content.controller';
import { PrismaService } from 'src/prisma.service';
import { LectureUserCompleteModule } from '../lecture-user-complete/lecture-user-complete.module';
import { TaskUserAnswerModule } from '../task-user-answer/task-user-answer.module';

@Module({
  imports: [LectureUserCompleteModule, TaskUserAnswerModule],
  controllers: [TopicContentController],
  providers: [TopicContentService, PrismaService],
  exports: [TopicContentService],
})
export class TopicContentModule {}
