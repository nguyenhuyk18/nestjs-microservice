/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const globalPrefix = AppModule.CONFIGURATION.GLOBAL_PREFIX;
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(new ValidationPipe({ transform: true }))
    AppModule.CONFIGURATION.validate();

    app.enableCors({
      origin: '*'
    })

    const port = AppModule.CONFIGURATION.APP_CONFIG.PORT || 3000;

    const config = new DocumentBuilder()
      .setTitle('E-bff API')
      .setDescription('The E-bff API description')
      .setVersion('1.0.0')
      .addBearerAuth({
        description: 'Default JWT Authorization',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
      })
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${globalPrefix}/docs`, app, documentFactory);

    await app.listen(port);

    Logger.log(
      `🚀 See all the api on: http://localhost:${port}/${globalPrefix}/docs`
    );

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
