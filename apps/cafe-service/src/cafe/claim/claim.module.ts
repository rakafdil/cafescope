import { Module } from '@nestjs/common';
import { CafeDataModule } from '../cafe-data.module';
import { ClaimService } from './claim.service';

@Module({
  imports: [CafeDataModule],
  providers: [ClaimService],
  exports: [ClaimService],
})
export class ClaimModule {}
