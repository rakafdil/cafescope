import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'ping_user' })
  handlePing(payload: any) {
    console.log('Received payload from gateway:', payload);
    return {
      status: 'success',
      message: 'User Service connected via TCP!',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      receivedData: payload,
    };
  }
}
