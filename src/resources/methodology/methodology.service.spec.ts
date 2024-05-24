import { Test, TestingModule } from '@nestjs/testing';
import { MethodologyService } from './methodology.service';

describe('MethodologyService', () => {
  let service: MethodologyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MethodologyService],
    }).compile();

    service = module.get<MethodologyService>(MethodologyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
