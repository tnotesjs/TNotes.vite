# [0179. Vite 在 Monorepo 中的配置](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0179.%20Vite%20%E5%9C%A8%20Monorepo%20%E4%B8%AD%E7%9A%84%E9%85%8D%E7%BD%AE)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 多应用配置](#3-多应用配置)
- [4. 多包共享配置](#4-多包共享配置)
- [5. 路径别名](#5-路径别名)
- [6. 依赖去重](#6-依赖去重)
- [7. 本地包调试](#7-本地包调试)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 在 Monorepo 中的配置方式
- 掌握多应用配置、共享配置、路径别名和依赖去重

## 2. 评价

- Vite 在 Monorepo 中的配置需要注意路径解析和依赖去重
- `resolve.dedupe` 是解决多版本依赖问题的关键配置

## 3. 多应用配置

- 每个应用有独立的 `vite.config.ts`：

```
apps/
├── web/
│   ├── vite.config.ts
│   └── src/
└── admin/
    ├── vite.config.ts
    └── src/
```

- 可以创建共享的 Vite 配置包：

```ts
// packages/vite-config/src/base.ts
import { defineConfig } from 'vite'

export const baseConfig = defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
})
```

## 4. 多包共享配置

- 创建共享配置包减少重复配置：

```ts
// apps/web/vite.config.ts
import { baseConfig } from '@my/vite-config'

export default defineConfig({
  ...baseConfig,
  server: { port: 3000 },
})
```

## 5. 路径别名

- Monorepo 中的路径别名配置：

```ts
// apps/web/vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@my/shared': resolve(__dirname, '../../packages/shared/src'),
    },
  },
})
```

- 也可以使用 `vite-tsconfig-paths` 自动读取 `tsconfig.json` 的 paths

## 6. 依赖去重

- 多个包可能依赖同一个库的不同版本，导致运行时错误
- 使用 `resolve.dedupe` 确保只加载一个版本：

```ts
export default defineConfig({
  resolve: {
    dedupe: ['vue', 'vue-router', 'pinia'],
  },
})
```

## 7. 本地包调试

- 在 Monorepo 中调试本地包：
  - 使用 `pnpm link` 将本地包链接到应用
  - 或直接通过路径引用：`"@my/shared": "workspace:*"`
  - Vite 的 HMR 支持跨包的热更新
