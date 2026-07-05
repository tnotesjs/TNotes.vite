# [0036. 解析配置](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0036.%20%E8%A7%A3%E6%9E%90%E9%85%8D%E7%BD%AE)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `resolve.alias`](#3-resolvealias)
- [4. `resolve.extensions`](#4-resolveextensions)
- [5. `resolve.dedupe`](#5-resolvededupe)
- [6. `resolve.conditions`](#6-resolveconditions)
- [7. 路径别名配置](#7-路径别名配置)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 的模块解析配置选项
- 掌握路径别名（`resolve.alias`）的配置方式
- 理解 `resolve.extensions`、`resolve.dedupe`、`resolve.conditions` 的作用

## 2. 评价

- `resolve.alias` 是最常用的解析配置，几乎所有项目都会配置路径别名
- 路径别名需要同时在 `vite.config.ts` 和 `tsconfig.json` 中配置，才能同时获得运行时和类型检查的支持

## 3. `resolve.alias`

- 配置模块路径的别名，类似 Webpack 的 `resolve.alias`
- 基本用法：

```ts
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },
})
```

- 也可以使用数组形式（支持查找顺序）：

```ts
resolve: {
  alias: [
    { find: '@', replacement: resolve(__dirname, 'src') },
    { find: /^~(.+)/, replacement: '$1' }, // 支持正则匹配
  ],
}
```

- 使用示例：`import Button from '@/components/Button.vue'`

## 4. `resolve.extensions`

- 配置导入时可以省略的文件扩展名，默认为 `['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']`
- 解析顺序：Vite 会按数组顺序依次尝试匹配

```ts
export default defineConfig({
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
  },
})
```

- 使用示例：`import { foo } from './utils'` 会自动匹配 `utils.ts` → `utils.js` 等
- 注意：不建议添加过多扩展名，可能影响解析性能

## 5. `resolve.dedupe`

- 指定需要去重的依赖包，确保项目中只使用一个版本
- 典型场景：
  - Monorepo 中多个子包依赖同一个库（如 Vue、React），需要确保只加载一份
  - 避免因为多个版本导致的运行时错误（如 Vue 的"多个实例"警告）

```ts
export default defineConfig({
  resolve: {
    dedupe: ['vue', 'vue-router'],
  },
})
```

## 6. `resolve.conditions`

- 配置 `package.json` 的 `exports` 字段解析时使用的条件
- 默认条件包括：`import`、`module`、`browser`、`default` 等
- 通常不需要修改，除非某个包需要特殊的解析条件

## 7. 路径别名配置

- 完整配置路径别名需要同时修改 `vite.config.ts` 和 `tsconfig.json`：
- `vite.config.ts`：配置运行时的路径解析

```ts
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
```

- `tsconfig.json`：配置 TypeScript 的类型解析

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

- 两个配置缺一不可：
  - 只配 `vite.config.ts`：运行正常但 IDE 会报红（类型检查找不到模块）
  - 只配 `tsconfig.json`：IDE 不报红但运行时路径解析失败
- 常见的别名风格：
  - `@/` → `src/`：最常用
  - `#/` → `types/`
  - `~` → 项目根目录
