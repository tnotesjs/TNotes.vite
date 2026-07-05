# [0074. React SSR](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0074.%20React%20SSR)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 服务端渲染](#3-服务端渲染)
- [4. Streaming SSR](#4-streaming-ssr)
- [5. Hydration](#5-hydration)
- [6. 框架选择](#6-框架选择)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 React SSR 在 Vite 中的基本概念
- 理解 Streaming SSR 和 Hydration 的工作原理
- 掌握 React SSR 框架的选择建议

## 2. 评价

- React SSR 是进阶主题，大部分项目应优先考虑 Next.js 等框架
- 手动搭建 SSR 非常复杂，不推荐

## 3. 服务端渲染

- React SSR 的核心：在服务端将 React 组件渲染为 HTML 字符串
- 使用 `react-dom/server` 的 `renderToString` 或 `renderToPipeableStream` API
- Vite 内置 SSR 支持，通过 `vite build --ssr` 构建服务端产物

```ts
// 服务端渲染
import { renderToString } from 'react-dom/server'
import App from './App'

const html = renderToString(<App />)
```

- 优势：
  - 更快的首屏加载
  - 更好的 SEO
  - 社交媒体分享时可以显示预览内容

## 4. Streaming SSR

- React 18 引入的流式 SSR，比传统的 `renderToString` 更高效
- 使用 `renderToPipeableStream` API：

```ts
import { renderToPipeableStream } from 'react-dom/server'

const { pipe } = renderToPipeableStream(<App />, {
  bootstrapScripts: ['/client.js'],
  onShellReady() {
    // Shell 准备好后开始流式传输
    res.statusCode = 200
    res.setHeader('content-type', 'text/html')
    pipe(res)
  },
})
```

- 优势：
  - 更快的 TTFB（Time to First Byte）：Shell HTML 立即开始传输
  - 渐进式 Hydration：先渲染可见部分，其余部分延迟加载
  - 支持 Suspense：异步组件可以在数据准备好后再渲染

## 5. Hydration

- React 的 Hydration 过程：将服务端渲染的静态 HTML 变为可交互的 React 应用
- 使用 `hydrateRoot` API：

```tsx
import { hydrateRoot } from 'react-dom/client'
import App from './App'

hydrateRoot(document.getElementById('root'), <App />)
```

- React 18 的选择性 Hydration：
  - 配合 `<Suspense>` 实现渐进式激活
  - 优先激活用户可见和交互的部分
  - 不影响其他部分的加载

## 6. 框架选择

- 手动搭建 React SSR 非常复杂，强烈建议使用框架：
- Next.js（推荐）：React 生态最成熟的 SSR/SSG 框架，App Router（基于 React Server Components），内置路由、图片优化、字体优化等，Vercel 维护，社区活跃
- Remix：全栈 React 框架，专注于 Web 标准，基于嵌套路由的数据加载，与 React Router 深度集成
- Vite SSR（手动搭建）：适合需要精细控制的场景，复杂度高，维护成本大，推荐在理解 SSR 原理后仍优先选择 Next.js
