import { flatMap } from 'lodash-es';

/**
 * @description 获取 location.search/hash 中的值
 */
export const searchParams = (search: string, ...keys: string[]) => {
    // eslint-disable-next-line no-param-reassign
    search = search.replace(/#|\?/, '');
    const params = new URLSearchParams(search);

    return flatMap(keys).reduce<Record<string, any>>((prev, key) => {
        prev[key] = params.get(key);
        return prev;
    }, {});
};


/**
 * @description url 拼接 params
 */
export const concatParams = (url: string, params: Record<string, any>, prefix: '?' | '#' = '?') => {
    let query = '';
    const keys = Object.keys(params);

    if (keys.length) {
        query = keys.reduce((str, k, i) => {
            // eslint-disable-next-line no-param-reassign
            str += `${i ? '&' : ''}${k}=${params[k]}`;
            return str;
        }, prefix);
    }

    return url + query;
};
