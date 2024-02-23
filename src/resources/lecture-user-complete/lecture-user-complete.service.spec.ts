import { Test, TestingModule } from '@nestjs/testing';
import { LectureUserCompleteService } from './lecture-user-complete.service';

describe('LectureUserCompleteService', () => {
  let service: LectureUserCompleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LectureUserCompleteService],
    }).compile();

    service = module.get<LectureUserCompleteService>(LectureUserCompleteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
