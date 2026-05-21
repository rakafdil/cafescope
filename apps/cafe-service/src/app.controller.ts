import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CAFES_PATTERNS } from '@cafescope/contracts';

const cafesPatterns = CAFES_PATTERNS as { FIND_ALL: string };

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(cafesPatterns.FIND_ALL)
  getHello(): string {
    return this.appService.getHello();
  }
}
