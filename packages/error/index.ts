/** @description 处理 ts catch 中的 error 类型 */
export function handleUnknownError<T extends Error>(error: unknown, format?: (error: any) => T): T {
    if (error instanceof Error) return error as T;

    // 非常规错误允许自定义扩展 Error 类
    if (format) return format(error);

    // eslint-disable-next-line no-console
    console.error(
        'Warning: Expecting a `format` function to standardize error which is of type unknown.'
    );
    return error as T;
}

interface HttpErrorProps {
    code: number | string;
    message: string;
    data: any;
    [key: string]: any;
}

export class HttpError extends Error {
    code: number | string;

    data: any;

    constructor(props: HttpErrorProps) {
        super(props.message);
        this.code = props.code;
        this.data = props.data;
    }
}
