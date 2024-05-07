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
import { TaskUserAnswerService } from './task-user-answer.service';
import { CreateTaskUserAnswerDto } from './dto/create-task-user-answer.dto';
import { UpdateTaskUserAnswerDto } from './dto/update-task-user-answer.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles-guard/roles-guard.guard';
import { HasRoles } from '../auth/has-roles.decorator';
import { Role } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('task-user-answer')
export class TaskUserAnswerController {
  constructor(private readonly taskUserAnswerService: TaskUserAnswerService) {}

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createTaskUserAnswerDto: CreateTaskUserAnswerDto) {
    return this.taskUserAnswerService.create(createTaskUserAnswerDto);
  }

  @Get()
  findAll() {
    return this.taskUserAnswerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskUserAnswerService.findOne(+id);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskUserAnswerDto: UpdateTaskUserAnswerDto,
  ) {
    return this.taskUserAnswerService.update(+id, updateTaskUserAnswerDto);
  }

  @HasRoles(Role.ADMIN, Role.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskUserAnswerService.remove(+id);
  }
}
