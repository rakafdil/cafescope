import { Module } from '@nestjs/common';
import { RegistrationModule } from './registration/registration.module';
import { LocationModule } from './location/location.module';
import { ClaimModule } from './claim/claim.module';
import { CafeController } from './cafe.controller';
import { CafeDataModule } from './cafe-data.module';
import { CafeService } from './cafe.service';
import { FacilityModule } from './facility/facility.module';
import { OperationalHoursModule } from './operational-hours/operational-hours.module';

@Module({
  imports: [
    CafeDataModule,
    RegistrationModule,
    LocationModule,
    ClaimModule,
    FacilityModule,
    OperationalHoursModule,
  ],
  controllers: [CafeController],
  providers: [CafeService],
})
export class CafeModule {}
