import { TCP_SERVICE, TcpProvider } from "@common/configuration/tcp.config";
import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { AuthorizerController } from "./controllers/authorizer.controller";


@Module({
    imports: [ClientsModule.registerAsync([TcpProvider(TCP_SERVICE.AUTHORIZE_SERVICE)])],
    controllers: [AuthorizerController],
    providers: []
})
export class AuthorizerModule {

}