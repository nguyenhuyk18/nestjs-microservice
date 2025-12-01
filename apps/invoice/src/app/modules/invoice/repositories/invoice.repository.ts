import { InvoiceModelName } from '@common/schemas/invoice.schema';
import type { Invoice, InvoiceModel } from '@common/schemas/invoice.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';

@Injectable()
export class InvoiceRepository {
    constructor(@InjectModel(InvoiceModelName) private invoiceModel: InvoiceModel) { }

    // khi dùng partial có thể truyền kh cần đủ hết thuộc tính của class invoice
    create(data: Partial<Invoice>) {
        return this.invoiceModel.create(data);
    }

    getById(id: string) {
        return this.invoiceModel.findById(id);
    }

    updateById(id: string, data: Partial<Invoice>) {
        return this.invoiceModel.findByIdAndUpdate(id, data, { new: true });
    }

    deleteById(id: string) {
        return this.invoiceModel.findByIdAndDelete(id);
    }

}
