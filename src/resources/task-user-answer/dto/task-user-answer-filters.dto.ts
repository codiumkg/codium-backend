import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class TaskUserAnswerFiltersDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  topicId?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  userId?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  taskId?: number;
}
