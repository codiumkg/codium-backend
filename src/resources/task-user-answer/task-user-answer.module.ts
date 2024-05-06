import { Module } from '@nestjs/common';
import { TaskUserAnswerService } from './task-user-answer.service';
import { TaskUserAnswerController } from './task-user-answer.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TaskUserAnswerController],
  providers: [TaskUserAnswerService, PrismaService],
})
export class TaskUserAnswerModule {}
