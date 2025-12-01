import { Module } from '@nestjs/common';
import { CONFIGURATION } from '../configuration';
import { ProductModule } from './modules/product/product.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ProductModule, ConfigModule.forRoot({ isGlobal: true, load: [() => CONFIGURATION] })],
  controllers: [],
  providers: [],
})
export class AppModule {
  static CONFIGURATION = CONFIGURATION
}
