import { Injectable, Logger } from '@nestjs/common';
import { CreateClaimDto, ClaimStatus } from '@cafescope/contracts';
import { CafeRepository } from '../cafe.repository';

@Injectable()
export class ClaimService {
  private readonly logger = new Logger(ClaimService.name);

  constructor(private readonly cafeRepository: CafeRepository) {}

  async createClaim(dto: CreateClaimDto) {
    this.logger.log(`Membuat klaim untuk Cafe ID: ${dto.cafeId}`);

    return this.cafeRepository.createClaim({
      cafe: { connect: { id: dto.cafeId } },
      userId: dto.userId,
      proofUrl: dto.proofUrl ?? undefined,
      status: dto.status ?? undefined,
    });
  }

  async updateClaimStatus(claimId: string, status: ClaimStatus) {
    this.logger.log(`Memperbarui status klaim ID: ${claimId}`);
    return this.cafeRepository.updateClaimStatus(claimId, status);
  }
}
