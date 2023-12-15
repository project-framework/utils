/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import qs from 'query-string';
import { isArray, isObject, isEmpty } from '@/is';

export enum ContentType {
    URLEncoded = 'application/x-www-form-urlencoded',
    FormData = 'multipart/form-data',
    JSON = 'application/json',
}

abstract class BaseHttp {
    protected getContentType(headers: HeadersInit | undefined, defaultType = '') {
        if (isEmpty(headers)) return defaultType;

        let contentType = defaultType;

        if (headers instanceof Headers) {
            contentType = headers.get('Content-Type') ?? '';
        } else if (isArray(headers)) {
            const header = headers.find(item => {
                const key = item[0].match(/a-zA-Z/g)?.join('') ?? '';
                return key.toLocaleLowerCase() === 'contenttype';
            });
            contentType = header?.[1] ?? '';
        } else if (isObject(headers)) {
            // prettier-ignore
            // eslint-disable-next-line @typescript-eslint/dot-notation, max-len
            contentType = headers['Content-Type'] || headers.ContentType || headers['content-type'] || '';
        }

        return contentType;
    }

    protected handleBody(body: any, contentType: string) {
        if (!body) return null;

        if (contentType.includes(ContentType.JSON)) {
            body = JSON.stringify(body);
        } else if (contentType.includes(ContentType.URLEncoded)) {
            body = qs.stringify(body);
        }

        return body;
    }

    abstract request(url: string, config: Record<string, any>): Promise<unknown>;

    abstract get(
        url: string,
        params: Record<string, any>,
        config: Record<string, any>
    ): Promise<unknown>;

    abstract post(url: string, body: any, config: Record<string, any>): Promise<unknown>;
}

export default BaseHttp;
