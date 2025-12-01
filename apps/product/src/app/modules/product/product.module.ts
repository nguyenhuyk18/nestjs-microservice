import { TypeOrmProvider } from "@common/configuration/type-orm.config";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from '@common/entities/product.entity';
import { ProductRepository } from "./repositories/product.repository";
import { ProductService } from "./services/product.service";
import { ProductController } from "./controllers/product.controller";

@Module({
    imports: [TypeOrmProvider, TypeOrmModule.forFeature([Product])],
    providers: [ProductRepository, ProductService],
    controllers: [ProductController],
    exports: []
})
export class ProductModule { }