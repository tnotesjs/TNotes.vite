# [0169. Vite 集成 PWA](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0169.%20Vite%20%E9%9B%86%E6%88%90%20PWA)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `vite-plugin-pwa`](#3-vite-plugin-pwa)
- [4. 自动生成 Service Worker](#4-自动生成-service-worker)
- [5. 手写 Service Worker](#5-手写-service-worker)
- [6. 资源缓存策略](#6-资源缓存策略)

<!-- endregion:toc -->

## 1. 本节内容

- 掌握在 Vite 项目中集成 PWA 的方式
- 了解 `vite-plugin-pwa` 的配置和使用

## 2. 评价

- `vite-plugin-pwa` 是 Vite 生态中最成熟的 PWA 插件
- 自动生成 Service Worker，零配置即可使用

## 3. `vite-plugin-pwa`

- 安装和配置：

```bash
npm install -D vite-plugin-pwa
```

```ts
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My App',
        short_name: 'App',
        theme_color: '#1890ff',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
})
```

## 4. 自动生成 Service Worker

- `vite-plugin-pwa` 使用 Workbox 自动生成 Service Worker
- 自动预缓存构建产物（JS、CSS、HTML）
- 配置 `workbox` 选项控制缓存策略：

```ts
VitePWA({
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/api\.example\.com\/.*/i,
        handler: 'NetworkFirst',
        options: { cacheName: 'api-cache' },
      },
    ],
  },
})
```

## 5. 手写 Service Worker

- 也可以手写 Service Worker：

```ts
VitePWA({
  srcDir: 'src',
  filename: 'sw.ts',
  strategies: 'injectManifest',
})
```

- 适用于需要完全控制缓存逻辑的场景

## 6. 资源缓存策略

- 配置不同资源的缓存策略：
  - 静态资源（JS/CSS/图片）：预缓存
  - API 请求：Network First 或 Stale While Revalidate
  - 字体文件：Cache First
  - HTML：Network First（确保获取最新版本）
