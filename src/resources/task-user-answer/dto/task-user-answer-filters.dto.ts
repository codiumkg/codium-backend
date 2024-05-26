import { IsOptional } from 'class-validator';

export class TaskUserAnswerFiltersDto {
  @IsOptional()
  topicId?: number;

  @IsOptional()
  userId?: number;

  @IsOptional()
  taskId?: number;
}
