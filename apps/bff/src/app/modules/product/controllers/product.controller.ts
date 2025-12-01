import { TCP_SERVICE } from "@common/configuration/tcp.config";
import type { TcpClient } from "@common/interfaces/tcp/common/tcp-client.interface";
import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { CreateProductRequestDto, ProductResponseDto } from '@common/interfaces/gateway/product';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { ResponseDto } from "@common/interfaces/gateway/response.interface";
import { firstValueFrom, map } from "rxjs";
import { TCP_REQUEST_MESSAGE } from "@common/constants/enum/tcp-request-message.enum";
import { ProcessId } from "@common/decorator/processid.decorator";
import { Authorization } from '@common/decorator/authorizer.decorator';


@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(@Inject(TCP_SERVICE.PRODUCT_SERVICE) private productClient: TcpClient) { }

    @Get()
    @Authorization({ secured: false })
    @ApiOkResponse({ type: ResponseDto<ProductResponseDto[]> })
    @ApiOperation({ summary: 'Get All Product' })
    async getAll(@ProcessId() processid) {
        const rs = await this.productClient.send<ProductResponseDto[]>(TCP_REQUEST_MESSAGE.PRODUCT.GET_ALL, { processId: processid }).pipe(map(row => new ResponseDto(row)));
        return rs;
    }

    @Get(':id')
    @ApiOkResponse({ type: ResponseDto<ProductResponseDto> })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'ID của sản phẩm cần lấy',
        schema: { type: 'integer' }
    })
    @ApiOperation({ summary: 'Get Product By ID' })
    async getById(@Param('id') id: number, @ProcessId() processid) {
        const rs = await firstValueFrom(this.productClient.send<string, number>(TCP_REQUEST_MESSAGE.PRODUCT.GET_BY_ID, { data: id, processId: processid }).pipe(map(row => new ResponseDto(row))));
        return rs;
    }

    @Post()
    @ApiOkResponse({ type: ResponseDto<ProductResponseDto> })
    @ApiOperation({ summary: 'Created Product' })
    async create(@Body() body: CreateProductRequestDto, @ProcessId() processid) {
        // console.log(data);
        const rs = await firstValueFrom(this.productClient.send<string, CreateProductRequestDto>(TCP_REQUEST_MESSAGE.PRODUCT.CREATE, { data: body, processId: processid }).pipe(map(row => new ResponseDto(row))));
        return rs;
    }



    //     @Post()
    // // @ApiOkResponse({ type: ResponseDto<ProductResponseDto> })
    // // @ApiOperation({ summary: 'Created Product' })
    // async create(@Body() body: CreateProductRequestDto, @ProcessId() processid) {
    //     // console.log(data);
    //     const rs = await firstValueFrom(this.productClient.send<string, CreateProductRequestDto>(TCP_REQUEST_MESSAGE.PRODUCT.CREATE, { data: body, processId: processid }).pipe(map(row => new ResponseDto(row))));
    //     return rs;
    // }





}