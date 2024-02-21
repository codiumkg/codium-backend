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
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '@prisma/client';
import PaginationParams from 'src/interfaces/paginationParams';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() question: CreateTaskDto) {
    return this.taskService.create(question);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() { offset, limit }: PaginationParams) {
    return this.taskService.findAll(+offset, +limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateQuestionDto);
  }

  @HasRoles(Role.ADMIN, Role.TEACHER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
