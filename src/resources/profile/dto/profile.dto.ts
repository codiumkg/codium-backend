import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsNumber()
  @IsPositive()
  userId: number;
}
