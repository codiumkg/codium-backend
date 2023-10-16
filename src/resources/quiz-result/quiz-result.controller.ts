import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { QuizResultService } from './quiz-result.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '@prisma/client';
import { CreateQuizResultDto } from 'src/resources/quiz-result/dto/quiz-result.dto';

@Controller('api/quiz-results')
export class QuizResultController {
  constructor(private readonly quizResultService: QuizResultService) {
    this.quizResultService = quizResultService;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.quizResultService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(id: string) {
    return this.quizResultService.getById(+id);
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() quizResult: CreateQuizResultDto) {
    return this.quizResultService.create(quizResult);
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() quizResult: Partial<CreateQuizResultDto>,
  ) {
    return this.quizResultService.update(+id, quizResult);
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.quizResultService.delete(+id);
  }
}