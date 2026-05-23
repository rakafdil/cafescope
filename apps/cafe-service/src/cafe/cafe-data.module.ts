import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CafeRepository } from './cafe.repository';

@Module({
  imports: [PrismaModule],
  providers: [CafeRepository],
  exports: [CafeRepository],
})
export class CafeDataModule {}
