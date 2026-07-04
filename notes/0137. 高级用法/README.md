# [0137. 高级用法](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0137.%20%E9%AB%98%E7%BA%A7%E7%94%A8%E6%B3%95)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 命名导入](#3-命名导入)
- [4. 查询参数](#4-查询参数)
- [5. 排除匹配](#5-排除匹配)
- [6. 自定义文件处理](#6-自定义文件处理)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 `import.meta.glob` 的高级用法
- 掌握命名导入、查询参数、排除匹配等技巧

## 2. 评价

- 高级用法可以满足更复杂的批量导入需求

## 3. 命名导入

- 使用 `{ import: 'named' }` 只导入指定的具名导出：

```ts
const hooks = import.meta.glob('./hooks/*.ts', {
  import: 'useCounter',
  eager: true,
})
```

- 也可以导入多个具名导出：

```ts
const utils = import.meta.glob('./utils/*.ts', {
  import: ['formatDate', 'debounce'],
  eager: true,
})
```

## 4. 查询参数

- 使用查询参数控制导入行为：

```ts
// 作为原始字符串导入
const rawFiles = import.meta.glob('./data/*.txt', { query: '?raw' })

// 作为 URL 导入
const urls = import.meta.glob('./assets/*', { query: '?url' })
```

## 5. 排除匹配

- 使用 `ignore` 排除特定文件：

```ts
const modules = import.meta.glob('./modules/*.ts', {
  ignore: ['./modules/internal.ts', './modules/test.ts'],
})
```

- 支持 glob 模式：`ignore: ['./modules/**/*.test.ts']`

## 6. 自定义文件处理

- 对导入的模块进行自定义处理：

```ts
const modules = import.meta.glob('./modules/*.ts', {
  eager: true,
  import: 'default',
})

// 转换为 Map
const moduleMap = new Map(
  Object.entries(modules).map(([path, mod]) => [
    path.replace('./modules/', '').replace('.ts', ''),
    mod,
  ]),
)
```
