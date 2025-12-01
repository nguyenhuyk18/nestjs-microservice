import { Controller, UseInterceptors } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { MessagePattern } from "@nestjs/microservices";
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptors';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp-request-message.enum';
import { RequestParams } from '@common/decorator/request.param.decorator';
import { CreateUserTcpRequest, UserResponseTcp } from '@common/interfaces/tcp/user';
import { Response } from '@common/interfaces/tcp/common/response.interface';
import { HTTP_MESSAGE } from "@common/constants/enum/http-message.enum";
import { ProcessId } from "@common/decorator/processid.decorator";


@Controller('user')
@UseInterceptors(TcpLoggingInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) { }


    @MessagePattern(TCP_REQUEST_MESSAGE.USER.CREATE)
    async create(@RequestParams() data: CreateUserTcpRequest, @ProcessId() processId: string) {
        await this.userService.save(data, processId);
        return Response.success<string>(HTTP_MESSAGE.CREATED);
    }


    @MessagePattern(TCP_REQUEST_MESSAGE.USER.GET_BY_USER_ID)
    async getById(@RequestParams() data: string) {
        const rs = await this.userService.getById(data);
        return Response.success<UserResponseTcp>(rs);
    }


    @MessagePattern(TCP_REQUEST_MESSAGE.USER.GET_BY_EMAIL_USER)
    async getByEmail(@RequestParams() data: string) {
        const rs = await this.userService.getByEmail(data);
        return Response.success<UserResponseTcp>(rs);
    }
}   