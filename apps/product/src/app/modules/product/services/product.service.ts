import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repositories/product.repository';
import { Product } from '@common/entities/product.entity';
import { CreateProductTcpRequest } from '@common/interfaces/tcp/product';

@Injectable()
export class ProductService {
    constructor(private productRepository: ProductRepository) { }

    async createProduct(data: CreateProductTcpRequest) {
        const { sku, name } = data;

        const exist = await this.productRepository.isExist(sku, name);
        // console.log(exist);
        if (exist) {
            throw new BadRequestException('Product already exists');
        }

        const rs = await this.productRepository.create(data);
        return rs;
    }

    async getById(id: number) {
        const rs = await this.productRepository.findById(id);
        return rs;
    }

    async getAllProduct() {
        const rs = await this.productRepository.findAll();
        return rs;
    }
}