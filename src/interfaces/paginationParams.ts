import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

class PaginationParams {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  offset?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  limit?: number;
}

export default PaginationParams;
