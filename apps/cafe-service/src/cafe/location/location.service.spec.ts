import { Test, TestingModule } from '@nestjs/testing';
import { CafeRepository } from '../cafe.repository';
import { LocationService } from './location.service';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: CafeRepository,
          useValue: { updateLocation: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
