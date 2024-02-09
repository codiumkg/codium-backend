import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService],
})
export class TaskModule {}
