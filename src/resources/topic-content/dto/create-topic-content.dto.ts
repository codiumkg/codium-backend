import { TopicContentType } from '@prisma/client';

export class CreateTopicContentDto {
  type: TopicContentType;
  orderNumber?: number;
  taskId?: number;
  lectureId?: number;
  topicId: number;
}
