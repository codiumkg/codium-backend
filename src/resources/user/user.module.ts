import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { SectionService } from '../section/section.service';
import { GroupService } from '../group/group.service';
import { TopicService } from '../topic/topic.service';
import { TopicContentService } from '../topic-content/topic-content.service';
import { LectureUserCompleteService } from '../lecture-user-complete/lecture-user-complete.service';
import { TaskUserAnswerService } from '../task-user-answer/task-user-answer.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    SectionService,
    GroupService,
    TopicService,
    TopicContentService,
    LectureUserCompleteService,
    TaskUserAnswerService,
    PrismaService,
  ],
})
export class UserModule {}
