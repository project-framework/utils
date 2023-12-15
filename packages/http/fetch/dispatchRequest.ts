import { HttpError } from '@/error';
import { errorCaptor } from './utils';
import type { FetchRequestConfig } from './index';

interface Config extends FetchRequestConfig {
    url: string;
}

/** @descript 真正用于请求的方法 */
export default async function dispatchRequest(config: Config) {
    const { url, readMethod, ...init } = config;

    try {
        const response = await fetch(url, init);

        // 读取 response（目前支持 josn 和 text，其他类型请自行指定 readMethod）
        const contentType = response.headers.get('Content-Type') ?? '';
        let body: any;
        if (contentType.includes('application/json')) {
            body = await response.json();
        } else if (/text\/(html|plain)/.test(contentType)) {
            body = await response.text();
        } else {
            if (!readMethod) {
                // eslint-disable-next-line no-console
                console.error(
                    'Warning: `readMethod` is not specified, response will be read by `json`.'
                );
            }
            body = await response[readMethod ?? 'json']();
        }

        // 处理成功响应
        if (response.ok) return body;

        // 处理失败响应（非网络故障或被阻止的请求，视为 error）
        const { status, statusText } = response;
        const message = body.msg || body.message || statusText;
        const code = body.code || status;
        throw new HttpError({ code, message, data: body });
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/return-await
        return Promise.reject(errorCaptor(error));
    }
}
