import { Module } from '@nestjs/common';
import { CafeDataModule } from '../cafe-data.module';
import { LocationService } from './location.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [CafeDataModule, HttpModule],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
