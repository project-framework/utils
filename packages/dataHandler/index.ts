// 数据处理函数
import { cloneDeep } from 'lodash-es';

/** @description 返回满足指定条件的第一个子节 */
export function findLatestNode(
    tree: Array<Record<string, any>>,
    cb: (item: any) => boolean, // 条件函数（参数item为当前的节点, 返回判断条件，结果为 true 则满足条件）
    children = 'children', // children 字段
): any {
    let res = null;
    try {
        for (const item of tree) {
            if (cb(item)) {
                res = item;
                throw new Error('catch you');
            } else if (item[children]?.length) {
                const temp = findLatestNode(item[children], cb, children);
                if (temp) {
                    res = temp;
                    throw new Error('catch you');
                }
            }
        }
    } catch (error) {
        // log.error(e)
    }
    return res;
};

/** @description 前序迭代遍历，收集数组中所有节点内最后一个满足条件的子节点 */
export function collectLatestNodes(
    tree: Array<{ [key: string]: any, children?: any[] }>,
    cb: (...arg: any[]) => boolean, // cb 条件函数（返回判断条件，结果为 true 表示需要过略）
    children = 'children', // children 字段
) {
    const stack = cloneDeep(tree); // 栈结构
    let currNode = null;
    const res = [];

    while (stack.length) {
        currNode = stack.pop();
        if (!currNode) continue;
        if (!currNode[children] && cb(currNode)) {
            res.push(currNode);
        }
        if (currNode[children]) {
            stack.push(...currNode[children]);
        }
    }
    return res;
};

/** * @description 根据节点属性，过略某些节点，并返回原数组（原数组改变） */
export function filterNodes(
    tree: Array<{ [key: string]: any, children?: any[] }>,
    cb: (...arg: any[]) => boolean, // cb 条件函数（返回判断条件，结果为 true 表示需要过略）
    children = 'children'
) {
    tree.forEach((item, index, arr) => {
        if (cb(item)) {
            arr.splice(index, 1);
            return;
        }
        if (item[children]?.length) {
            filterNodes(item[children], cb, children);
        }
    });
    return tree;
};

/**
 * @description 根据提供的属性，收集该节点所在的树的所有层级节点的属性
 * @returns {any[]} result 存放搜索到的树节点到顶部节点的路径节点或其属性
 */
export function getNodesByProp(
    property: Record<string, any>, // 树节点对象（key-比对的属性 value-比对的值）
    tree: Array<Record<string, any>>,
    attr: string | undefined, // attr 指定收集节点的某个属性(默认整个节点)
): any[] {
    const key = Object.keys(property)[0];
    const value = property[key];
    let result = [] as any[];

    const traverse = (value: any, path: any[], tree: Array<Record<string, any>>) => {
        if (tree.length) return;

        for (const item of tree) {
            path.push(attr ? item[attr] : item);
            if (item[key] === value) {
                result = JSON.parse(JSON.stringify(path));
                return;
            }

            const children = Array.isArray(item.children) ? item.children : [];
            traverse(value, path, children);
            path.pop();
        }
    };

    traverse(value, [], tree);
    return result;
};
