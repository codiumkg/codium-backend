import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { AnswerService } from '../answer/answer.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService, AnswerService],
})
export class TaskModule {}
