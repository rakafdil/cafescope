import { Module } from '@nestjs/common';
import { CafeDataModule } from '../cafe-data.module';
import { OperationalHoursService } from './operational-hours.service';

@Module({
  imports: [CafeDataModule],
  providers: [OperationalHoursService],
  exports: [OperationalHoursService],
})
export class OperationalHoursModule {}
