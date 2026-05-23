import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CAFES_PATTERNS,
  CreateCafeDto,
  CreateClaimDto,
  FacilityDto,
  LocationDto,
  UpdateCafeDto,
  UpdateClaimStatusDto,
  UpdateOperationalHoursDto,
} from '@cafescope/contracts';
import { CafeService } from './cafe.service';
import { ClaimService } from './claim/claim.service';
import { FacilityService } from './facility/facility.service';
import { LocationService } from './location/location.service';
import { OperationalHoursService } from './operational-hours/operational-hours.service';
import { CafeRegistrationService } from './registration/registration.service';

console.log(CAFES_PATTERNS);
console.log(CAFES_PATTERNS.FIND_ONE);

@Controller()
export class CafeController {
  constructor(
    private readonly cafeService: CafeService,
    private readonly cafeRegistrationService: CafeRegistrationService,
    private readonly locationService: LocationService,
    private readonly facilityService: FacilityService,
    private readonly operationalHoursService: OperationalHoursService,
    private readonly claimService: ClaimService,
  ) {}

  // ==========================================
  // BASIC CRUD OPERATIONS
  // ==========================================

  @MessagePattern(CAFES_PATTERNS.FIND_ALL)
  async findAll() {
    return this.cafeService.findAll();
  }

  @MessagePattern(CAFES_PATTERNS.FIND_ONE)
  findOne(@Payload() data: { id: string }) {
    return this.cafeService.findOne(data.id);
  }

  @MessagePattern(CAFES_PATTERNS.CREATE)
  async createCafe(@Payload() dto: CreateCafeDto) {
    return this.cafeRegistrationService.registerNewCafe(dto);
  }

  @MessagePattern(CAFES_PATTERNS.UPDATE)
  async updateCafeInfo(@Payload() data: { id: string; dto: UpdateCafeDto }) {
    return this.cafeRegistrationService.updateCafeInfo(data.id, data.dto);
  }

  @MessagePattern(CAFES_PATTERNS.REMOVE)
  async removeCafe(@Payload() id: string) {
    return this.cafeService.remove(id);
  }

  // ==========================================
  // GRANULAR DOMAIN OPERATIONS
  // ==========================================

  @MessagePattern(CAFES_PATTERNS.UPDATE_LOCATION)
  async updateLocation(@Payload() data: { id: string; dto: LocationDto }) {
    return this.locationService.manageGeospatialLocation(data.id, data.dto);
  }

  @MessagePattern(CAFES_PATTERNS.UPDATE_FACILITIES)
  async updateFacilities(@Payload() data: { id: string; dto: FacilityDto }) {
    return this.facilityService.updateFacilities(data.id, data.dto);
  }

  @MessagePattern(CAFES_PATTERNS.UPDATE_OPERATIONAL_HOURS)
  updateOperationalHours(
    @Payload() data: { id: string; dto: UpdateOperationalHoursDto },
  ) {
    return this.operationalHoursService.updateOperationalHours(
      data.id,
      data.dto.hours,
    );
  }

  @MessagePattern(CAFES_PATTERNS.REMOVE_LOCATION)
  async removeLocation(@Payload() id: string) {
    return this.locationService.removeLocation(id);
  }

  @MessagePattern(CAFES_PATTERNS.REMOVE_FACILITIES)
  async removeFacilities(@Payload() id: string) {
    return this.facilityService.removeFacilities(id);
  }

  @MessagePattern(CAFES_PATTERNS.REMOVE_OPERATIONAL_HOURS)
  async removeOperationalHours(@Payload() id: string) {
    return this.operationalHoursService.removeOperationalHours(id);
  }

  @MessagePattern(CAFES_PATTERNS.GEOCODING)
  async geocodeAddress(@Payload() id: string) {
    return this.locationService.geocodeAndSaveLocation(id);
  }

  // ==========================================
  // CLAIM DOMAIN OPERATIONS
  // ==========================================

  @MessagePattern(CAFES_PATTERNS.CREATE_CLAIM)
  createClaim(@Payload() dto: CreateClaimDto) {
    return this.claimService.createClaim(dto);
  }

  @MessagePattern(CAFES_PATTERNS.UPDATE_CLAIM_STATUS)
  async updateClaimStatus(
    @Payload() data: { id: string; dto: UpdateClaimStatusDto },
  ) {
    return this.claimService.updateClaimStatus(data.id, data.dto.status);
  }
}
