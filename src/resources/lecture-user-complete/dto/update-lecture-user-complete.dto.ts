import { PartialType } from '@nestjs/swagger';
import { CreateLectureUserCompleteDto } from './create-lecture-user-complete.dto';

export class UpdateLectureUserCompleteDto extends PartialType(CreateLectureUserCompleteDto) {}
