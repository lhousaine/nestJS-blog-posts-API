import { Injectable } from '@nestjs/common';
import { PingDto } from './dto/ping.dto';

@Injectable()
export class PingService {
  runPing(): PingDto {
    return { success: true };
  }
}
