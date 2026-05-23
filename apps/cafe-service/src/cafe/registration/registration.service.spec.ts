import { Test, TestingModule } from '@nestjs/testing';
import { CafeRepository } from '../cafe.repository';
import { CafeRegistrationService } from './registration.service';

describe('CafeRegistrationService', () => {
  let service: CafeRegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CafeRegistrationService,
        {
          provide: CafeRepository,
          useValue: {
            createCafe: jest.fn(),
            updateLocation: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CafeRegistrationService>(CafeRegistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
