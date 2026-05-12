import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Get('ping')
  pingUserService() {
    // Mengirim pattern 'ping_user' ke User Service via TCP
    return this.userServiceClient.send(
      { cmd: 'ping_user' },
      { data: 'Hello from Gateway!' },
    );
  }
}
