import { Module } from '@nestjs/common';
import { CafeDataModule } from '../cafe-data.module';
import { CafeRegistrationService } from './registration.service';

@Module({
  imports: [CafeDataModule],
  providers: [CafeRegistrationService],
  exports: [CafeRegistrationService],
})
export class RegistrationModule {}
