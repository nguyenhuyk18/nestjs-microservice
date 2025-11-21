import { IsNumber } from "class-validator";

export class AppConfiguration {
    // NODE_ENV: string
    // IS_DEV: boolean
    @IsNumber()
    PORT: number
    // GLOBAL_PREFIX: string

    constructor() {
        this.PORT = process.env['PORT'] ? Number(process.env['PORT']) : 3400;

    }
}