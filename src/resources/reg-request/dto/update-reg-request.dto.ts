import { PartialType } from '@nestjs/swagger';
import { CreateRegRequestDto } from './create-reg-request.dto';

export class UpdateRegRequestDto extends PartialType(CreateRegRequestDto) {}
