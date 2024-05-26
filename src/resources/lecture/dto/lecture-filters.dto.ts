import { IsOptional, IsString } from 'class-validator';

export class LectureFiltersDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  topicId?: number;
}
