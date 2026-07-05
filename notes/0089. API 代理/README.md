# [0089. API 代理](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0089.%20API%20%E4%BB%A3%E7%90%86)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `server.proxy`](#3-serverproxy)
- [4. 代理到后端服务](#4-代理到后端服务)
- [5. 路径重写](#5-路径重写)
- [6. Cookie 处理](#6-cookie-处理)
- [7. WebSocket 代理](#7-websocket-代理)
- [8. 多后端代理](#8-多后端代理)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 开发服务器的 API 代理功能
- 掌握基本代理、路径重写、Cookie 处理、WebSocket 代理的配置
- 理解多后端代理的配置方式

## 2. 评价

- `server.proxy` 是前后端分离项目中最重要的配置，几乎每个项目都会用到
- 代理解决了开发环境中的跨域问题，无需后端额外配置 CORS

## 3. `server.proxy`

- 在 `vite.config.ts` 中配置：

```ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
```

- 底层使用 `http-proxy-3`（一个 fork），支持其所有配置选项

## 4. 代理到后端服务

- 最常见的场景：将 `/api` 请求代理到本地后端服务

```ts
server: {
  proxy: {
    '/api': 'http://localhost:8080', // 简写形式
  },
}
```

- 前端请求 `http://localhost:5173/api/users` 会被代理到 `http://localhost:8080/api/users`
- `changeOrigin: true`：修改请求头中的 `Host` 为目标地址，解决后端的虚拟主机校验

## 5. 路径重写

- 使用 `rewrite` 函数修改请求路径：

```ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}
```

- 效果：`/api/users` → `http://localhost:8080/users`
- 适用场景：后端 API 没有 `/api` 前缀

## 6. Cookie 处理

- 代理时默认会保留 Cookie，但可能需要调整 `secure` 和 `domain`：

```ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      cookieDomainRewrite: 'localhost', // 重写 Cookie 的 domain
      cookiePathRewrite: '/',           // 重写 Cookie 的 path
      secure: false,                    // 允许代理到 HTTP 后端
    },
  },
}
```

## 7. WebSocket 代理

- 配置 WebSocket 代理：

```ts
server: {
  proxy: {
    '/socket': {
      target: 'ws://localhost:8080',
      ws: true,
    },
  },
}
```

- 适用场景：WebSocket 连接需要代理到后端的 WebSocket 服务

## 8. 多后端代理

- 配置多个代理规则，将不同的路径代理到不同的后端：

```ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
    '/auth': {
      target: 'http://localhost:8081',
      changeOrigin: true,
    },
    '/upload': {
      target: 'http://localhost:8082',
      changeOrigin: true,
    },
  },
}
```

- 代理规则按顺序匹配，第一个匹配的规则生效

- todo
