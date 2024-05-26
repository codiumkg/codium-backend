import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class LectureFiltersDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  topicId?: number;
}
