import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class UserFiltersDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  groupId?: number;
}
