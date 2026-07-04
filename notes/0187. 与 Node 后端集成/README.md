# [0187. 与 Node 后端集成](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0187.%20%E4%B8%8E%20Node%20%E5%90%8E%E7%AB%AF%E9%9B%86%E6%88%90)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Express](#3-express)
- [4. Koa](#4-koa)
- [5. Fastify](#5-fastify)
- [6. NestJS](#6-nestjs)
- [7. SSR 集成](#7-ssr-集成)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 与 Node.js 后端框架的集成方式
- 掌握 Express、Koa、Fastify、NestJS 的集成配置

## 2. 评价

- Vite Dev Server 可以作为中间件嵌入到 Node.js 后端框架中
- 适合全栈项目和 SSR 场景

## 3. Express

- 将 Vite Dev Server 作为 Express 中间件：

```ts
import express from 'express'
import { createServer } from 'vite'

const app = express()
const vite = await createServer({ server: { middlewareMode: true } })
app.use(vite.middlewares)

app.listen(3000)
```

## 4. Koa

- 使用 `koa-connect` 适配 Vite 中间件：

```ts
import Koa from 'koa'
import connect from 'koa-connect'
import { createServer } from 'vite'

const app = new Koa()
const vite = await createServer({ server: { middlewareMode: true } })
app.use(connect(vite.middlewares))

app.listen(3000)
```

## 5. Fastify

- 使用 `@fastify/middie` 适配 Vite 中间件

## 6. NestJS

- NestJS 可以集成 Vite 作为前端的开发服务器
- 通常前后端独立部署，开发时通过代理通信

## 7. SSR 集成

- Node.js 后端可以直接加载 Vite 构建的 SSR 产物
- 使用 `vite.ssrLoadModule()` 在开发时加载源码
- 生产环境直接 `import` 构建后的服务端产物
