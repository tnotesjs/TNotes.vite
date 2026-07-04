# [0143. Vite 中集成 Mock](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0143.%20Vite%20%E4%B8%AD%E9%9B%86%E6%88%90%20Mock)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `server.proxy`](#3-serverproxy)
- [4. `vite-plugin-mock`](#4-vite-plugin-mock)
- [5. Mock 文件组织](#5-mock-文件组织)
- [6. 根据环境启用 Mock](#6-根据环境启用-mock)

<!-- endregion:toc -->

## 1. 本节内容

- 掌握在 Vite 项目中集成 Mock 的具体方式
- 了解 Mock 文件的组织方式和环境控制

## 2. 评价

- `vite-plugin-mock` 是 Vite 生态中最常用的 Mock 插件
- Mock 只应在开发环境启用，生产构建时自动禁用

## 3. `server.proxy`

- 最简单的 Mock 方式：将 API 请求代理到本地 Mock 服务器

```ts
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:8080', // Mock 服务器
    },
  },
})
```

- 需要单独启动 Mock 服务器

## 4. `vite-plugin-mock`

- 安装和配置：

```bash
npm install -D vite-plugin-mock
```

```ts
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig({
  plugins: [
    viteMockServe({
      mockPath: 'mock',
      enable: true,
    }),
  ],
})
```

- Mock 文件示例：

```ts
// mock/user.ts
import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api/users',
    method: 'get',
    response: () => ({
      code: 200,
      data: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ],
    }),
  },
] as MockMethod[]
```

## 5. Mock 文件组织

- 推荐的目录结构：

```
mock/
├── user.ts        # 用户相关 Mock
├── product.ts     # 商品相关 Mock
└── index.ts       # 统一导出（可选）
```

- Mock 文件按模块组织，与 API 模块对应

## 6. 根据环境启用 Mock

- 只在开发环境启用 Mock：

```ts
viteMockServe({
  mockPath: 'mock',
  enable: command === 'serve', // 只在开发时启用
})
```

- 也可以通过环境变量控制：

```ts
viteMockServe({
  mockPath: 'mock',
  enable: process.env.VITE_MOCK === 'true',
})
```
