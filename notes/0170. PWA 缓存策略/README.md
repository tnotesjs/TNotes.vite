# [0170. PWA 缓存策略](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0170.%20PWA%20%E7%BC%93%E5%AD%98%E7%AD%96%E7%95%A5)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Cache First](#3-cache-first)
- [4. Network First](#4-network-first)
- [5. Stale While Revalidate](#5-stale-while-revalidate)
- [6. Runtime Caching](#6-runtime-caching)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 PWA 的常用缓存策略
- 掌握 Cache First、Network First、Stale While Revalidate 的区别

## 2. 评价

- 不同资源应使用不同的缓存策略
- 选择合适的缓存策略可以平衡离线可用性和数据新鲜度

## 3. Cache First

- 优先从缓存读取，缓存未命中时再请求网络
- 适用场景：静态资源（JS、CSS、图片、字体）
- 特点：速度最快，但可能返回过期内容

## 4. Network First

- 优先从网络获取，网络失败时回退到缓存
- 适用场景：HTML 页面、API 请求
- 特点：保证数据新鲜度，离线时仍可访问

## 5. Stale While Revalidate

- 先返回缓存内容（快速响应），同时在后台更新缓存
- 适用场景：不经常变化的 API 数据、图片
- 特点：速度和新鲜度的平衡

## 6. Runtime Caching

- 运行时缓存：在用户访问时动态缓存资源
- 配置示例（Workbox）：

```ts
runtimeCaching: [
  {
    urlPattern: /^https:\/\/cdn\.example\.com\/.*/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'cdn-cache',
      expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
    },
  },
  {
    urlPattern: /\/api\/.*/i,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'api-cache',
      networkTimeoutSeconds: 3,
    },
  },
]
```
