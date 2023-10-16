import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateContentDto {
  @IsNumber()
  quizId: number;
  @IsNumber()
  lectureId: number;

  @IsNumber()
  sectionId: number;

  @IsString()
  @IsNotEmpty()
  title: string;
}
