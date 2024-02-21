import { Test, TestingModule } from '@nestjs/testing';
import { TopicContentService } from './topic-content.service';

describe('TopicContentService', () => {
  let service: TopicContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicContentService],
    }).compile();

    service = module.get<TopicContentService>(TopicContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
