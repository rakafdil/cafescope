import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateCafeDto,
  CreateClaimDto,
  FacilityDto,
  LocationDto,
  UpdateCafeDto,
  UpdateClaimStatusDto,
  UpdateOperationalHoursDto,
} from '@cafescope/contracts';
import { CafeService } from './cafes.service';

@Controller('cafes')
export class CafeController {
  constructor(private cafeService: CafeService) {}

  @Get()
  findAll() {
    return this.cafeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('Tipe ID:', typeof id, 'Nilai:', id);
    return this.cafeService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateCafeDto) {
    return this.cafeService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCafeDto) {
    return this.cafeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cafeService.remove(id);
  }

  @Put(':id/location')
  updateLocation(@Param('id') id: string, @Body() dto: LocationDto) {
    return this.cafeService.updateLocation(id, dto);
  }

  @Delete(':id/location')
  removeLocation(@Param('id') id: string) {
    return this.cafeService.removeLocation(id);
  }

  @Post('geocode/:id')
  geocodeAddress(@Param('id') id: string) {
    return this.cafeService.geocodeAddress(id);
  }

  @Put(':id/facilities')
  updateFacilities(@Param('id') id: string, @Body() dto: FacilityDto) {
    return this.cafeService.updateFacilities(id, dto);
  }

  @Delete(':id/facilities')
  removeFacilities(@Param('id') id: string) {
    return this.cafeService.removeFacilities(id);
  }

  @Put(':id/operational-hours')
  updateOperationalHours(
    @Param('id') id: string,
    @Body() dto: UpdateOperationalHoursDto,
  ) {
    return this.cafeService.updateOperationalHours(id, dto);
  }

  @Delete(':id/operational-hours')
  removeOperationalHours(@Param('id') id: string) {
    return this.cafeService.removeOperationalHours(id);
  }

  @Post(':id/claims')
  createClaim(@Param('id') id: string, @Body() dto: CreateClaimDto) {
    return this.cafeService.createClaim({
      ...dto,
      cafeId: id,
    });
  }

  @Patch('claims/:id/status')
  updateClaimStatus(
    @Param('id') id: string,
    @Body() dto: UpdateClaimStatusDto,
  ) {
    return this.cafeService.updateClaimStatus(id, dto);
  }
}
