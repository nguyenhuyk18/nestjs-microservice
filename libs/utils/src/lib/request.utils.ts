import { parseToken } from "./string.utils";
// import { User } from '@c';
import { AuthorizerResponse } from '@common/interfaces/tcp/authorizer/authorizer.response.interface';
import { MetaDataKeys } from '@common/constants/common.constant';

export function getAccessToken(req: any, keepBearer = false): string {
    const token = req.headers?.['authorization'];
    return keepBearer ? token : parseToken(token);
}


export function setUserData(req: any, userInfo: AuthorizerResponse) {
    req[MetaDataKeys.USER_DATA] = userInfo;
}