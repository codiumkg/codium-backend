import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsBoolean()
  isCorrectAnswer: boolean;

  @IsNotEmpty()
  @IsNumber()
  questionId: number;
}
