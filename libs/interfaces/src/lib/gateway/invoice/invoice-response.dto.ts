import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "../common/base-response.dto";
import { INVOICE_STATUS } from '@common/constants/enum/invoice.enum';

class ClientResponseDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    address: string;
}


class ItemResponseDto {
    @ApiProperty({ type: String })
    productId: string

    @ApiProperty()
    name: string;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    unitPrice: number;

    @ApiProperty()
    vatRate: number;

    @ApiProperty()
    total: number;
}


export class InvoiceResponseDto extends BaseResponseDto<string> {
    @ApiProperty()
    client: ClientResponseDto;

    @ApiProperty()
    totalAmount: number

    @ApiProperty()
    vatAmount: number

    @ApiProperty({ type: String, enum: INVOICE_STATUS })
    status: INVOICE_STATUS

    @ApiProperty()
    item: ItemResponseDto[]

    @ApiProperty()
    supervisorId?: string;

    @ApiProperty()
    fileUrl?: string
}