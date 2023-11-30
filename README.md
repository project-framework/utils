# Utils 大全

![npm](https://img.shields.io/npm/v/%40zerozhang%2Futils)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/project-framework/utils/main.yml)
![GitHub license](https://img.shields.io/github/license/project-framework/utils?style=flat)
![Coveralls branch](https://img.shields.io/coverallsCoverage/github/project-framework/utils)

## ✨ 简介

前端工具库，收集整理日常开发过程中的通用 utils 。

## 📦 安装

```bash
$ npm install --save @zerozhang/utils
# or
$ yarn add @zerozhang/utils
# or
$ pnpm add @zerozhang/utils
# or
$ bun add @zerozhang/utils
```

## 🔨 使用

### 使用 ESModule 规范导入

```js
import { isEmpty } from '@zerozhang/utils';
console.log(isEmpty([])) // 输出 true
console.log(isEmpty([1])) // 输出 false
```

### 使用 CommonJS 规范导入

```js
const { isEmpty } from require('@zerozhang/utils');
console.log(isEmpty([])) // 输出 true
console.log(isEmpty([1])) // 输出 false
```
<!-- ### 在浏览器中使用
如果直接在浏览器中使用，则不需要包管理。直接下载[release](https://github.com/SaebaRyoo/fe-utils/releases)中的index.umd.js,使用的是umd通用模块规范

然后在浏览器中引用
```html
<script src="index.umd.js"></script>
<script>
    console.log(FE_utils.sum(1,2,3,4)) // 输出10
</script>
```
-->

## 📚 功能

### 浏览器

- [getBrowser](https://github.com/project-framework/utils/blob/main/packages/browser/index.ts#L24) 获取浏览器信息
  
  ```js
  import { getBrowser } from '@zerozhang/utils';
  
  console.log(getBrowser()); // output: { type: 'Chrome', versions: 119 }
  ```

- [searchParams](https://github.com/project-framework/utils/blob/main/packages/location/index.ts#L4) 获取 URL 网址参数（search）或网址片段（hasn）的查询字符串
  基于 [URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams) 实现的处理 URL 查询字符串的方法。
  
  ```js
  import { searchParams } from '@zerozhang/utils';

  // 获取 window.location.search 查询字符串
  searchParams('?a=1&b=2', 'a');       // output: { a: '1' }
  searchParams('?a=1&b=2', 'a','b');   // output: { a: '1', b: '2' }
  searchParams('?a=1&b=2', ['a','b']); // output: { a: '1', b: '2' }
  searchParams('?a=1&b=2', 'c');       // output: { c: null }

  // window.location.hash 同上。
  ```

### 文件操作

- [downloadByUrl](https://github.com/project-framework/utils/blob/main/packages/download/index.ts#L3) 通过 url 下载文件

  ```js
  import { downloadByUrl } from '@zerozhang/utils';
  
  downloadByUrl('http://www.下载地址.com', '文件名');
  ```

### JSON 操作

- [jsonParser](https://github.com/project-framework/utils/blob/main/packages/json/index.ts#L2) 解析 JSON

  ```js
  import { jsonParser } from '@zerozhang/utils';
  
  // 标准 JOSN 格式
  jsonParser('{ "name": "James", "age": 18 }');    // output: { name: 'James', age: 18 }
  jsonParser('xxx');                               // output: null
  jsonParser({});                                  // output: null

  // 支持传入 reviver 转换器
  jsonParser('{"p": 5}', (k, v) => k ? v * 2 : v); // output: { p: 10 }
  ```

### 验证函数

- [is](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L4) 基于 [Object.prototype.toString](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 判断所有类型

- [isUnDef](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L8) 验证是否是 undefined

- [isDef](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L6) 验证是否已定义

- [isNull](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L10) 验证是否是 null

- [isNullOrUnDef](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L12) 验证是否是 null 或 undefined

- [isObject](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L14) 验证是否是对象

- [isString](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L16) 验证是否是字符串

- [isNumber](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L18) 验证是否是数字

- [isArray](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L22) 验证是否是数组

- [isFunction](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L42) 验证是否是函数

- [isEmpty](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L24) 验证对象、数组、Map、Set 是否为空

  ```js
    import { isEmpty } from '@zerozhang/utils';

    isEmpty(null);                  // true
    isEmpty(undefined);             // true
    isEmpty(123);                   // false
    isEmpty('xxx');                 // false
    isEmpty(true);                  // false
    isEmpty({});                    // true
    isEmpty([]);                    // true
    isEmpty(new Map().set('a', 1)); // false
    isEmpty(new Set().add(1));      // false
  ```

### 进度条

基于 [NProgress](https://www.npmjs.com/package/nprogress) 封装的进度条，可用于请求加载、路由加载等场景。

```js
import { NProgress } from '@zerozhang/utils';

function http (url) {
    NProgress.start();

    return new Promise(() => {
        fetch(url, {/** options */})
            .then(/**  略 */)
            .catch(/** 略 */)
            .finally(() => {
                NProgress.done();
            })
    })
}
```

### 数据处理

用于处理树形结构组成的数组，一般用于嵌套菜单、树形权限等场景。数据结构类似于以下形式：

```js
    const data = [
        {
            id: '1',
            value: 1,
            children: [
                { id: '1-01', value: 12 },
                {
                    id: '1-02',
                    value: 13,
                    children: [
                        { id: '1-02-01', value: 131 },
                        { id: '1-02-02', value: 132 },
                    ]
                }
            ]
        },
        {
            id: '2',
            value: 2,
            children: [
                {
                    id: '2-01',
                    value: 21,
                    children: [
                        { id: '2-02-01', value: 211, },
                        { id: '2-02-02', value: 212, },
                    ]
                },
                { id: '2-02', value: 22, }
            ]
        }
    ]
```

- [findLatestNode](https://github.com/project-framework/utils/blob/main/packages/dataHandler/index.ts#L5) 查找到满足条件的第一个子节点

  ```js
  import { findLatestNode } from '@zerozhang/utils';

  findLatestNode(data, item => item.value % 2 === 0, 'children'); // output: { id: '1-01', value: 12 }
  ```

- [collectLatestNodes](https://github.com/project-framework/utils/blob/main/packages/dataHandler/index.ts#L31) 收集节点内满足条件的所有子节点

  ```js
  import { collectLatestNodes } from '@zerozhang/utils';

  collectLatestNodes(data, item => item.value % 2 === 0, 'children');
  // output:
  // [
    // {id: '2-02', value: 22},
    // {id: '2-02-02', value: 212},
    // {id: '1-02-02', value: 132},
    // {id: '1-01', value: 12},
  // ]
  ```

- [getNodesByProp](https://github.com/project-framework/utils/blob/main/packages/dataHandler/index.ts#L75) 根据提供的属性，收集该节点所在的树的所有层级节点的属性, 一般用于查找路径。

  ```js
  import { getNodesByProp } from '@zerozhang/utils';

  getNodesByProp({ value: 212 }, data, 'value'); // output: ['2', '2-01', '2-02-02']
  ```
