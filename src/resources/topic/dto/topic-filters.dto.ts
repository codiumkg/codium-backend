import { IsOptional, IsString } from 'class-validator';

export class TopicFiltersDto {
  @IsOptional()
  sectionId?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
