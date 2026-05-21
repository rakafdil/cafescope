import { Test, TestingModule } from '@nestjs/testing';
import { CafeController } from './cafes.controller';

describe('CafeController', () => {
  let controller: CafeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CafeController],
    }).compile();

    controller = module.get<CafeController>(CafeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
