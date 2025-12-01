import { MetaDataKeys } from '@common/constants/common.constant';
import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AuthorizerResponse, AuthorizedMetadata } from '@common/interfaces/tcp/authorizer/authorizer.response.interface';



export const GetUserData = createParamDecorator(
    (param: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const userData = request[MetaDataKeys.USER_DATA] as AuthorizerResponse;

        if (!userData) {
            throw new UnauthorizedException('User data not found')
        }
        return new AuthorizedMetadata(userData.metadata)
    },
);

