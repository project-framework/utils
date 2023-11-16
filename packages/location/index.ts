import { flatMap } from 'lodash-es';

// 获取 location.search/hash 中的值
export const searchParams = (search: string, ...keys: string[]) => {
    search = search.replace(/#|\?/, '');
    const params = new URLSearchParams(search);

    return flatMap(keys).reduce((prev, key) => {
        prev[key] = params.get(key) || undefined;
        return prev;
    }, {} as {[key: string]: any});
};