import flatMap from 'lodash/flatMap';

// 获取 location.search/hash 中的值
export const searchParams = (search, ...keys) => {
    search = search.replace(/#|\?/, '');
    const params = new URLSearchParams(search);

    return flatMap(keys).reduce((prev, key) => {
        prev[key] = params.get(key) || undefined;
        return prev;
    }, {});
};