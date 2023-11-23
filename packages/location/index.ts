import { flatMap } from 'lodash-es';

// 获取 location.search/hash 中的值
export const searchParams = (search: string, ...keys: string[]) => {
    // eslint-disable-next-line no-param-reassign
    search = search.replace(/#|\?/, '');
    const params = new URLSearchParams(search);

    return flatMap(keys).reduce<Record<string, any>>((prev, key) => {
        prev[key] = params.get(key);
        return prev;
    }, {});
};
