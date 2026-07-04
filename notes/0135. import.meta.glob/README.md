# [0135. import.meta.glob](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0135.%20import.meta.glob)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 基础用法](#3-基础用法)
- [4. 懒加载导入](#4-懒加载导入)
- [5. eager 导入](#5-eager-导入)
- [6. 匹配多个文件](#6-匹配多个文件)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 `import.meta.glob` 的基本用法
- 掌握懒加载导入和 eager 导入的区别
- 理解 glob 模式匹配的规则

## 2. 评价

- `import.meta.glob` 是 Vite 独有的特性，非常实用
- 适合批量导入模块、自动注册路由、动态加载组件等场景

## 3. 基础用法

- `import.meta.glob` 用于批量导入匹配的模块：

```ts
const modules = import.meta.glob('./modules/*.ts')
// 返回：
// {
//   './modules/foo.ts': () => import('./modules/foo.ts'),
//   './modules/bar.ts': () => import('./modules/bar.ts'),
// }
```

- 默认返回懒加载函数（动态导入），调用时才会加载模块

## 4. 懒加载导入

- 默认模式是懒加载（返回 `() => import(...)` 函数）：

```ts
const modules = import.meta.glob('./pages/*.vue')

// 遍历并加载
for (const path in modules) {
  modules[path]().then((mod) => {
    console.log(path, mod.default)
  })
}
```

## 5. eager 导入

- 使用 `{ eager: true }` 直接导入模块内容（不懒加载）：

```ts
const modules = import.meta.glob('./modules/*.ts', { eager: true })
// 返回：
// {
//   './modules/foo.ts': { default: ..., namedExport: ... },
//   './modules/bar.ts': { default: ..., namedExport: ... },
}
```

- eager 模式在构建时会将所有匹配的模块打包到同一个 chunk 中

## 6. 匹配多个文件

- 支持 glob 模式匹配：

```ts
// 匹配多个目录
import.meta.glob(['./dir1/**/*.ts', './dir2/**/*.ts'])

// 排除某些文件
import.meta.glob('./modules/*.ts', { ignore: ['./modules/ignore.ts'] })

// 匹配所有 .vue 和 .ts 文件
import.meta.glob('./src/**/*.{vue,ts}')
```
