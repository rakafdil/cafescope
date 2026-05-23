/* eslint-disable @typescript-eslint/no-unsafe-return */
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
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CafeService {
  constructor(@Inject('CAFE_SERVICE') private cafeClient: ClientProxy) {}

  findAll() {
    return this.cafeClient.send(CAFES_PATTERNS.FIND_ALL, {});
  }

  async findOne(id: string) {
    return await firstValueFrom(
      this.cafeClient.send(CAFES_PATTERNS.FIND_ONE, { id }),
    );
  }

  create(dto: CreateCafeDto) {
    return this.cafeClient.send(CAFES_PATTERNS.CREATE, dto);
  }

  update(id: string, dto: UpdateCafeDto) {
    return this.cafeClient.send(CAFES_PATTERNS.UPDATE, { id, dto });
  }

  remove(id: string) {
    return this.cafeClient.send(CAFES_PATTERNS.REMOVE, id);
  }

  updateLocation(id: string, dto: LocationDto) {
    return this.cafeClient.send(CAFES_PATTERNS.UPDATE_LOCATION, { id, dto });
  }

  geocodeAddress(id: string) {
    return this.cafeClient.send(CAFES_PATTERNS.GEOCODING, id);
  }

  removeLocation(id: string) {
    return this.cafeClient.send(CAFES_PATTERNS.REMOVE_LOCATION, id);
  }

  updateFacilities(id: string, dto: FacilityDto) {
    return this.cafeClient.send(CAFES_PATTERNS.UPDATE_FACILITIES, { id, dto });
  }

  removeFacilities(id: string) {
    return this.cafeClient.send(CAFES_PATTERNS.REMOVE_FACILITIES, id);
  }

  updateOperationalHours(id: string, dto: UpdateOperationalHoursDto) {
    return this.cafeClient.send(CAFES_PATTERNS.UPDATE_OPERATIONAL_HOURS, {
      id,
      dto,
    });
  }

  removeOperationalHours(id: string) {
    return this.cafeClient.send(CAFES_PATTERNS.REMOVE_OPERATIONAL_HOURS, id);
  }

  createClaim(dto: CreateClaimDto) {
    return this.cafeClient.send(CAFES_PATTERNS.CREATE_CLAIM, dto);
  }

  updateClaimStatus(id: string, dto: UpdateClaimStatusDto) {
    return this.cafeClient.send(CAFES_PATTERNS.UPDATE_CLAIM_STATUS, {
      id,
      dto,
    });
  }
}
