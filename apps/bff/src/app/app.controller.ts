import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseDto } from '@common/interfaces/gateway/response.interface';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('TCP_INVOICE_SERVICE') private readonly invoiceClient: ClientProxy,
  ) { }

  @Get()
  getData() {
    // console.log('ahihi')
    const rs = this.appService.getData();
    return new ResponseDto({ data: rs, duration: 'xcxcx' });
  }

  @Get('invoice')
  async getInvoice() {
    console.log('hello')
    // tham số thứ nhất là cái pattern để xác định được đi vào controller nào để lắng nghe
    const rs = await firstValueFrom(this.invoiceClient.send<string, number>('getInvoice', 1));

    return new ResponseDto({ data: rs })
  }


}
