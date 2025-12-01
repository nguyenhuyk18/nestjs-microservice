import { User } from '@common/schemas/user.schema';
import { LoginResponseDto } from '../../gateway/authorizer/authorizer-response.dto.interface';
import { PERMISSION } from '@common/constants/enum/user-access.enum';
import { JwtPayload } from 'jsonwebtoken';

export type LoginTcpResponse = LoginResponseDto


export class AuthorizedMetadata {
    userId: string | undefined;
    user: User | undefined;
    permissions: PERMISSION[] | undefined;
    jwt: JwtPayload | undefined;

    constructor(payload?: Partial<AuthorizedMetadata>) {
        Object.assign(this, payload);
    }
}

export class AuthorizerResponse {
    valid = false;
    metadata = new AuthorizedMetadata()
}