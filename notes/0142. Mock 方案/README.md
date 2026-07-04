# [0142. Mock 方案](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0142.%20Mock%20%E6%96%B9%E6%A1%88)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 本地 Mock](#3-本地-mock)
- [4. 插件 Mock](#4-插件-mock)
- [5. MSW](#5-msw)
- [6. 后端代理](#6-后端代理)
- [7. Mock Server](#7-mock-server)

<!-- endregion:toc -->

## 1. 本节内容

- 了解前端开发中常用的 Mock 方案
- 掌握本地 Mock、插件 Mock、MSW 等方案的特点和适用场景

## 2. 评价

- Mock 是前后端并行开发的必备工具
- 推荐使用 MSW（Mock Service Worker）作为标准方案

## 3. 本地 Mock

- 最简单的方式：在代码中直接返回模拟数据

```ts
// src/mock/user.ts
export const mockUsers = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]

// 在 API 函数中使用
export async function getUsers() {
  if (import.meta.env.DEV) {
    return mockUsers
  }
  return fetch('/api/users').then((r) => r.json())
}
```

- 优点：简单直接，无依赖
- 缺点：侵入业务代码，维护成本高

## 4. 插件 Mock

- 使用 `vite-plugin-mock` 等插件拦截请求：

```ts
// mock/user.ts
export default [
  {
    url: '/api/users',
    method: 'get',
    response: () => [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ],
  },
]
```

- 优点：与业务代码分离，配置简单
- 缺点：只在 Vite 开发环境生效

## 5. MSW

- Mock Service Worker：通过 Service Worker 拦截网络请求

```bash
npm install msw --save-dev
npx msw init public/ --save
```

```ts
// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ])
  }),
]
```

- 优点：
  - 在浏览器和 Node.js 中都能使用
  - 不侵入业务代码
  - 可以用于测试
- 缺点：初始配置稍复杂

## 6. 后端代理

- 使用 Vite 的 `server.proxy` 将请求代理到 Mock 服务器：

```ts
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:8080', // Mock 服务器
    },
  },
})
```

## 7. Mock Server

- 使用独立的 Mock 服务器（如 JSON Server、WireMock）
- 适合团队协作，统一管理 Mock 数据
- JSON Server 示例：

```bash
npm install -g json-server
json-server --watch db.json --port 8080
```
