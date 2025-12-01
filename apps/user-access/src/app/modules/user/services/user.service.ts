import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
// import { User } from "@common/schemas/user.schema";
import { CreateUserTcpRequest } from "@common/interfaces/tcp/user";
import { ERROR_CODE } from '@common/constants/enum/error-code.enum';
import { createUserRequestMapping } from "../mapppers/user.request.mapper";
// import { TCP_REQUEST_MESSAGE } from "@common/constants/enum/tcp-request-message.enum";
// import { ProcessId } from '@common/decorator/processid.decorator';
import { TCP_SERVICE } from "@common/configuration/tcp.config";
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { CreateKeycloakUserTcpReq } from '@common/interfaces/tcp/authorizer';
import { TCP_REQUEST_MESSAGE } from "@common/constants/enum/tcp-request-message.enum";
import { firstValueFrom, map } from "rxjs";
// import { Response } from "@common/interfaces/tcp/common/response.interface";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository,
        @Inject(TCP_SERVICE.AUTHORIZE_SERVICE) private readonly authorizerClient: TcpClient
    ) { }


    async save(data: CreateUserTcpRequest, processId: string) {
        const rs = await this.userRepository.isExistEmail(data.email);
        if (rs) {
            throw new BadRequestException(ERROR_CODE.USER_ALREADY_EXISTS);
        }

        const userId = await this.createKeycloakUser({ email: data.email, firstname: data.firstName, lastname: data.lastName, password: data.password }, processId)

        const newData = createUserRequestMapping(data, userId);
        return this.userRepository.create(newData);
    }

    async createKeycloakUser(data: CreateKeycloakUserTcpReq, processid: string) {
        // console.log(data, ' user-access akkakaka')
        return firstValueFrom(this.authorizerClient.send<string, CreateKeycloakUserTcpReq>(TCP_REQUEST_MESSAGE.KEYCLOAK.CREATE_USER, { data, processId: processid }).pipe(map(row => row.data)));
    }


    getById(id: string) {
        return this.userRepository.getById(id);
    }


    getByEmail(email: string) {
        return this.userRepository.getByEmail(email);
    }

}