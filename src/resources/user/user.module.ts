import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { TopicModule } from '../topic/topic.module';
import { TopicContentModule } from '../topic-content/topic-content.module';
import { SectionModule } from '../section/section.module';
import { GroupModule } from '../group/group.module';
import { TaskUserAnswerModule } from '../task-user-answer/task-user-answer.module';

@Module({
  imports: [
    TopicModule,
    TopicContentModule,
    SectionModule,
    GroupModule,
    TaskUserAnswerModule,
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
