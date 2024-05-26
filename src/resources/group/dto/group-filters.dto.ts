import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class GroupFilterDto {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  teacherId?: number;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  search?: string;
}
