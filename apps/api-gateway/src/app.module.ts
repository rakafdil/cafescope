import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3031 },
      },
      {
        name: 'CAFE_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3032 },
      },
      {
        name: 'DISCOVERY_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3033 },
      },
      {
        name: 'COMMUNITY_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3034 },
      },
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3035 },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
