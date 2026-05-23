import { Injectable, Logger } from '@nestjs/common';
import { FacilityDto } from '@cafescope/contracts';
import { CafeRepository } from '../cafe.repository';

@Injectable()
export class FacilityService {
  private readonly logger = new Logger(FacilityService.name);

  constructor(private readonly cafeRepository: CafeRepository) {}

  async updateFacilities(cafeId: string, dto: FacilityDto) {
    this.logger.log(`Memperbarui fasilitas untuk Cafe ID: ${cafeId}`);

    return this.cafeRepository.upsertFacility(cafeId, {
      cafeId,
      hasWifi: dto.hasWifi ?? false,
      hasPlugs: dto.hasPlugs ?? false,
      seatingCapacity: dto.seatingCapacity ?? null,
      noiseLevel: dto.noiseLevel ?? null,
    });
  }

  async removeFacilities(cafeId: string) {
    this.logger.log(`Menghapus fasilitas untuk Cafe ID: ${cafeId}`);
    return this.cafeRepository.removeFacilities(cafeId);
  }
}
