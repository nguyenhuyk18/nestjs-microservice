import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from 'mongodb'



export class CreateUserRequestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty({ type: [String] })
    @IsString({ each: true })
    @IsArray()
    roles: string[];


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}