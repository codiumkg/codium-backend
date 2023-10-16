import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateContentDto {
  @IsNumber()
  quizId: number;
  @IsNumber()
  lectureId: number;

  @IsString()
  @IsNotEmpty()
  title: string;
}
