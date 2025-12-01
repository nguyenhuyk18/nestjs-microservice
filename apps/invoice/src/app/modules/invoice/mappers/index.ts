import { CreateInvoiceTcpRequest } from "@common/interfaces/tcp/invoice/invoice-request.interface";
import { Invoice } from "@common/schemas/invoice.schema";

export const invoiceRequestMapping = (data: CreateInvoiceTcpRequest): Partial<Invoice> => {
    return {
        item: data.item,
        client: data.client,
        vatAmount: data.item.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.unitPrice * (currentValue.vatRate / 100), 0),
        totalAmount: data.item.reduce((accumulator, currentValue) => accumulator + currentValue.quantity * currentValue.unitPrice, 0)
    }
}