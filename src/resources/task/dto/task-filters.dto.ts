import { IsOptional, IsString } from 'class-validator';

export class TaskFiltersDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsOptional()
  topicId?: number;
}
