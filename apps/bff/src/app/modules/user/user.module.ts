import { TCP_SERVICE, TcpProvider } from "@common/configuration/tcp.config";
import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";
import { UserController } from "./controllers/user.controller";

@Module({
    imports: [ClientsModule.registerAsync([TcpProvider(TCP_SERVICE.USER_ACCESS_SERVICE)])],
    controllers: [UserController]
})
export class UserModule { }
