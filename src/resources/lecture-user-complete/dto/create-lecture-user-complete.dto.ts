import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLectureUserCompleteDto {
  @IsNumber()
  @IsNotEmpty()
  lectureId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
