import { IsOptional, IsString } from 'class-validator';

export class GroupFilterDto {
  @IsOptional()
  teacherId?: number;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  search?: string;
}
