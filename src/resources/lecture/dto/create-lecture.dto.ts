import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLectureDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsNumber()
  @IsNotEmpty()
  topicId: number;
}
