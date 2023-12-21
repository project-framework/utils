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

### 在浏览器中使用

如果直接在浏览器中使用，则不需要包管理。直接下载 [release](https://github.com/project-framework/utils/releases) 中的 `index.umd.js`，使用的是 UMD 通用模块规范。

然后在浏览器中引用：

```html
<script src="./index.umd.js"></script>
<script>
    $utils.isNull(null) // output: true
</script>
```

## 📚 功能

### 浏览器

- [getBrowser](https://github.com/project-framework/utils/blob/main/packages/browser/index.ts#L24) 获取浏览器信息
  
  ```js
  import { getBrowser } from '@zerozhang/utils';
  
  console.log(getBrowser()); // output: { type: 'Chrome', versions: 119 }
  ```

- [searchParams](https://github.com/project-framework/utils/blob/main/packages/location/index.ts#L6) 获取 URL 网址参数（search）或网址片段（hasn）的查询字符串
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

- [concatParams](https://github.com/project-framework/utils/blob/main/packages/location/index.ts#L21) 拼接 URL 网址参数（search）或网址片段（hash）

  ```js
  import { concatParams } from '@zerozhang/utils';

  concatParams('http://localhost', { a: 1, b: 2 });
  // output: http://localhost?a=1&b=2

  concatParams('http://localhost', { a: 1, b: 2 }, '#');
  // output: http://localhost#a=1&b=2
  ```

- [openLink](https://github.com/project-framework/utils/blob/main/packages/link/index.ts#L1) 打开链接

  ```js
  import { openLink } from '@zerozhang/utils';
  
  openLink('https://www.baidu.com'); // 默认新窗口打开
  
  openLink('https://www.baidu.com', '_self')
  ```

### 文件操作

- [downloadByUrl](https://github.com/project-framework/utils/blob/main/packages/download/index.ts#L3) 通过 url 下载文件

  ```js
  import { downloadByUrl } from '@zerozhang/utils';
  
  downloadByUrl('http://www.下载地址.com', '文件名');
  ```

### 验证函数

- [is](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L4) 基于 [Object.prototype.toString](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 判断所有类型

- [isUnDef](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L8) 验证是否是 undefined

- [isDef](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L6) 验证是否已定义

- [isNull](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L10) 验证是否是 null

- [isNullOrUnDef](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L12) 验证是否是 null 或 undefined

- [isString](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L14) 验证是否是字符串

- [isNumber](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L16) 验证是否是数字

- [isBoolean](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L20) 验证是否是布尔值

- [isObject](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L24) 验证是否是对象

- [isArray](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L26) 验证是否是数组

- [isFunction](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L47) 验证是否是函数

- [isPromise](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L51) 验证是否是 Promise

- [isDate](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L60) 验证是否是日期

- [isRegExp](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L64) 验证是否是正则表达式

- [isWindow](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L68) 验证是否是 Window 对象

- [isElement](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L72) 验证是否是 DOM 元素

- [isServer](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L72) 验证是否是服务端

- [isClient](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L72) 验证是否是客户端

- [isEmpty](https://github.com/project-framework/utils/blob/main/packages/is/index.ts#L28) 验证对象、数组、Map、Set 是否为空

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

### 数据操作

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

- [SessionStorageProxy](https://github.com/project-framework/utils/blob/main/packages/storage/index.ts#L9) 封装 storage，更方便使用

  ```js
   import { storageSession, storageLocal } from '@zerozhang/utils';
  
   storageSession.setItem('user', { name: 'James', age: 18 }); // 自动 JSON.stringify
   storageSession.getItem('user'); // 自动 JSON.parse
   storageSession.removeItem('user');
   storageSession.clear();
  
   // storageLocal 同理
  ```

- [buildUUID](https://github.com/project-framework/utils/blob/main/packages/uuid/index.ts#L6) 创建 UUID

  ```js
  import { buildUUID, buildShortUUID } from '@zerozhang/utils';
  
  // 生成32位的 uuid：5e4b0c9590f44163a8e76b63ae2ec00a
  const uuid = buildUUID();
  
   // 生成24位带有默认前缀 '_' 的 uuid：_87657121411703147772655
  const shortUuid1 = buildShortUUID();
  const shortUuid2 = buildShortUUID('$'); // 自定义前缀
  ```

### 数学

- [decimalCompute](https://github.com/project-framework/utils/blob/main/packages/math/decimal/index.ts#L11) 用于浮点运算，解决小数点精度丢失问题

  | 参数    | 是否可选 | 类型                  | 说明           |
  | ------- | -------- | --------------------- | -------------- |
  | type    | 必填     | 字面量：+、 -、 *、 / | 表示运算类型   |
  | numbers | 必填     | ...number[]           | 参与运算的数值 |

  返回一个包含 `result` 和 `next` 函数的对象。`result` 为计算结果，`next` 是一个链式调用函数，可以一直往下进行浮点运算。

  ```js
  import { decimalCompute } from '@zerozhang/utils';
  
  0.1 + 0.2; // output: 0.30000000000000004 不符合预期
  decimalCompute('+', 0.1, 0.2).result // output: 0.3 符合预期
  
  0.123 * 0.3; // output: 0.036899999999999995 不符合预期
  decimalCompute('*', 0.123, 0.3).result // output: 0.0369 符合预期
  
  // next 支持链式调用
  (0.1 + 0.2) * 0.12; // output: 0.036000000000000004 不符合预期
  decimalCompute('+', 0.1, 0.2).next('*', 0.12).result // 0.036 符合预期
  ```

### 算法处理

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

### TypeScript 支持

- [handleUnknownError](https://github.com/project-framework/utils/blob/main/packages/error/index.ts#L2) 用于处理在 TS 中使用 `try catch` 时，error 类型为 `unknown` 的场景。

  | 参数   | 是否可选 | 类型                  | 说明                      |
  | ------ | -------- | --------------------- | ------------------------- |
  | error  | 必填     | unknown               | catch 捕获的 error        |
  | format | 可选     | (error: unknown) => T | 格式化非 Error 类型的错误 |

  1. 如果 error 为 `Error` 类型，直接返回：

     ```ts
     try {
         // some code
     } catch (error) {
         const { message } = handleUnknownError(error);
         // use message ...
     }
     ```

  2. 支持传入基于 `Error` 类扩展的自定义 `Error` 泛型：

     ```ts
     interface HttpError extends Error {
         code: number;
     }
     
     try {
         // some code
     } catch (error) {
         const { message, code } = handleUnknownError<HttpError>(error);
         // use message and code ...
     }
     ```

  3. 非常规 error（未知类型），可先自定义扩展 `CustomError` ，然后使用 `format` 函数格式化成 `CustomError` 需要的格式：

     ```ts
     // 自定义错误类
     class CustomError extends Error {
        constructor( public status: number, public statusText: string) {
            super();
        }
     }
     
     // 未知错误格式化
     function format(err: any): CustomError {
        return new CustomError(err.xxx, err.yyy)
     }
     
     try {
         // some code
     } catch (error) {
         const { status, statusText } = handleUnknownError<CustomError>(error, format);
         // use custom statusText and statusText ...
     }
     ```

### HTTP 请求

- [FetchHttp](https://github.com/project-framework/utils/blob/main/packages/http/fetch/index.ts#L21) 基于原生 `fetch` 封装的类，像使用 `Axios` 一样去使用 `fetch` 吧~

  1. 创建实例

     ```ts
     import { FetchHttp } from '@zerozhang/utils';
     
     const http = new FetchHttp({
        mode: 'cors',
        cache: 'default',
        redirect: 'manual',
        referrer: 'client',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        // ...other
     });
     ```

     | 默认配置                | 值                                  | 说明                             |
     | ----------------------- | ----------------------------------- | -------------------------------- |
     | headers['Accept']       | 'application/json, text/plain, */*' | 可在实例化或使用 `request` 时覆盖 |
     | headers['Content-Type'] | 'application/json'                  | 可在实例化或使用 `request` 时覆盖 |
     | credentials             | 'include'                           | 可在实例化或使用 `request` 时覆盖 |
     | 其他默认配置            | 与原生 fetch 相同                   | [fetch() 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch) |

  2. 添加拦截器

     ```ts
     // 添加第一个请求拦截（后执行）
     http.interceptors.request.use(config => {
         (config.headers as Headers).set('Authorization', 'Bearer ' + 'token');
         return config;
     });
     
     // 添加第二个请求拦截（先执行）
     http.interceptors.request.use(config => {
         delete config.credentials;
         return config;
     });
     
     // 添加响应拦截
     http.interceptors.response.use(
         res => {
             // todo: 处理返回的真实数据（即解析后的 response.body）
             const data = res?.data ?? res;
             return data;
         },
         error => {
             // todo: 报错处理
             window.alert(`${error.message} (${error.code})`);
             return Promise.reject(error);
         }
     );
     ```

     **注意：**
     拦截器本质是 `Promise` 的 `executor`，它们都存放在一个数组中，等待 Promise 链的调用。

     请求拦截器相当于 `unshift` 到数组的前面，响应拦截器相当于 `push` 到数组的后面。

     所以，**后添加的请求拦截器会先执行，而后添加的响应拦截器会后执行**。

  3. 使用 `request`

     | 参数   | 是否可选 | 类型               | 说明                        |
     | ------ | -------- | -------------------| --------------------------- |
     | url    | 必填     | string             | 请求 api                    |
     | config | 可选     | FetchRequestConfig | 见下面 `FetchRequestConfig` |

     `FetchRequestConfig` 在继承于 [RequestInit](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.requestinit.html) 类型的基础上额外支持两种属性：

     | 属性       | 是否可选 | 类型                | 说明                        |
     | ---------- | -------- | --------------------| --------------------------- |
     | params     | 可选     | Record\<string, any\> | 网址查询参数                    |
     | [readMethod](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch#body) | 可选     | 字面量 'arrayBuffer' \| 'blob' \| 'formData' \| 'json' \| 'text' | 指定读取 `Response` 的方法，默认 `json` |

     ```ts
     http.request(
        'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits',
        {
            method: 'GET',
            params: { name: 'zs', age: 18 },
            readMethod: 'text',
            headers: {
                'X-GitHub-Api-Version': '2023-12-15'
            },
            // ......
        }
     );
     ```

  4. 使用原型上的 `get` 和 `post`
     FetchHttp 提供了快捷的 `get` 和 `post`，您可以使用它们方便的发起请求。

     `get` 参数：
     | 参数   | 是否可选 | 类型                  | 说明                             |
     | ------ | -------- | ----------------------| ---------------------------------|
     | url    | 必填     | string                | 请求 api                         |
     | params | 可选     | Record\<string, any\> | 网址查询参数                     |
     | config | 可选     | FetchRequestConfig    | 见上述 `FetchRequestConfig` 类型 |

     `post` 参数：
     | 参数   | 是否可选 | 类型               | 说明                             |
     | ------ | -------- | -------------------| --------------------------------|
     | url    | 必填     | string             | 请求 api                         |
     | data   | 可选     | 请求实体           | 请求实体                         |
     | config | 可选     | FetchRequestConfig | 见上述 `FetchRequestConfig` 类型 |

     ```ts
     http.get(
        'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits',
        { name: 'zs', age: 18 },
        {
            headers: { 'X-GitHub-Api-Version': '2023-12-15' },
            credentials: 'include',
        }
     )
     
     const form = new FormData();
     formData.append('file', data);
     
     http.post(
        'https://yourapi.com',
        form,
        {
            headers: { 'Content-Type': 'multipart/form-data' },
        }
     )
     ```
