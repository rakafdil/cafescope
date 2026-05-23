import { Injectable, Logger } from '@nestjs/common';
import { CreateCafeDto, UpdateCafeDto } from '@cafescope/contracts';
import { CafeRepository } from '../cafe.repository';

@Injectable()
export class CafeRegistrationService {
  private readonly logger = new Logger(CafeRegistrationService.name);

  constructor(private readonly cafeRepository: CafeRepository) {}

  async registerNewCafe(dto: CreateCafeDto) {
    this.logger.log(`Mendaftarkan kafe baru: ${dto.name}`);

    const newCafe = await this.cafeRepository.createCafe({
      ownerId: dto.ownerId ?? undefined,
      name: dto.name,
      description: dto.description,
      address: dto.address,
      facility: dto.facility
        ? {
            create: {
              hasWifi: dto.facility.hasWifi ?? false,
              hasPlugs: dto.facility.hasPlugs ?? false,
              seatingCapacity: dto.facility.seatingCapacity ?? null,
              noiseLevel: dto.facility.noiseLevel ?? null,
            },
          }
        : undefined,
    });

    if (dto.latitude !== undefined && dto.longitude !== undefined) {
      await this.cafeRepository.updateLocation(
        newCafe.id,
        dto.latitude,
        dto.longitude,
      );
    }

    return {
      status: 'success',
      data: newCafe,
    };
  }

  async updateCafeInfo(cafeId: string, dto: UpdateCafeDto) {
    this.logger.log(`Memperbarui info dasar cafe ID: ${cafeId}`);

    const updatedCafe = await this.cafeRepository.updateCafeInfo(cafeId, {
      ownerId: dto.ownerId ?? undefined,
      name: dto.name ?? undefined,
      description: dto.description ?? undefined,
      address: dto.address ?? undefined,
    });

    return {
      status: 'success',
      data: updatedCafe,
    };
  }
}
