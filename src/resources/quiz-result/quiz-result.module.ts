import { Module } from '@nestjs/common';
import { QuizResultController } from './quiz-result.controller';
import { QuizResultService } from './quiz-result.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [QuizResultController],
  providers: [QuizResultService, PrismaService],
})
export class QuizResultModule {}
