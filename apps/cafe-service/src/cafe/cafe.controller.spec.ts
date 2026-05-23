import { Test, TestingModule } from '@nestjs/testing';
import { CafeController } from './cafe.controller';
import { CafeService } from './cafe.service';
import { ClaimService } from './claim/claim.service';
import { FacilityService } from './facility/facility.service';
import { LocationService } from './location/location.service';
import { OperationalHoursService } from './operational-hours/operational-hours.service';
import { CafeRegistrationService } from './registration/registration.service';

describe('CafeController', () => {
  let controller: CafeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CafeController],
      providers: [
        { provide: CafeService, useValue: { findAll: jest.fn() } },
        {
          provide: CafeRegistrationService,
          useValue: { registerNewCafe: jest.fn() },
        },
        {
          provide: LocationService,
          useValue: { manageGeospatialLocation: jest.fn() },
        },
        {
          provide: FacilityService,
          useValue: { updateFacilities: jest.fn() },
        },
        {
          provide: OperationalHoursService,
          useValue: { updateOperationalHours: jest.fn() },
        },
        { provide: ClaimService, useValue: { createClaim: jest.fn() } },
      ],
    }).compile();

    controller = module.get<CafeController>(CafeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
