import { Test, TestingModule } from '@nestjs/testing';
import { RegRequestService } from './reg-request.service';

describe('RegRequestService', () => {
  let service: RegRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegRequestService],
    }).compile();

    service = module.get<RegRequestService>(RegRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
