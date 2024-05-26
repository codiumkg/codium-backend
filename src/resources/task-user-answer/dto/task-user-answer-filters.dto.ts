import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class TaskUserAnswerFiltersDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  topicId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  userId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  taskId?: number;
}
