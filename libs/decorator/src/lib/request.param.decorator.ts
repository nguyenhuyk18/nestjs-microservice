import { createParamDecorator, ExecutionContext } from '@nestjs/common'
// import { MetaDataKeys } from '@common/constants/common.constant'


export const RequestParams = createParamDecorator(
    (param: string, ctx: ExecutionContext) => {
        const request = ctx.switchToRpc().getData();

        if (!param) {
            return request.data;
        }

        return request.data[param];
    },
);









// cái decorator này dùng để truy xuất request từ bff gửi đến các service khác nhằm lấy ra data của provider gửi đến các consumer có thể lấy ra tên thuộc tính cụ thể 