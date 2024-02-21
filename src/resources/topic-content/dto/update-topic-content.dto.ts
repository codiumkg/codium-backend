import { PartialType } from '@nestjs/swagger';
import { CreateTopicContentDto } from './create-topic-content.dto';

export class UpdateTopicContentDto extends PartialType(CreateTopicContentDto) {}
