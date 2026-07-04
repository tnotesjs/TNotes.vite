# [0190. Node API 基础](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0190.%20Node%20API%20%E5%9F%BA%E7%A1%80)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `createServer`](#3-createserver)
- [4. `build`](#4-build)
- [5. `preview`](#5-preview)
- [6. `resolveConfig`](#6-resolveconfig)
- [7. `loadEnv`](#7-loadenv)
- [8. `mergeConfig`](#8-mergeconfig)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 的 Node.js API
- 掌握 `createServer`、`build`、`preview`、`resolveConfig`、`loadEnv`、`mergeConfig` 等核心 API

## 2. 评价

- Node API 用于编程式使用 Vite，适合自定义构建脚本和工具开发
- 大部分项目使用 CLI 即可，Node API 是进阶用法

## 3. `createServer`

- 创建 Vite 开发服务器：

```ts
import { createServer } from 'vite'

const server = await createServer({
  server: { port: 3000 },
})
await server.listen()
console.log('Dev server running at http://localhost:3000')
```

## 4. `build`

- 编程式执行生产构建：

```ts
import { build } from 'vite'

await build({
  root: process.cwd(),
  build: { outDir: 'dist' },
})
```

## 5. `preview`

- 创建预览服务器：

```ts
import { preview } from 'vite'

const server = await preview({
  preview: { port: 4173 },
})
```

## 6. `resolveConfig`

- 解析 Vite 配置（不启动服务器）：

```ts
import { resolveConfig } from 'vite'

const config = await resolveConfig({}, 'build')
console.log(config.build.target)
```

## 7. `loadEnv`

- 加载环境变量文件：

```ts
import { loadEnv } from 'vite'

const env = loadEnv('production', process.cwd(), '')
console.log(env.VITE_API_BASE_URL)
```

## 8. `mergeConfig`

- 深度合并两个 Vite 配置：

```ts
import { mergeConfig } from 'vite'

const base = { server: { port: 3000 } }
const override = { server: { host: true } }
const merged = mergeConfig(base, override)
// { server: { port: 3000, host: true } }
```
