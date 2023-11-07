/** 处理数据 */
// 数据处理函数
import { cloneDeep } from 'lodash-es';

/**
 * 返回满足指定条件的第一个子节点
 * @param {any[]} tree 树
 * @param {(item: any) => boolean } cb 条件函数（参数item为当前的节点, 返回判断条件，结果为 true 则满足条件）
 * @param {string} children children 字段
 * @returns {any[]}
 */
export const findLatestNode = (data, cb, children = 'children') => {
    let res = null;
    try {
        for (const item of data) {
            if (cb(item)) {
                res = item;
                throw new Error('catch you');
            } else if (item[children] && item[children].length) {
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

/**
 * @description 收集满足条件的所有子节点（前序迭代遍历，保存的所有节点内的最后一个满足条件的子节点）
 * @param {any[]} tree 树
 * @param {(...arg: any[]) => boolean } cb 条件函数（返回判断条件，结果为 true 表示需要过略）
 * @param {string} children children 字段
 */
export const collectLatestNodes = (tree, cb, children = 'children') => {
    const stack = cloneDeep(tree); // 栈结构
    let currNode = null;
    let res = [];

    while (stack.length) {
        currNode = stack.pop();
        if (!currNode[children] && cb(currNode)) {
            res.push(currNode);
        }
        if (currNode[children]) {
            stack.push(...currNode[children]);
        }
    }
    return res;
};

/**
 * 根据节点属性，过略某些节点，并返回原数组（原数组改变）
 * @param {any[]} tree 树
 * @param {(...arg: any[]) => boolean } cb 条件函数（返回判断条件，结果为 true 表示需要过略）
 * @param {string} children children 字段
 * @returns {any[]} result 过略后的原数组
 */
export const filterNodes = (tree, cb, children = 'children') => {
    tree.forEach((item, index, arr) => {
        if (cb(item)) {
            arr.splice(index, 1);
            return;
        }
        if (item[children] && item[children].length) {
            filterNodes(item[children], cb, children);
        }
    });
    return tree;
};

/**
 * @description 根据提供的属性，收集该节点所在的树的所有层级节点的属性
 * @param {{}} property 树节点对象（key-比对的属性 value-比对的值）
 * @param {any[]} tree 树
 * @param {string | undefined} attr 指定收集节点的某个属性(默认整个节点)
 * @returns {any[]} result 存放搜索到的树节点到顶部节点的路径节点或其属性
 */
export const getNodesByProp = (property, tree, attr) => {
    const key = Object.keys(property)[0];
    const value = property[key];
    let result = [];

    const traverse = (value, path, tree) => {
        if (!tree.length) return;

        for (let item of tree) {
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
