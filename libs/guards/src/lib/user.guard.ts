import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger, Inject } from '@nestjs/common';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { MetaDataKeys } from '@common/constants/common.constant';
import { getAccessToken, setUserData } from '@common/utils/request.utils';
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { TCP_SERVICE } from '@common/configuration/tcp.config';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp-request-message.enum';
import { AuthorizerResponse } from '@common/interfaces/tcp/authorizer/authorizer.response.interface';

@Injectable()
export class UserGuard implements CanActivate {
    private readonly logger = new Logger(UserGuard.name);
    constructor(private readonly reflector: Reflector,
        @Inject(TCP_SERVICE.AUTHORIZE_SERVICE) private authorizerClient: TcpClient,

    ) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const authOption = this.reflector.get<{ secured: boolean }>(MetaDataKeys.SECURED, context.getHandler())

        const req = context.switchToHttp().getRequest();

        if (!authOption?.secured) {
            return true;
        }

        return this.verifyToken(req)
    }

    private async verifyToken(req: any): Promise<boolean> {
        try {
            const token = getAccessToken(req);
            const result = await this.verifyUserToken(token, req[MetaDataKeys.PROCESS_ID]);

            if (!result?.valid) {
                throw new UnauthorizedException('TOKEN is invalid');
            }

            setUserData(req, result)

            return true;
        } catch (error) {
            this.logger.error({ error })
            throw new UnauthorizedException('Token is invalid')
        }
    }

    private async verifyUserToken(token: string, processId: string) {
        return firstValueFrom(this.authorizerClient.send<AuthorizerResponse, string>(TCP_REQUEST_MESSAGE.AUTHORIZER.VERIFY_USER_TOKEN, { data: token, processId }).pipe(map(data => data.data)))
    }
}
