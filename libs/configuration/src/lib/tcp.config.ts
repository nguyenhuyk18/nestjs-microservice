import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions, TcpClientOptions, Transport } from '@nestjs/microservices'
import { IsEmpty, IsNotEmpty, IsObject } from 'class-validator';

export enum TCP_SERVICE {
    INVOICE_SERVICE = 'TCP_INVOICE_SERVICE'
}

export class TcpConfiguration {
    @IsNotEmpty()
    @IsObject()
    TCP_INVOICE_SERVICE: TcpClientOptions;
    // BACK_SERVICE: TcpClientOptions;

    constructor() {
        Object.entries(TCP_SERVICE).forEach(([key, serviceName]) => {
            const host = process.env[`${key}_HOST`] || 'localhost';
            const port = Number(process.env[`${serviceName}_PORT`]);
            this[serviceName] = TcpConfiguration.setValue(port, host)
        })
    }

    static setValue(port: number, host: string): TcpClientOptions {
        return {
            transport: Transport.TCP,
            options: {
                host,
                port
            }
        }
    }
}

export function TcpProvider(serviceName: keyof TcpConfiguration): ClientsProviderAsyncOptions {
    // console.log(serviceName)
    // console.log()
    return {
        name: serviceName,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
            console.log(serviceName)
            console.log(configService.get(`TCP_SERV.${serviceName}`));
            return configService.get(`TCP_SERV.${serviceName}`) as TcpClientOptions;
        }
    }
}
