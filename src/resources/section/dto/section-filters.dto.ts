import { IsOptional, IsString } from 'class-validator';

export class SectionFiltersDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  subjectId?: number;
}
