import { Test, TestingModule } from '@nestjs/testing';
import { MethodologyController } from './methodology.controller';
import { MethodologyService } from './methodology.service';

describe('MethodologyController', () => {
  let controller: MethodologyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MethodologyController],
      providers: [MethodologyService],
    }).compile();

    controller = module.get<MethodologyController>(MethodologyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
