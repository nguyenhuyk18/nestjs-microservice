import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosInstance } from 'axios';
import { CreateKeyCloakUserRequest, ExchangeClientTokenResponse, ExchangeUserTokenResponse } from '@common/interfaces/common';
import { LoginTcpRequest } from "@common/interfaces/tcp/authorizer";

@Injectable()
export class KeycloakHttpService {
    private readonly logger = new Logger(KeycloakHttpService.name);
    private readonly axiosInstance: AxiosInstance;
    private realm: string;
    private clientId: string;
    private clientSecret: string;

    constructor(private readonly configService: ConfigService) {
        this.axiosInstance = axios.create({
            baseURL: this.configService.get('KEYCLOAK_CONFIG.HOST'),
        });

        this.realm = this.configService.get('KEYCLOAK_CONFIG.REALM');
        this.clientId = this.configService.get('KEYCLOAK_CONFIG.CLIENT_ID');
        this.clientSecret = this.configService.get('KEYCLOAK_CONFIG.CLIENT_SECRET');
    }

    // Đây là token đại diện cho chính Ứng dụng/Dịch vụ (Service), không liên quan đến người dùng cụ thể nào cả.
    async exchangeClientToken(): Promise<ExchangeClientTokenResponse> {
        const body = new URLSearchParams();
        body.append('client_id', this.clientId);
        body.append('client_secret', this.clientSecret);
        body.append('grant_type', 'client_credentials');
        body.append('scope', 'openid');

        const { data } = await this.axiosInstance.post(`/realms/${this.realm}/protocol/openid-connect/token`, body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return data;
    }


    async createUser(data: CreateKeyCloakUserRequest): Promise<string> {
        const { email, firstname, lastname, password } = data;
        // console.log(data);
        const { access_token: accessToken } = await this.exchangeClientToken();

        const { headers } = await this.axiosInstance.post(
            `/admin/realms/${this.realm}/users`,
            {
                firstName: firstname,
                lastName: lastname,
                email,
                username: email,
                enabled: true,
                emailVerified: true,
                credentials: [{ type: 'password', value: password, temporary: false }],
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );

        // khi call api xong sẽ trả về header có location như thyế nỳ

        // http://localhost:8180/admin/realms/einvoice-app/users/64c22b69-5c7c-403c-b1a0-a4de4e2d37ff
        const userId = headers['location']?.split('/')?.pop();

        if (!userId) {
            throw new InternalServerErrorException('Could not create keycloak user');
        }

        this.logger.debug('Created user with id: ', userId);

        return userId;
    }


    async exchangeUserToken(params: LoginTcpRequest): Promise<ExchangeUserTokenResponse> {
        const body = new URLSearchParams();
        body.append('client_id', this.clientId);
        body.append('client_secret', this.clientSecret);
        body.append('grant_type', 'password');
        body.append('scope', 'openid');
        body.append('username', params.username);
        body.append('password', params.password);

        const { data } = await this.axiosInstance.post(`/realms/${this.realm}/protocol/openid-connect/token`, body, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return data;
    }



}