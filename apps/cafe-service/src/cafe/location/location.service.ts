import {
  Injectable,
  Logger,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CafeRepository } from '../cafe.repository';
import { LocationDto } from '@cafescope/contracts';

interface NominatimResponse {
  lat: string;
  lon: string;
}

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);

  constructor(
    private readonly cafeRepository: CafeRepository,
    private readonly httpService: HttpService,
  ) {}

  async manageGeospatialLocation(cafeId: string, dto: LocationDto) {
    this.logger.log(
      `Memperbarui lokasi spasial manual untuk Cafe ID: ${cafeId}`,
    );

    const result = await this.cafeRepository.updateLocation(
      cafeId,
      dto.latitude,
      dto.longitude,
    );

    return result;
  }

  async geocodeAndSaveLocation(cafeId: string) {
    this.logger.log(
      `Memulai proses geocoding otomatis untuk Cafe ID: ${cafeId}`,
    );

    const cafe = await this.cafeRepository.findOne(cafeId);
    if (!cafe) {
      throw new NotFoundException(`Cafe dengan ID ${cafeId} tidak ditemukan`);
    }

    const address = cafe.address;

    try {
      const response = await firstValueFrom(
        this.httpService.get<NominatimResponse[]>(
          'https://nominatim.openstreetmap.org/search',
          {
            params: {
              q: address,
              format: 'json',
              limit: 1,
            },
            headers: {
              'User-Agent': 'CafeScope-Service/1.0',
            },
          },
        ),
      );

      const data = response.data;

      if (!data || data.length === 0) {
        this.logger.warn(
          `Geocoding gagal: Alamat "${address}" tidak dikenali.`,
        );
        return {
          status: 'failed',
          message:
            'Alamat tidak dapat dipetakan secara otomatis. Silakan gunakan fitur drop pin manual.',
        };
      }

      const latitude = parseFloat(data[0].lat);
      const longitude = parseFloat(data[0].lon);

      await this.cafeRepository.updateLocation(cafeId, latitude, longitude);

      return {
        status: 'success',
        message: 'Geocoding berhasil! Lokasi kafe telah diperbarui.',
        data: { latitude, longitude },
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';

      this.logger.error(
        `Kesalahan saat menghubungi API Geocoding: ${errorMessage}`,
      );
      throw new HttpException(
        'Gagal menghubungi layanan peta geospasial',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeLocation(cafeId: string) {
    this.logger.log(`Mereset/Menghapus data spasial untuk Cafe ID: ${cafeId}`);

    return this.cafeRepository.removeLocation(cafeId);
  }
}
