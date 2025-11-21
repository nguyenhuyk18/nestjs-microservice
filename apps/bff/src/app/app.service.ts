import { BadRequestException, Injectable } from '@nestjs/common';
import { PORT } from '@common/constants/common.constant'
// import { throwError } from 'rxjs';

@Injectable()
export class AppService {
  getData(): { message: string } {
    // console.log(PORT, 'ạigfhoiauehfogiuaerfguigysefguig')
    // throw new BadRequestException('ncc');

    return { message: 'Hello API' };
  }
}
