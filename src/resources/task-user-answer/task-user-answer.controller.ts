import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskUserAnswerService } from './task-user-answer.service';
import { CreateTaskUserAnswerDto } from './dto/create-task-user-answer.dto';
import { UpdateTaskUserAnswerDto } from './dto/update-task-user-answer.dto';

@Controller('task-user-answer')
export class TaskUserAnswerController {
  constructor(private readonly taskUserAnswerService: TaskUserAnswerService) {}

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskUserAnswerDto: UpdateTaskUserAnswerDto) {
    return this.taskUserAnswerService.update(+id, updateTaskUserAnswerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskUserAnswerService.remove(+id);
  }
}
