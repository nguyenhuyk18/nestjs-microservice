import { Product } from "@common/entities/product.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProductRepository {
    constructor(@InjectRepository(Product)
    private readonly productRepository: Repository<Product>) { }


    create(data: Partial<Product>): Promise<Product> {
        const entity = this.productRepository.create(data);
        return this.productRepository.save(entity);
    }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async findById(id: number): Promise<Product> {
        return await this.productRepository.findOne({ where: { id } })
    }


    async update(id: number, data: Partial<Product>): Promise<Product | null> {
        await this.productRepository.update(id, data);
        return await this.productRepository.findOne({ where: { id } });
    }


    async isExist(sku: string, name: string): Promise<boolean> {
        const rs = await this.productRepository.findOne({
            where: [{ sku }, { name }]
        });

        // hai dấu chấm than là chuyển đổi kiểu dữ liệu sang boolean con mẹ nó luôn
        return !!rs;
    }
}