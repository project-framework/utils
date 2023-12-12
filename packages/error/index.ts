import { isObject } from '@/is';

export type CommonError = Omit<Error, 'name'> & {
    code?: number | string;
}

export function isCommonError(error: unknown): error is CommonError {
    if (error instanceof Error) return true;
    if (isObject(error) && 'message' in error) return true;
    return false;
}

/**
 * @description 处理 ts catch 中的 error 类型
 */
export function handleUnknownError(error: unknown) {
    if (isCommonError(error)) return error;

    // 非常规错误转成 CommonError
    return { message: JSON.stringify(error) };
}
