# [0195. 类型安全配置](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0195.%20%E7%B1%BB%E5%9E%8B%E5%AE%89%E5%85%A8%E9%85%8D%E7%BD%AE)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 使用 TypeScript](#3-使用-typescript)
- [4. `defineConfig`](#4-defineconfig)
- [5. 环境变量类型声明](#5-环境变量类型声明)

<!-- endregion:toc -->

## 1. 本节内容

- 了解如何让 Vite 配置具有类型安全
- 掌握 TypeScript 配置文件、`defineConfig` 和环境变量类型声明

## 2. 评价

- 类型安全的配置可以在编写时发现错误，提升开发效率

## 3. 使用 TypeScript

- 使用 `vite.config.ts` 替代 `vite.config.js`：

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  // 完整的类型提示
  server: {
    port: 3000, // IDE 提示 port 为 number 类型
  },
})
```

## 4. `defineConfig`

- `defineConfig` 提供 `UserConfig` 类型约束
- 支持对象形式和函数形式：

```ts
// 对象形式
export default defineConfig({ plugins: [] })

// 函数形式（有 command、mode 参数的类型提示）
export default defineConfig(({ command, mode }) => ({
  plugins: [],
}))
```

## 5. 环境变量类型声明

- 在 `src/vite-env.d.ts` 中扩展 `ImportMetaEnv`：

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_TITLE: string
}
```

- 使用时有完整的类型提示和自动补全
