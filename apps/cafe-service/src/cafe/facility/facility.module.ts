import { Module } from '@nestjs/common';
import { CafeDataModule } from '../cafe-data.module';
import { FacilityService } from './facility.service';

@Module({
  imports: [CafeDataModule],
  providers: [FacilityService],
  exports: [FacilityService],
})
export class FacilityModule {}
