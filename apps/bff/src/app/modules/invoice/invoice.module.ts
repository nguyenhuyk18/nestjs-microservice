import { TCP_SERVICE, TcpProvider } from "@common/configuration/tcp.config";
import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { InvoiceController } from "./controllers/invoice.controller";

@Module({
    imports: [ClientsModule.registerAsync([TcpProvider(TCP_SERVICE.INVOICE_SERVICE)])],
    controllers: [InvoiceController],
    providers: []
})
export class InvoiceModule {

}