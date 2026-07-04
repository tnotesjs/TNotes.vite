# [0191. 开发服务器 API](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0191.%20%E5%BC%80%E5%8F%91%E6%9C%8D%E5%8A%A1%E5%99%A8%20API)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 创建 Dev Server](#3-创建-dev-server)
- [4. 中间件模式](#4-中间件模式)
- [5. 自定义服务器](#5-自定义服务器)
- [6. SSR 中使用](#6-ssr-中使用)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 开发服务器的 Node API
- 掌握创建 Dev Server、中间件模式、自定义服务器的方式

## 2. 评价

- 中间件模式是将 Vite 集成到已有后端框架的关键能力
- SSR 场景下必须使用 Node API 创建 Dev Server

## 3. 创建 Dev Server

```ts
import { createServer } from 'vite'

const server = await createServer({
  configFile: 'vite.config.ts',
  server: {
    port: 3000,
    host: true,
  },
})

await server.listen()
server.printUrls()
```

## 4. 中间件模式

- 将 Vite Dev Server 作为中间件嵌入 Express/Koa：

```ts
const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'spa', // 或 'custom' 用于 SSR
})

// Express
app.use(vite.middlewares)
```

- `middlewareMode` 不创建独立的 HTTP 服务器
- `appType: 'spa'` 自动处理 SPA fallback
- `appType: 'custom'` 不处理 HTML（由开发者自行处理）

## 5. 自定义服务器

- 使用 Vite 的 Node API 完全自定义服务器逻辑：

```ts
const vite = await createServer({ server: { middlewareMode: true } })

const app = express()

// 自定义 API 路由
app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

// Vite 中间件（处理前端资源）
app.use(vite.middlewares)

app.listen(3000)
```

## 6. SSR 中使用

- SSR 开发模式下使用 Dev Server 的 `ssrLoadModule`：

```ts
const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
})

app.use('*', async (req, res) => {
  const { render } = await vite.ssrLoadModule('/src/entry-server.ts')
  const html = await render(req.originalUrl)
  const template = await vite.transformIndexHtml(req.originalUrl, indexHtml)
  res.end(template.replace('<!--ssr-outlet-->', html))
})
```
