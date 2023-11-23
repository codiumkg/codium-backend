import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQuizResultDto {
  @IsString()
  @IsNotEmpty()
  score: string;

  @IsString()
  @IsOptional()
  teacherMark: string;

  @IsNotEmpty()
  @IsNumber()
  quizId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
