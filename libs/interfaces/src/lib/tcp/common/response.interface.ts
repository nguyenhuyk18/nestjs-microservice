import { HTTP_MESSAGE } from "@common/constants/enum/http-message.enum";
import { HttpStatus } from "@nestjs/common";

export class Response<T> {
    code: string = HTTP_MESSAGE.OK;
    data?: T;
    error?: string;
    statusCode: HttpStatus.OK;

    constructor(data: Partial<Response<T>>) {
        Object.assign(this, data);
    }

    static success<T>(data: T) {
        return new Response<T>({ data, code: HTTP_MESSAGE.OK, statusCode: HttpStatus.OK })
    }
}

export type ResponseType<T> = Response<T>;
