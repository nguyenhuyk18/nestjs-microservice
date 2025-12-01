/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions } from '@nestjs/microservices';
// import { CONFIGURATION } from './configuration/index';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const globalPrefix = AppModule.CONFIGURATION.GLOBAL_PREFIX;
    app.setGlobalPrefix(globalPrefix);

    // config cái này là dành cho consumer (nghĩa là th lắng nghe)
    app.connectMicroservice<MicroserviceOptions>(
      {
        transport: AppModule.CONFIGURATION.TCP_SERV.TCP_AUTHORIZE_SERVICE.transport,
        options: {
          host: AppModule.CONFIGURATION.TCP_SERV.TCP_AUTHORIZE_SERVICE.options.host,
          port: AppModule.CONFIGURATION.TCP_SERV.TCP_AUTHORIZE_SERVICE.options.port
        },
      },
    )

    const port = process.env['AUTHORIZE_SERVICE_PORT'] || 3000;


    await app.startAllMicroservices();
    await app.listen(port);

    Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    );
  } catch (error) {
    Logger.error(
      `🚀 Application failed to start: ${error}`, '', 'Bootstrap', false
    );
  }
}

bootstrap();
