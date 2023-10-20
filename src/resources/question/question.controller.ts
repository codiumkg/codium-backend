import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '@prisma/client';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
