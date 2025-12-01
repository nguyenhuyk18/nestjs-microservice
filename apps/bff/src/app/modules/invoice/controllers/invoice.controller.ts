import { Body, Controller, Inject, Logger, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateInvoiceRequestDto } from '@common/interfaces/gateway/invoice';
import { ResponseDto } from '@common/interfaces/gateway/response.interface';
import { InvoiceResponseDto } from '@common/interfaces/gateway/invoice/invoice-response.dto';
import { TCP_SERVICE } from "@common/configuration/tcp.config";
import type { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp-request-message.enum';
import { CreateInvoiceTcpRequest } from '@common/interfaces/tcp/invoice/invoice-request.interface';
import { ProcessId } from '@common/decorator/processid.decorator';
import { firstValueFrom, map } from 'rxjs';
import { Authorization } from "@common/decorator/authorizer.decorator";
import { GetUserData } from '@common/decorator/user-data.decorator';
import { AuthorizedMetadata } from "@common/interfaces/tcp/authorizer";



@Controller('invoice')
@ApiTags('Invoice') // đánh dấu các entpoint
export class InvoiceController {

    constructor(@Inject(TCP_SERVICE.INVOICE_SERVICE) private invoiceClient: TcpClient) { }


    @Post()
    @ApiOkResponse({ type: ResponseDto<InvoiceResponseDto> })
    @ApiOperation({ summary: 'Created Invoice' })
    @Authorization({ secured: true })
    create(@Body() body: CreateInvoiceRequestDto, @ProcessId() processId: string, @GetUserData() userData: AuthorizedMetadata) {
        // console.log(body)
        Logger.debug('User data: ', userData)
        const rs = firstValueFrom(this.invoiceClient.send<string, CreateInvoiceTcpRequest>(TCP_REQUEST_MESSAGE.INVOICE.CREATE, { processId: processId, data: body }).pipe(map(row => new ResponseDto({ data: row }))));
        return rs;
    }




}
