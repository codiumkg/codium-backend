import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class SectionFiltersDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  subjectId?: number;
}
