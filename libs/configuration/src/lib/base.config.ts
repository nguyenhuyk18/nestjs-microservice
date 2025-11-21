import { Logger } from "@nestjs/common";
import { IsBoolean, IsNotEmpty, IsString, validateSync } from "class-validator";

export class BaseConfiguration {
    @IsString()
    NODE_ENV: string

    @IsBoolean()
    IS_DEV: boolean


    @IsString()
    @IsNotEmpty()
    GLOBAL_PREFIX: string

    constructor() {
        this.NODE_ENV = process.env['NODE_ENV'] || '';
        this.IS_DEV = this.NODE_ENV === 'development';
        // this.PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
        this.GLOBAL_PREFIX = process.env['GLOBAL_PREFIX'] || '';
    }

    validate() {
        const error = validateSync(this);
        if (error.length) {
            const errors = error.map((err) => {
                return err.children;
            })

            Logger.error(errors, error)
            throw new Error('Configuration is invalid !!!')
        }
    }
}




// export const CONFIGURATION = new BaseConfiguration();
// export type TConfiguration = typeof CONFIGURATION;