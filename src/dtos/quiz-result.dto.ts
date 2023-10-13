import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuizResultDto {
  @IsString()
  @IsNotEmpty()
  score: string;

  @IsNotEmpty()
  @IsNumber()
  quizId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
