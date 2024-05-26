import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class TopicFiltersDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  sectionId?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
