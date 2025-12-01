import { AuthorizerResponse, LoginTcpRequest } from "@common/interfaces/tcp/authorizer";
import { Inject, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
// import axios from "axios";
import { KeycloakHttpService } from "../../keycloak/services/keycloak-http.service";
// import { JwtPayload } ;
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';
import jwksRsa, { JwksClient } from 'jwks-rsa'
import { ConfigService } from '@nestjs/config';
import { TCP_SERVICE } from "@common/configuration/tcp.config";
import { TcpClient } from '@common/interfaces/tcp/common/tcp-client.interface';
import { firstValueFrom, map } from "rxjs";
import { TCP_REQUEST_MESSAGE } from "@common/constants/enum/tcp-request-message.enum";
import { User } from "@common/schemas/user.schema";
import { RoleType } from '@common/schemas/role.schema';

@Injectable()
export class AuthorizerService {
    private readonly logger = new Logger(AuthorizerService.name);
    private jwksClient: JwksClient;

    constructor(
        private readonly keycloakHttpService: KeycloakHttpService,
        private readonly configService: ConfigService,
        @Inject(TCP_SERVICE.USER_ACCESS_SERVICE) private readonly userAcessClient: TcpClient
    ) {
        this.jwksClient = jwksRsa({
            jwksUri: `${this.configService.get('KEYCLOAK_CONFIG.HOST')}/realms/${this.configService.get('KEYCLOAK_CONFIG.REALM')}/protocol/openid-connect/certs`,
            cache: true,
            rateLimit: true
        })
    }

    async login(params: LoginTcpRequest) {
        const { username, password } = params;

        const { access_token: accessToken, refresh_token: refreshToken } = await this.keycloakHttpService.exchangeUserToken({ username, password })

        return {
            accessToken,
            refreshToken
        }
    }

    async verifyUserToken(token: string, processid: string): Promise<AuthorizerResponse> {
        const decoded = jwt.decode(token, { complete: true }) as Jwt;

        if (!decoded || !decoded.header || !decoded.header.kid) {
            throw new UnauthorizedException('Invalid token structure')
        }

        try {
            const key = await this.jwksClient.getSigningKey(decoded.header.kid);
            const publicKey = key.getPublicKey();
            const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] }) as JwtPayload;
            this.logger.debug({ payload });


            const user = await this.validateGetUser(payload.sub, processid);


            return {
                valid: true,
                metadata: {
                    jwt: payload,
                    permissions: (user.roles as unknown as RoleType[]).map(row => row.permissions).flat(),
                    user: user,
                    userId: user.id
                }
            }
        } catch (error) {
            this.logger.error({ error });
            throw new UnauthorizedException('Invalid token')
        }
    }

    private async validateGetUser(userId: string, processId: string) {
        const user = await this.getUserByIdUser(userId, processId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return user;
    }

    private async getUserByIdUser(userId: string, processId: string): Promise<User> {
        const rs = await firstValueFrom(this.userAcessClient.send<User, string>(TCP_REQUEST_MESSAGE.USER.GET_BY_USER_ID, { processId, data: userId }).pipe(map(row => row.data)));
        return rs;

    }
}