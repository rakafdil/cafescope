import { Test, TestingModule } from '@nestjs/testing';
import { CafeRepository } from '../cafe.repository';
import { ClaimService } from './claim.service';

describe('ClaimService', () => {
  let service: ClaimService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClaimService,
        {
          provide: CafeRepository,
          useValue: { createClaim: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<ClaimService>(ClaimService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
