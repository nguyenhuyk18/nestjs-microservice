import { Injectable } from '@nestjs/common';
import { PORT } from '@common/constants/common.constant'

@Injectable()
export class AppService {
  getData(): { message: string } {
    console.log(PORT, 'ạigfhoiauehfogiuaerfguigysefguig')
    return { message: 'Hello API' };
  }
}
