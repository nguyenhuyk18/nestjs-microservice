import { Module } from '@nestjs/common';
// import { InvoiceController } from './modules/invoice/controllers/invoice.controller';
// import { InvoiceService } from './modules/invoice/services/invoice.service';
import { CONFIGURATION, TConfiguration } from '../configuration';
import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
// import { MongoProvider } from '@common/configuration/mongo.config';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { MongoProvider } from '@common/configuration/mongo.config';

@Module({
  imports: [MongoProvider, ConfigModule.forRoot({ isGlobal: true, load: [() => CONFIGURATION] }),
    InvoiceModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static CONFIGURATION: TConfiguration = CONFIGURATION;
}
