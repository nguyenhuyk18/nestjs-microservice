import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ClientRequestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address: string;
}


class ItemRequestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    productId: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    unitPrice: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    vatRate: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    total: number;
}


export class CreateInvoiceRequestDto {
    @ApiProperty({ type: ClientRequestDto })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ClientRequestDto)
    client: ClientRequestDto;

    @ApiProperty({ type: [ItemRequestDto] })
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @IsArray()
    @Type(() => ItemRequestDto)
    item: ItemRequestDto[]
}