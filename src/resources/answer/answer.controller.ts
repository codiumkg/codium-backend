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
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '@prisma/client';

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
  findAll() {
    return this.answerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerService.findOne(+id);
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
}
