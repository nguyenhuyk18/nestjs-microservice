// import { TCP_REQUEST_MESSAGE } from "@common/constants/enum/tcp-request-message.enum";
import { TCP_SERVICE } from "@common/configuration/tcp.config";
import { ResponseDto } from "@common/interfaces/gateway/response.interface";
import { TcpClient } from "@common/interfaces/tcp/common/tcp-client.interface";
import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { CreateUserRequestDto, UserResponseDto } from '@common/interfaces/gateway/user';
import { firstValueFrom, map } from "rxjs";
import { TCP_REQUEST_MESSAGE } from "@common/constants/enum/tcp-request-message.enum";
import { ProcessId } from "@common/decorator/processid.decorator";
import { Param } from "@nestjs/common";

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(@Inject(TCP_SERVICE.USER_ACCESS_SERVICE) private userClient: TcpClient) { }

    @Post()
    @ApiOkResponse({
        type: ResponseDto<string>
    })
    @ApiOperation({ summary: 'Create a new user' })
    async create(@Body() body: CreateUserRequestDto, @ProcessId() processid) {
        const rs = await firstValueFrom(this.userClient.send<string, CreateUserRequestDto>(TCP_REQUEST_MESSAGE.USER.CREATE, { processId: processid, data: body }).pipe(map(row => new ResponseDto<string>(row))))
        return rs
    }


    @Get(':id')
    @ApiOkResponse({
        type: ResponseDto<UserResponseDto>
    })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'ID of User',
        schema: { type: 'string' }
    })
    @ApiOperation({ summary: 'Find User By ID' })
    async getById(@Param('id') id: string, @ProcessId() processid: string) {
        const rs = await firstValueFrom(this.userClient.send<UserResponseDto, string>(TCP_REQUEST_MESSAGE.USER.GET_BY_USER_ID, { data: id, processId: processid }).pipe(map(row => new ResponseDto(row))))
        return rs;
    }




    @Get(':email')
    @ApiOkResponse({
        type: ResponseDto<UserResponseDto>
    })
    @ApiParam({
        name: 'email',
        required: true,
        description: 'email of User',
        schema: { type: 'string' }
    })
    @ApiOperation({ summary: 'Find User By ID' })
    async getByEmail(@Param('email') email: string, @ProcessId() processid: string) {
        const rs = await firstValueFrom(this.userClient.send<UserResponseDto, string>(TCP_REQUEST_MESSAGE.USER.GET_BY_EMAIL_USER, { data: email, processId: processid }).pipe(map(row => new ResponseDto(row))))
        return rs;
    }


}