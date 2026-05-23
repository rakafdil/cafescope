import { Injectable, Logger } from '@nestjs/common';
import { CafeRepository } from './cafe.repository';

@Injectable()
export class CafeService {
  private readonly logger = new Logger(CafeService.name);

  constructor(private readonly cafeRepository: CafeRepository) {}

  async findAll() {
    this.logger.log('Mengambil daftar cafe');
    return this.cafeRepository.findAll();
  }

  async findOne(cafeId: string) {
    this.logger.log(`Mengambil detail cafe ID: ${cafeId}`);
    return this.cafeRepository.findOne(cafeId);
  }

  async remove(cafeId: string) {
    this.logger.log(`Menghapus cafe ID: ${cafeId}`);
    return this.cafeRepository.removeCafe(cafeId);
  }
}
