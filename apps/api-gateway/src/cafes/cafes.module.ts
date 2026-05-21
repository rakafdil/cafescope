import { Module } from '@nestjs/common';
import { CafeService } from './cafes.service';
import { CafeController } from './cafes.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CAFE_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3032 },
      },
    ]),
  ],
  providers: [CafeService],
  controllers: [CafeController],
})
export class CafeServiceModule {}
