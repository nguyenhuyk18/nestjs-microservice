import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { MetaDataKeys } from '@common/constants/common.constant'
import { getProcessId } from '@common/utils/string.utils';

// cái decorator này dùng để truy xuất lấy ra processId được gán ở middleware cho nó nhanh gọn
export const ProcessId = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request[MetaDataKeys.PROCESS_ID] || getProcessId();
    },
);