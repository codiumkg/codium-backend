import { IsOptional, IsString } from 'class-validator';

export class SubjectFiltersDto {
  @IsOptional()
  @IsString()
  search?: string;
}
