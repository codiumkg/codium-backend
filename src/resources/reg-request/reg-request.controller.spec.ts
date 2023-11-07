import { Test, TestingModule } from '@nestjs/testing';
import { RegRequestController } from './reg-request.controller';
import { RegRequestService } from './reg-request.service';

describe('RegRequestController', () => {
  let controller: RegRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegRequestController],
      providers: [RegRequestService],
    }).compile();

    controller = module.get<RegRequestController>(RegRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
