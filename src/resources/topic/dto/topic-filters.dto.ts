import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class TopicFiltersDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  sectionId?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
