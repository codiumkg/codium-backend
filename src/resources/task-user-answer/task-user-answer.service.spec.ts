import { Test, TestingModule } from '@nestjs/testing';
import { TaskUserAnswerService } from './task-user-answer.service';

describe('TaskUserAnswerService', () => {
  let service: TaskUserAnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskUserAnswerService],
    }).compile();

    service = module.get<TaskUserAnswerService>(TaskUserAnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
