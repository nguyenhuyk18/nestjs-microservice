import { Controller, UseInterceptors } from "@nestjs/common";
import { KeycloakHttpService } from "../services/keycloak-http.service";
import { MessagePattern } from "@nestjs/microservices";
import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp-request-message.enum';
import { RequestParams } from '@common/decorator/request.param.decorator';
// import { CreateUserTcpRequest } from '@common/interfaces/tcp/user';
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptors';
import { Response } from '@common/interfaces/tcp/common/response.interface';
import { CreateKeyCloakUserRequest } from "@common/interfaces/common";

@Controller()
@UseInterceptors(TcpLoggingInterceptor)
export class KeycloakController {
    constructor(private readonly keycloakHttpService: KeycloakHttpService) { }

    @MessagePattern(TCP_REQUEST_MESSAGE.KEYCLOAK.CREATE_USER)
    async createUser(@RequestParams() params: CreateKeyCloakUserRequest): Promise<Response<string>> {
        // console.log(params.firstName, ' ', params.lastName)

        const rs = await this.keycloakHttpService.createUser(params);
        return Response.success<string>(rs);
    }

}