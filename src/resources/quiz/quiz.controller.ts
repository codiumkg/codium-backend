import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from 'src/resources/quiz/dto/quiz.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '@prisma/client';

@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {
    this.quizService = quizService;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getQuizzes(@Query('topicId') topicId: string) {
    if (topicId) {
      return this.quizService.findAllByTopic(+topicId);
    }

    return this.quizService.getQuizzes();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getQuizById(@Param() id: string) {
    return this.quizService.getQuizById(+id);
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createQuiz(@Body() quiz: CreateQuizDto) {
    return this.quizService.createQuiz(quiz);
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateQuiz(@Param() id: string, @Body() quiz: Partial<CreateQuizDto>) {
    return this.quizService.updateQuiz(+id, quiz);
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteQuiz(@Param() id: string) {
    return this.quizService.deleteQuiz(+id);
  }
}
