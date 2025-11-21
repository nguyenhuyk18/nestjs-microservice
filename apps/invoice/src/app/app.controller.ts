import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('getInvoice')
  getInvoice(data: number): string {
    const a = data * 2;
    console.log('hello invoiceservice')
    return `${a} yah sirr`;
  }
}
