import { Injectable, Logger } from '@nestjs/common';
import { OperationalHoursDto } from '@cafescope/contracts';
import { CafeRepository } from '../cafe.repository';

@Injectable()
export class OperationalHoursService {
  private readonly logger = new Logger(OperationalHoursService.name);

  constructor(private readonly cafeRepository: CafeRepository) {}

  async updateOperationalHours(cafeId: string, hours: OperationalHoursDto[]) {
    this.logger.log(`Memperbarui jam operasional untuk Cafe ID: ${cafeId}`);

    const normalizedHours = hours.map((hour) => ({
      cafeId,
      dayOfWeek: hour.dayOfWeek,
      openTime: hour.openTime ?? null,
      closeTime: hour.closeTime ?? null,
      isClosed: hour.isClosed ?? false,
    }));

    return this.cafeRepository.upsertOperationalHours(cafeId, normalizedHours);
  }

  async removeOperationalHours(cafeId: string) {
    this.logger.log(`Menghapus jam operasional untuk Cafe ID: ${cafeId}`);
    return this.cafeRepository.removeOperationalHours(cafeId);
  }
}
