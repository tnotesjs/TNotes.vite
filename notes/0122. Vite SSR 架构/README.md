# [0122. Vite SSR 架构](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0122.%20Vite%20SSR%20%E6%9E%B6%E6%9E%84)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 服务端入口](#3-服务端入口)
- [4. 客户端入口](#4-客户端入口)
- [5. SSR Manifest](#5-ssr-manifest)
- [6. 开发模式 SSR](#6-开发模式-ssr)
- [7. 生产模式 SSR](#7-生产模式-ssr)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite SSR 的整体架构
- 掌握服务端入口、客户端入口和 SSR Manifest 的概念
- 理解开发模式和生产模式下 SSR 的差异

## 2. 评价

- Vite SSR 架构设计清晰，但手动搭建仍然复杂
- 理解架构有助于使用 Nuxt/Next.js 等框架时排查问题

## 3. 服务端入口

- 服务端入口负责在 Node.js 中渲染组件为 HTML：

```ts
// src/entry-server.ts
import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'

export async function render(url: string) {
  const { app, router } = createApp()
  await router.push(url)
  await router.isReady()
  const html = await renderToString(app)
  return html
}
```

## 4. 客户端入口

- 客户端入口负责在浏览器中 Hydrate 服务端渲染的 HTML：

```ts
// src/entry-client.ts
import { createApp } from './main'

const { app, router } = createApp()
router.isReady().then(() => {
  app.mount('#app')
})
```

## 5. SSR Manifest

- SSR Manifest 记录了模块与构建产物的映射关系
- 用于在服务端渲染时正确注入客户端资源的 `<link>` 和 `<script>` 标签
- 通过 `build.ssrManifest: true` 生成

## 6. 开发模式 SSR

- 开发模式下 Vite 提供完整的 HMR 支持
- 服务端通过 `ssrLoadModule()` 直接加载源码模块
- 文件变化时自动重新加载，无需重启服务器

## 7. 生产模式 SSR

- 生产模式需要分别构建客户端和服务端产物：

```bash
# 客户端构建
vite build --outDir dist/client

# 服务端构建
vite build --outDir dist/server --ssr src/entry-server.ts
```

- 服务端产物是 Node.js 可直接加载的模块
- 需要在 Node.js 服务器中加载服务端产物并渲染 HTML
