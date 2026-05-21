import { Controller, Get } from '@nestjs/common';
import { CafeService } from './cafes.service';

@Controller('cafes')
export class CafeController {
  constructor(private cafeService: CafeService) {}

  @Get()
  findAll() {
    return this.cafeService.findAll();
  }
}
