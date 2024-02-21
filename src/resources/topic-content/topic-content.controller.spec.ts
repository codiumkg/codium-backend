import { Test, TestingModule } from '@nestjs/testing';
import { TopicContentController } from './topic-content.controller';
import { TopicContentService } from './topic-content.service';

describe('TopicContentController', () => {
  let controller: TopicContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicContentController],
      providers: [TopicContentService],
    }).compile();

    controller = module.get<TopicContentController>(TopicContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
