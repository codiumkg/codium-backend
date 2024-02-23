import { Test, TestingModule } from '@nestjs/testing';
import { LectureUserCompleteController } from './lecture-user-complete.controller';
import { LectureUserCompleteService } from './lecture-user-complete.service';

describe('LectureUserCompleteController', () => {
  let controller: LectureUserCompleteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LectureUserCompleteController],
      providers: [LectureUserCompleteService],
    }).compile();

    controller = module.get<LectureUserCompleteController>(LectureUserCompleteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
