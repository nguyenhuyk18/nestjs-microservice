import { Controller, UseInterceptors } from "@nestjs/common";
import { AuthorizerService } from "../services/authorizer.service";
import { MessagePattern } from "@nestjs/microservices";
import { TCP_REQUEST_MESSAGE } from "@common/constants/enum/tcp-request-message.enum";
import { RequestParams } from "@common/decorator/request.param.decorator";
import { AuthorizerResponse, LoginTcpRequest, LoginTcpResponse } from '@common/interfaces/tcp/authorizer'
import { Response } from "@common/interfaces/tcp/common/response.interface";
import { TcpLoggingInterceptor } from "@common/interceptors/tcpLogging.interceptors";
import { ProcessId } from '@common/decorator/processid.decorator';

@Controller()
@UseInterceptors(TcpLoggingInterceptor)
export class AuthorizerController {
    constructor(private readonly authorizerService: AuthorizerService,

    ) { }

    @MessagePattern(TCP_REQUEST_MESSAGE.AUTHORIZER.LOGIN)
    async login(@RequestParams() params: LoginTcpRequest) {

        const rs = await this.authorizerService.login(params);
        return Response.success<LoginTcpResponse>(rs);
    }

    @MessagePattern(TCP_REQUEST_MESSAGE.AUTHORIZER.VERIFY_USER_TOKEN)
    async verifyUserToken(@RequestParams() params: string, @ProcessId() processId: string) {
        const rs = await this.authorizerService.verifyUserToken(params, processId);
        return Response.success<AuthorizerResponse>(rs);
    }

}