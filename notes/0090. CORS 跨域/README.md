# [0090. CORS 跨域](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0090.%20CORS%20%E8%B7%A8%E5%9F%9F)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 开发环境跨域问题](#3-开发环境跨域问题)
- [4. 代理解决方案](#4-代理解决方案)
- [5. CORS 配置](#5-cors-配置)
- [6. 生产环境跨域](#6-生产环境跨域)

<!-- endregion:toc -->

## 1. 本节内容

- 了解开发环境中的跨域问题及其原因
- 掌握通过代理和 CORS 配置解决跨域的方式
- 理解生产环境跨域的处理方式

## 2. 评价

- 跨域是前端开发中最常见的问题之一，理解其原理很重要
- 开发环境推荐使用代理解决跨域，生产环境由后端或 Nginx 配置 CORS

## 3. 开发环境跨域问题

- 跨域的原因：浏览器的同源策略限制了不同源（协议、域名、端口）之间的请求
- 开发环境的典型场景：
  - 前端：`http://localhost:5173`
  - 后端：`http://localhost:8080`
  - 端口不同 → 跨域
- 跨域的表现：
  - 浏览器控制台报错：`Access to XMLHttpRequest at 'http://localhost:8080/api' from origin 'http://localhost:5173' has been blocked by CORS policy`
  - 请求被浏览器拦截，后端可能已经正常响应

## 4. 代理解决方案

- 通过 Vite 的 `server.proxy` 将 API 请求代理到后端，避免浏览器直接跨域：

```ts
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
```

- 原理：
  1. 浏览器请求 `http://localhost:5173/api/users`（同源，不跨域）
  2. Vite Dev Server 代理到 `http://localhost:8080/api/users`（服务器间请求不受同源策略限制）
  3. 返回响应给浏览器
- 这是开发环境解决跨域的推荐方式

## 5. CORS 配置

- Vite Dev Server 默认仅允许 localhost、`127.0.0.1` 和 `::1` 的跨域请求，设为 `true` 可允许所有来源（有安全风险）
- 可以通过配置细粒度控制 CORS 策略：

```ts
export default defineConfig({
  server: {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  },
})
```

- 通常不需要修改默认的 CORS 配置，使用代理即可

## 6. 生产环境跨域

- 生产环境的跨域由后端服务器或 Nginx 配置 CORS 响应头：
- Nginx 配置：

```nginx
location /api/ {
  add_header Access-Control-Allow-Origin *;
  add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, OPTIONS';
  add_header Access-Control-Allow-Headers 'Content-Type, Authorization';

  if ($request_method = 'OPTIONS') {
    return 204;
  }

  proxy_pass http://backend;
}
```

- 后端直接配置 CORS（以 Express 为例）：

```ts
app.use(
  cors({
    origin: 'https://my-app.com',
    credentials: true,
  }),
)
```

- 注意：生产环境通常不使用 `Access-Control-Allow-Origin: *`，应指定具体的域名
