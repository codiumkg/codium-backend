import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PresentationFiltersDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  topicId?: number;
}
