import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskUserAnswerModule } from '../task-user-answer/task-user-answer.module';
import { AnswerModule } from '../answer/answer.module';

@Module({
  imports: [TaskUserAnswerModule, AnswerModule],
  controllers: [TaskController],
  providers: [TaskService, PrismaService],
  exports: [TaskService],
})
export class TaskModule {}
