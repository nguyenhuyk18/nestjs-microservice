import { Controller, UseInterceptors } from '@nestjs/common';
import { InvoiceService } from '../services/invoice.service';
import { MessagePattern } from '@nestjs/microservices';
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptors';
import { Response } from '@common/interfaces/tcp/common/response.interface'
import type { ResponseType } from '@common/interfaces/tcp/common/response.interface'
// import type { RequestType } from '@common/interfaces/tcp/common/request.interface'
import { RequestParams } from '@common/decorator/request.param.decorator';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp-request-message.enum';
import type { CreateInvoiceTcpRequest } from '@common/interfaces/tcp/invoice/invoice-request.interface';
import type { CreateInvoiceTcpResponse } from '@common/interfaces/tcp/invoice/invoice-response.interface';


@Controller()
@UseInterceptors(TcpLoggingInterceptor)
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) { }



  @MessagePattern(TCP_REQUEST_MESSAGE.INVOICE.CREATE)
  async getInvoice(@RequestParams() params: CreateInvoiceTcpRequest): Promise<ResponseType<CreateInvoiceTcpResponse>> {
    // console.log(params, 'tcp service')
    const rs = await this.invoiceService.create(params);
    return Response.success<CreateInvoiceTcpResponse>(rs);
  }
}
