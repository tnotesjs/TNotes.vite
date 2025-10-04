# [0018. vite 配置文件 - vite.config.js](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0018.%20vite%20%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%20-%20vite.config.js)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 vite 配置文件是？](#3--vite-配置文件是)
- [4. 🤔 vite 可以直接导出一个对象吗？比如：`export default { ... }`](#4--vite-可以直接导出一个对象吗比如export-default---)
- [5. 🤔 书写 vite 配置文件如何获得智能提示呢？](#5--书写-vite-配置文件如何获得智能提示呢)
- [6. 🤔 情景配置是什么？](#6--情景配置是什么)
- [7. 🔗 引用](#7--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- todo

## 2. 🫧 评价

- todo

## 3. 🤔 vite 配置文件是？

- JS 版：`vite.config.js`
- TS 版：`vite.config.ts`
- 这两种格式都 ok，具体得看你的项目是否是基于 ts 的，如果是，则使用 `.ts` 后缀，否则使用 `.js` 后缀。

## 4. 🤔 vite 可以直接导出一个对象吗？比如：`export default { ... }`

- 可以。

::: code-group

```ts [vite.config.ts]
// 可以直接导出一个对象
// 这是配置文件最基础的写法
// 虽然简洁，但是无法获取智能提示
export default {
  // 配置选项
}
```

:::

## 5. 🤔 书写 vite 配置文件如何获得智能提示呢？

- 官方提供了 3 种方式：
  - 方法 1. 使用 `JSDoc`
  - 方法 2. 使用 `defineConfig`
  - 方法 3. 使用 TS 强类型约束

::: code-group

```js [1]
// 因为 Vite 本身附带 TypeScript 类型，
// 所以你可以通过 IDE 和 jsdoc 的配合来实现智能提示：
/** @type {import('vite').UserConfig} */
export default {
  // ...
}
```

```js [2]
// 可以使用 defineConfig 工具函数，
// 这样不用 jsdoc 注解也可以获取类型提示：
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
})
```

```js [3]
// Vite 也直接支持 TypeScript 配置文件。
// 可以在 vite.config.ts 中使用上述的 defineConfig 工具函数，或者 satisfies 运算符
import type { UserConfig } from 'vite'

export default {
  // ...
} satisfies UserConfig
```

:::

## 6. 🤔 情景配置是什么？

- 当你在阅读 vite 中文版的文档时，会看到这样的标题“情景配置”，在阅读内容之前，单是看标题好像不太好理解这个词。
- 这时候瞅一瞅情景配置的英文：`conditional-config` 会更加直观，顾名思义，情景配置就是条件配置。
  - **情景 = 条件 = 不同的运行环境**
  - “情景配置” 就是 **根据不同的场景来区分导出的配置内容**。
- 官方文档截图：
  - ![doc - 情景配置](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-10-04-23-20-21.png)

## 7. 🔗 引用

- [config][1]

[1]: https://cn.vite.dev/config/
