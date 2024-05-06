import { PartialType } from '@nestjs/swagger';
import { CreateTaskUserAnswerDto } from './create-task-user-answer.dto';

export class UpdateTaskUserAnswerDto extends PartialType(CreateTaskUserAnswerDto) {}
