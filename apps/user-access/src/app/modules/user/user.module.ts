import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserDestination } from '@common/schemas/user.schema';
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { TCP_SERVICE, TcpProvider } from "@common/configuration/tcp.config";
import { ClientsModule } from "@nestjs/microservices";


@Module({
    imports: [MongooseModule.forFeature([UserDestination]), ClientsModule.registerAsync([TcpProvider(TCP_SERVICE.AUTHORIZE_SERVICE)])],
    controllers: [UserController],
    providers: [UserRepository, UserService]
})
export class UserModule {

}
