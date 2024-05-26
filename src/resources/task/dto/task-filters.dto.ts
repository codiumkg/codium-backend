import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class TaskFiltersDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  topicId?: number;
}
