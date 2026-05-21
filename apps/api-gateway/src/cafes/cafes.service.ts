import { CAFES_PATTERNS } from '@cafescope/contracts';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CafeService {
  constructor(@Inject('CAFE_SERVICE') private cafeClient: ClientProxy) {}

  findAll() {
    return this.cafeClient.send(CAFES_PATTERNS.FIND_ALL, {});
  }
}
