# [0138. 动态导入基础](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0138.%20%E5%8A%A8%E6%80%81%E5%AF%BC%E5%85%A5%E5%9F%BA%E7%A1%80)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `import()`](#3-import)
- [4. Promise 返回值](#4-promise-返回值)
- [5. 代码分割](#5-代码分割)
- [6. 异步 Chunk](#6-异步-chunk)

<!-- endregion:toc -->

## 1. 本节内容

- 了解动态导入（Dynamic Import）的基本概念
- 掌握 `import()` 语法的用法
- 理解代码分割和异步 Chunk 的工作原理

## 2. 评价

- 动态导入是实现代码分割的基础，也是路由懒加载和组件懒加载的前提
- Vite 原生支持 `import()` 语法，无需额外配置

## 3. `import()`

- `import()` 是 ES Modules 的动态导入语法：

```ts
// 静态导入（打包到主 chunk）
import { foo } from './utils'

// 动态导入（独立 chunk，按需加载）
const { foo } = await import('./utils')
```

- `import()` 返回一个 Promise，resolve 值为模块对象

## 4. Promise 返回值

- `import()` 返回的 Promise resolve 为模块命名空间对象：

```ts
const mod = await import('./utils')
console.log(mod.default) // 默认导出
console.log(mod.foo) // 具名导出
console.log(mod.bar) // 具名导出
```

- 也可以使用解构：

```ts
const { foo, bar } = await import('./utils')
```

## 5. 代码分割

- 使用 `import()` 会自动触发代码分割：
  - 动态导入的模块会被打包为独立的 chunk
  - 首屏只加载主 chunk，动态 chunk 在需要时才加载
  - 减少初始加载体积，提升首屏速度

## 6. 异步 Chunk

- 动态导入生成的 chunk 称为异步 chunk
- 文件名通常为 `assets/js/[name]-[hash].js`
- 可以通过注释指定 chunk 名称：

```ts
const mod = await import(/* webpackChunkName: "utils" */ './utils')
```

- Vite 使用 Rollup 的 `output.chunkFileNames` 控制命名
