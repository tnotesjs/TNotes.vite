# [0031. 配置文件基础](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0031.%20%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E5%9F%BA%E7%A1%80)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `vite.config.js`](#3-viteconfigjs)
- [4. `vite.config.ts`](#4-viteconfigts)
- [5. `defineConfig`](#5-defineconfig)
- [6. 配置智能提示](#6-配置智能提示)
- [7. 配置函数形式](#7-配置函数形式)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 配置文件的格式和命名规则
- 理解 `defineConfig` 的作用和使用方式
- 掌握配置文件的两种形式：对象形式和函数形式

## 2. 评价

- 配置文件是 Vite 项目的核心入口之一，理解其基础有助于后续深入各项配置
- 推荐始终使用 `defineConfig` 包裹配置，可以获得完整的类型提示

## 3. `vite.config.js`

- 最基础的配置文件格式，使用纯 JavaScript 编写
- Vite 支持的配置文件名（按优先级从高到低）：
  - `vite.config.ts`（TypeScript，推荐）
  - `vite.config.mts`（ESM TypeScript）
  - `vite.config.cts`（CJS TypeScript）
  - `vite.config.js`（ESM JavaScript）
  - `vite.config.mjs`（显式 ESM JavaScript）
  - `vite.config.cjs`（CommonJS JavaScript）
- 如果项目 `package.json` 中没有 `"type": "module"`，`.js` 文件会被当作 CommonJS
- 配置文件位于项目根目录，与 `package.json` 同级

## 4. `vite.config.ts`

- 推荐的配置文件格式，使用 TypeScript 编写
- 优势：
  - 完整的类型检查，配置项写错时 IDE 会立即提示
  - 可以利用 TypeScript 的类型推导获得配置值的自动补全
  - 支持 `import type` 语法，保持类型导入的规范性
- 基本示例：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
  },
})
```

- Vite 使用 Esbuild 来加载 `.ts` 配置文件，因此不会执行完整的类型检查

## 5. `defineConfig`

- `defineConfig` 是 Vite 提供的辅助函数，用于为配置对象提供完整的 TypeScript 类型提示
- 导入方式：`import { defineConfig } from 'vite'`
- 作用：
  - 接收一个配置对象，原样返回（运行时无任何额外逻辑）
  - 在 TypeScript 环境下提供 `UserConfig` 类型约束
  - 支持传入函数形式的配置（见第 7 节）
- 不使用 `defineConfig` 也可以直接导出配置对象，但会失去类型提示：

```ts
// 不推荐：没有类型提示
export default {
  plugins: [],
  server: { port: 3000 },
}

// 推荐：完整的类型提示
export default defineConfig({
  plugins: [],
  server: { port: 3000 },
})
```

## 6. 配置智能提示

- 使用 `defineConfig` 后，IDE 会为配置项提供以下智能提示：
  - 属性名自动补全（如输入 `ser` 会提示 `server`）
  - 属性值类型提示（如 `port` 提示为 `number` 类型）
  - 嵌套配置的逐层提示（如 `server.proxy` 的完整结构）
  - 配置项的 JSDoc 说明（来自 Vite 的类型声明文件）
- 如果某个配置项需要引用外部变量，可以使用 `as const` 断言保持类型精确
- 对于插件配置，Vite 插件的类型声明会自动合并到配置类型中

## 7. 配置函数形式

- `defineConfig` 支持传入一个函数，函数接收 `ConfigEnv` 参数：

```ts
import { defineConfig } from 'vite'

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  // command: 'serve'（开发）或 'build'（构建）
  // mode: 'development'、'production'、'staging' 等
  // isSsrBuild: 是否是 SSR 构建
  // isPreview: 是否是预览模式

  return {
    // 根据不同条件返回不同配置
    plugins: [],
    base: command === 'serve' ? '/' : '/my-app/',
  }
})
```

- 函数形式的典型场景：
  - 根据 `command` 区分开发和构建的配置（如 `base` 路径不同）
  - 根据 `mode` 加载不同的环境变量
  - 条件性地启用某些插件（如开发环境启用 mock 插件）
  - 动态计算配置值（如根据环境变量决定输出目录）
