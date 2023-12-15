/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/return-await */
import FetchHttp from './index';

const http = new FetchHttp({
    mode: 'cors',
    cache: 'default',
    redirect: 'manual',
    referrer: 'client',
    // other configuration: https://developer.mozilla.org/zh-CN/docs/Web/API/fetch
});

// 添加第一个请求拦截（后执行）
http.interceptors.request.use(config => {
    console.log('🚀 ~ second config:', config);
    (config.headers as Headers).set('Authorization', 'Bearer ' + 'token');
    return config;
});

// 添加第二个请求拦截（先执行）
http.interceptors.request.use(config => {
    console.log('🚀 ~ first config:', config);
    delete config.credentials;
    return config;
});

// 添加响应拦截
http.interceptors.response.use(
    res => {
        // todo: 处理返回的真实数据（即解析后的 response.body）
        const data = res?.data ?? res;
        console.log('🚀 ~ data:', data);
        return data;
    },
    error => {
        // todo: 报错处理
        window.alert(`${error.message} (${error.code})`);
        return Promise.reject(error);
    }
);

async function fetchApi() {
    try {
        return await http.request(
            'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits',
            { credentials: undefined }
        );
    } catch (error) {
        console.log('🚀 ~ error:', error);
    }
}

fetchApi();

// 直接使用实例方法
http.get(
    'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits',
    { a: 1 },
    { credentials: undefined }
);
