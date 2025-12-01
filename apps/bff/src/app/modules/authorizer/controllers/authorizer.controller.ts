import { TCP_SERVICE } from '@common/configuration/tcp.config';
import { ResponseDto } from '@common/interfaces/gateway/response.interface';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginRequestDto, LoginResponseDto } from '@common/interfaces/gateway/authorizer';
import { ProcessId } from '@common/decorator/processid.decorator';
import { LoginTcpResponse } from '@common/interfaces/tcp/authorizer';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp-request-message.enum';
import { map } from 'rxjs';

@ApiTags('Authorizer')
@Controller('authorizer')
export class AuthorizerController {
    constructor(@Inject(TCP_SERVICE.AUTHORIZE_SERVICE) private readonly authorizerClient: TcpClient) { }

    @Post()
    @ApiOkResponse({ type: ResponseDto<LoginResponseDto> })
    @ApiOperation({ summary: 'Login with username and password' })
    login(@Body() data: LoginRequestDto, @ProcessId() processId) {
        return this.authorizerClient.send<LoginTcpResponse, LoginRequestDto>(TCP_REQUEST_MESSAGE.AUTHORIZER.LOGIN, { data, processId }).pipe(map(row => new ResponseDto(row)));
    }




}