/** @description 返回满足指定条件的第一个子节 */
export declare function findLatestNode(tree: Array<{
    [key: string]: any;
}>, cb: (item: any) => boolean, // 条件函数（参数item为当前的节点, 返回判断条件，结果为 true 则满足条件）
children?: string): any;
/** @description 前序迭代遍历，收集数组中所有节点内最后一个满足条件的子节点 */
export declare function collectLatestNodes(tree: Array<{
    [key: string]: any;
    children?: any[];
}>, cb: (...arg: any[]) => boolean, // cb 条件函数（返回判断条件，结果为 true 表示需要过略）
children?: string): {
    [key: string]: any;
    children?: any[] | undefined;
}[];
/*** @description 根据节点属性，过略某些节点，并返回原数组（原数组改变）*/
export declare function filterNodes(tree: Array<{
    [key: string]: any;
    children?: any[];
}>, cb: (...arg: any[]) => boolean, // cb 条件函数（返回判断条件，结果为 true 表示需要过略）
children?: string): {
    [key: string]: any;
    children?: any[] | undefined;
}[];
/**
 * @description 根据提供的属性，收集该节点所在的树的所有层级节点的属性
 * @returns {any[]} result 存放搜索到的树节点到顶部节点的路径节点或其属性
 */
export declare function getNodesByProp(property: {
    [key: string]: any;
}, // 树节点对象（key-比对的属性 value-比对的值）
tree: Array<{
    [key: string]: any;
}>, attr: string | undefined): any[];
