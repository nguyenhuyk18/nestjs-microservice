import { Module } from "@nestjs/common";
import { AuthorizerController } from "./controllers/authorizer.controller";
import { AuthorizerService } from "./services/authorizer.service";
import { KeycloakModule } from "../keycloak/keycloak.module";
import { TcpProvider, TCP_SERVICE } from "@common/configuration/tcp.config";
import { ClientsModule } from "@nestjs/microservices";

@Module({
    imports: [KeycloakModule, ClientsModule.registerAsync([TcpProvider(TCP_SERVICE.USER_ACCESS_SERVICE)])],
    controllers: [AuthorizerController],
    providers: [AuthorizerService]
})
export class AuthorizerModule {

}
