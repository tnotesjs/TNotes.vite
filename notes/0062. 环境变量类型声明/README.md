# [0062. 环境变量类型声明](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0062.%20%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F%E7%B1%BB%E5%9E%8B%E5%A3%B0%E6%98%8E)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `vite-env.d.ts`](#3-vite-envdts)
- [4. `ImportMetaEnv`](#4-importmetaenv)
- [5. 自定义环境变量类型](#5-自定义环境变量类型)

<!-- endregion:toc -->

## 1. 本节内容

- 了解如何为 Vite 的环境变量添加 TypeScript 类型声明
- 掌握 `vite-env.d.ts` 和 `ImportMetaEnv` 的配置方式
- 理解自定义环境变量的类型扩展

## 2. 评价

- 环境变量类型声明是 TypeScript 项目中容易忽略但很重要的一步
- 没有类型声明时，`import.meta.env.VITE_XXX` 会被标记为 `any`，失去类型检查的保护

## 3. `vite-env.d.ts`

- Vite 模板项目会自动生成此文件，通常位于 `src/vite-env.d.ts` 或 `src/env.d.ts`
- 内容：

```ts
/// <reference types="vite/client" />
```

- 这行声明引入了 Vite 的客户端类型定义，提供了：
  - `import.meta.env` 的基础类型
  - 静态资源导入的类型声明（`.png`、`.svg`、`.css` 等）
  - HMR API 的类型
- 确保此文件在 `tsconfig.json` 的 `include` 范围内

## 4. `ImportMetaEnv`

- Vite 通过 `ImportMetaEnv` 接口定义环境变量的类型
- 内置的类型声明（来自 `vite/client`）：

```ts
interface ImportMetaEnv {
  readonly MODE: string
  readonly BASE_URL: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly SSR: boolean
}
```

- 自定义的 `VITE_` 变量需要手动扩展此接口

## 5. 自定义环境变量类型

- 在 `vite-env.d.ts` 中扩展 `ImportMetaEnv` 接口：

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
  readonly VITE_ENABLE_MOCK: string // 注意：环境变量都是字符串类型
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

- 使用时 IDE 会提供自动补全和类型检查：

```ts
const apiUrl = import.meta.env.VITE_API_BASE_URL // ✅ 有类型提示
const secret = import.meta.env.VITE_SECRET // ❌ 类型错误，未声明
```

- 注意事项：
  - 环境变量在运行时都是字符串类型（包括 `'true'`、`'1'`），需要手动转换
  - `declare module '*.vue'` 等声明也可以放在同一个文件中
  - 如果使用了 `?url`、`?raw` 等后缀导入，`vite/client` 已内置其类型声明
