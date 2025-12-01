import { Controller, UseInterceptors } from "@nestjs/common";
import { ProductService } from '../services/product.service';
import { MessagePattern } from '@nestjs/microservices';
import { TCP_REQUEST_MESSAGE } from '@common/constants/enum/tcp-request-message.enum';
import { RequestParams } from '@common/decorator/request.param.decorator';
import type { CreateProductTcpRequest, ProductTcpResponse } from "@common/interfaces/tcp/product";
import { Response } from '@common/interfaces/tcp/common/response.interface'
import type { ResponseType } from '@common/interfaces/tcp/common/response.interface'
import { TcpLoggingInterceptor } from '@common/interceptors/tcpLogging.interceptors';

@Controller()
@UseInterceptors(TcpLoggingInterceptor)
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @MessagePattern(TCP_REQUEST_MESSAGE.PRODUCT.GET_ALL)
    async getAll() {
        const rs = await this.productService.getAllProduct();
        // console.log(rs);
        return Response.success<ProductTcpResponse[]>(rs);
    }

    @MessagePattern(TCP_REQUEST_MESSAGE.PRODUCT.GET_BY_ID)
    async getById(@RequestParams() data: number) {
        const rs = await this.productService.getById(data);
        return Response.success<ProductTcpResponse>(rs);
    }

    @MessagePattern(TCP_REQUEST_MESSAGE.PRODUCT.CREATE)
    async create(@RequestParams() data: CreateProductTcpRequest): Promise<ResponseType<ProductTcpResponse>> {
        // console.log(data, 'tcp');
        const rs = await this.productService.createProduct(data);
        return Response.success<ProductTcpResponse>(rs);
    }

}