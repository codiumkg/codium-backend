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
import { Role, User } from '@prisma/client';
import { GetUser } from 'src/decorators/user.decorator';
import { TaskFiltersDto } from './dto/task-filters.dto';

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
  findAll(@Query() filtersDto: TaskFiltersDto, @GetUser() user: User) {
    return this.taskService.findAll(user, filtersDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.taskService.findOne(+id, user);
  }

  @Get(':id/get-user-answer')
  getCurrentUserAnswer(@Param('id') id: string, @GetUser() user: User) {
    return this.taskService.getCurrentUserAnswer(+id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/save-custom-answer')
  saveCustomAnswer(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() body: { text: string },
  ) {
    return this.taskService.saveCustomAnswer(+id, body.text, user);
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
