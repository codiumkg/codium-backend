import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role, User } from '@prisma/client';
import PaginationParams from 'src/interfaces/paginationParams';
import { GetUser } from 'src/decorators/user.decorator';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(createAnswerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query() { offset, limit }: PaginationParams,
    @GetUser() user: User,
  ) {
    const answers = await this.answerService.findAll(+offset, +limit);

    if (user.role !== Role.STUDENT) {
      return answers;
    }

    return answers.map((answer) => ({ ...answer, isCorrectAnswer: null }));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @GetUser() user: User) {
    const answer = await this.answerService.findOne(+id);

    if (user.role !== Role.STUDENT) {
      return answer;
    }

    return { ...answer, isCorrectAnswer: null };
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(+id, updateAnswerDto);
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/check-answer')
  checkIfIsCorrect(@Param('id') id: string) {
    return this.answerService.checkIfIsCorrect(+id);
  }
}
