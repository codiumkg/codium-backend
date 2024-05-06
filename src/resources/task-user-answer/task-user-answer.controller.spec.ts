import { Test, TestingModule } from '@nestjs/testing';
import { TaskUserAnswerController } from './task-user-answer.controller';
import { TaskUserAnswerService } from './task-user-answer.service';

describe('TaskUserAnswerController', () => {
  let controller: TaskUserAnswerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskUserAnswerController],
      providers: [TaskUserAnswerService],
    }).compile();

    controller = module.get<TaskUserAnswerController>(TaskUserAnswerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
