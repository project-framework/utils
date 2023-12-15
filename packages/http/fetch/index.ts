/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/return-await */
import BaseHttp from '../index';
import { concatParams } from '@/location';
import InterceptorManager, { type Interceptor } from './interceptorManager';
import dispatchRequest from './dispatchRequest';
import { isArray, isObject } from '@/is';

export type FetchReadMethod = 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text';

export interface FetchRequestConfig extends RequestInit {
    params?: Record<string, any>;
    readMethod?: FetchReadMethod; // 指定读取 Response 对象的方法
}

interface Interceptors {
    request: InterceptorManager<FetchRequestConfig>;
    response: InterceptorManager<any>;
}

class FetchHttp extends BaseHttp {
    private readonly defaultConfig: FetchRequestConfig = {
        credentials: 'include', // 默认支持发送跨域 cookie
    };

    interceptors: Interceptors;

    constructor(initConfig?: FetchRequestConfig) {
        super();
        this.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager(),
        };

        // 初始化 headers
        const initHeaders = new Headers({
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        });
        this.defaultConfig.headers = initHeaders;

        // 合并初始化配置
        if (initConfig) {
            const { headers, ...rest } = initConfig;

            // 覆盖默认 headers
            if (headers instanceof Headers) {
                headers.forEach((value, key) => {
                    (this.defaultConfig.headers as Headers).set(key, value);
                });
            } else if (isArray(headers)) {
                for (const item of headers) {
                    const [key, value] = item;
                    this.defaultConfig.headers.set(key, value);
                }
            } else if (isObject(headers)) {
                for (const key in headers) {
                    this.defaultConfig.headers.set(key, headers[key]);
                }
            }

            // 合并其他配置项
            Object.assign(this.defaultConfig, rest);
        }
    }

    async request(url: string, config: FetchRequestConfig = {}) {
        const { method = 'GET', params, headers, readMethod, ...otherConfig } = config;

        // #region 处理 url、config 等配置
        if (params) url = concatParams(url, params);
        Object.assign(this.defaultConfig.headers as HeadersInit, headers);
        Object.assign(this.defaultConfig, otherConfig);
        // #endregion

        // 声明一个 Promise 链，存放所有的拦截器（包括真正用于请求的 dispatchRequest）
        const chain: Array<Interceptor<FetchRequestConfig>> = [
            {
                resolved: dispatchRequest,
                rejected: undefined,
            },
        ];

        // 将请求拦截塞进 chain 前面
        this.interceptors.request.forEach(interceptor => {
            chain.unshift(interceptor);
        });

        // 将响应拦截塞进 chain 后面
        this.interceptors.response.forEach(interceptor => {
            chain.push(interceptor);
        });

        // 利用 config 初始化一个 promise
        let promise = Promise.resolve({
            url,
            method,
            ...this.defaultConfig,
        });

        // 执行任务
        while (chain.length) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const { resolved, rejected } = chain.shift()!;
            promise = promise.then(resolved, rejected);
        }

        return promise;
    }

    async get(url: string, params?: Record<string, any>, config?: FetchRequestConfig) {
        return this.request(url, {
            method: 'GET',
            params,
            ...config,
        });
    }

    async post(url: string, data: any, config: FetchRequestConfig = {}) {
        // 根据 Content-Type 处理 body
        const contentType = super.getContentType(config.headers, 'application/json');
        const body = super.handleBody(data, contentType);

        return this.request(url, {
            method: 'POST',
            body,
            ...config,
        });
    }
}

export default FetchHttp;
