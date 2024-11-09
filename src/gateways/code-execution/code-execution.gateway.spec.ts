import { Test, TestingModule } from '@nestjs/testing';
import { CodeExecutionGateway } from './code-execution.gateway';

describe('CodeExecutionGateway', () => {
  let gateway: CodeExecutionGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeExecutionGateway],
    }).compile();

    gateway = module.get<CodeExecutionGateway>(CodeExecutionGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
