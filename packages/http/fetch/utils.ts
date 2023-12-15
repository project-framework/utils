import { handleUnknownError, type HttpError } from '@/error';

/** @description 提取错误信息的公共方法 */
export const errorCaptor = (error: unknown) => {
    const {
        message = 'Internal Server Error.',
        code = 500,
        data,
    } = handleUnknownError<HttpError>(error);
    return { message, code, data };
};
