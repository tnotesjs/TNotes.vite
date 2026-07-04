# [0068. Vue SSR](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0068.%20Vue%20SSR)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. SSR 基础](#3-ssr-基础)
- [4. 客户端入口](#4-客户端入口)
- [5. 服务端入口](#5-服务端入口)
- [6. Hydration](#6-hydration)
- [7. 生产部署](#7-生产部署)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vue SSR 在 Vite 中的基本工作原理
- 掌握客户端入口和服务端入口的编写方式
- 理解 Hydration 的概念和生产部署方式

## 2. 评价

- Vue SSR 是进阶主题，初学者可以跳过
- 大部分项目应优先考虑 Nuxt 等 SSR 框架，而非手动搭建 SSR
- 手动 SSR 适合需要精细控制的场景

## 3. SSR 基础

- SSR（Server-Side Rendering）：在服务端将 Vue 组件渲染为 HTML 字符串，发送给浏览器
- 优势：
  - 更快的首屏加载（浏览器直接显示 HTML，无需等待 JS 下载执行）
  - 更好的 SEO（搜索引擎可以直接抓取 HTML 内容）
- Vite 内置 SSR 支持，通过 `createViteServer({ ssr: true })` 启用

```ts
// server.js
import { createServer } from 'vite'

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
})
```

## 4. 客户端入口

- 客户端入口负责在浏览器中"激活"（hydrate）服务端渲染的 HTML

```ts
// src/entry-client.ts
import { createApp } from './main'

const { app, router } = createApp()

// 等待路由准备就绪后激活
router.isReady().then(() => {
  app.mount('#app')
})
```

- Hydration 过程：Vue 会对比服务端渲染的 HTML 和客户端组件的虚拟 DOM，绑定事件监听器
- Hydration 完成前页面是静态的（不可交互）

## 5. 服务端入口

- 服务端入口负责在 Node.js 中渲染 Vue 组件为 HTML 字符串

```ts
// src/entry-server.ts
import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'

export async function render(url: string) {
  const { app, router } = createApp()

  // 设置服务端路由
  await router.push(url)
  await router.isReady()

  // 渲染为 HTML 字符串
  const html = await renderToString(app)
  return html
}
```

## 6. Hydration

- Hydration（水合/激活）是 SSR 的核心概念
- 流程：
  1. 服务端渲染 HTML → 发送到浏览器
  2. 浏览器下载并执行客户端 JS
  3. Vue 对比服务端 HTML 和客户端虚拟 DOM
  4. 绑定事件监听器，页面变为可交互
- 常见问题：
  - **Hydration Mismatch**：服务端和客户端渲染结果不一致，控制台会输出警告
  - 原因：使用了 `Date.now()`、`Math.random()`、`localStorage` 等客户端特有的 API
  - 解决：使用 `onMounted` 钩子或 `v-if` 延迟渲染客户端特有的内容

## 7. 生产部署

- 生产环境的 SSR 部署方式：
  1. 构建客户端产物（`vite build --outDir dist/client`）
  2. 构建服务端产物（`vite build --outDir dist/server --ssr src/entry-server.ts`）
  3. 在 Node.js 服务器中加载服务端产物，渲染 HTML 并注入客户端脚本

- 推荐的生产框架：
  - **Nuxt**：Vue 生态的全栈 SSR 框架，开箱即用
  - **Vite SSR**：手动搭建，适合需要精细控制的场景
- 对于大部分项目，**强烈推荐使用 Nuxt**，它处理了 SSR 的大量复杂性（路由、数据预取、部署等）
