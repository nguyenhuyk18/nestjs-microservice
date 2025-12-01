import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "../common/base-response.dto";
// import { ObjectId } from 'mongodb'

export class UserResponseDto extends BaseResponseDto<string> {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    email: string;

    @ApiProperty({ type: [String] })
    roles: string[];
}