import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CONFIGURATION, TConfiguration } from '../configuration';
import { LoggerMiddleware } from '@common/middlewares/logger.middlewares';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionInterceptor } from '@common/interceptors/exception.interceptors';
import { ClientsModule } from '@nestjs/microservices';
import { TCP_SERVICE, TcpProvider } from '@common/configuration/tcp.config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [() => CONFIGURATION] }),



  // cái này là khai báo phần connect đến invoice service
  ClientsModule.registerAsync([TcpProvider(TCP_SERVICE.INVOICE_SERVICE)])
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  }],
})
export class AppModule {
  static CONFIGURATION: TConfiguration = CONFIGURATION;
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
