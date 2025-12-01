import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { CreateInvoiceTcpRequest } from '@common/interfaces/tcp/invoice/invoice-request.interface';
import { invoiceRequestMapping } from '../mappers';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) { }

  create(params: CreateInvoiceTcpRequest) {
    const input = invoiceRequestMapping(params);
    // console.log(input)
    return this.invoiceRepository.create(input)
  }
}
