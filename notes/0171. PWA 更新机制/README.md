# [0171. PWA 更新机制](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0171.%20PWA%20%E6%9B%B4%E6%96%B0%E6%9C%BA%E5%88%B6)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 自动更新](#3-自动更新)
- [4. 手动提示更新](#4-手动提示更新)
- [5. 版本控制](#5-版本控制)
- [6. 缓存清理](#6-缓存清理)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 PWA 的更新机制
- 掌握自动更新和手动提示更新的配置方式

## 2. 评价

- PWA 更新机制是用户体验的关键，过时的缓存可能导致用户看到旧版本

## 3. 自动更新

- `registerType: 'autoUpdate'`：Service Worker 检测到新版本后自动更新

```ts
VitePWA({
  registerType: 'autoUpdate',
})
```

- 更新流程：
  1. 浏览器检测到 Service Worker 文件变化
  2. 新的 Service Worker 在后台安装
  3. 安装完成后自动激活
  4. 用户下次访问时使用新版本

## 4. 手动提示更新

- `registerType: 'prompt'`：检测到新版本后提示用户

```ts
VitePWA({
  registerType: 'prompt',
})
```

- 在组件中监听更新事件：

```ts
const { needRefresh, updateServiceWorker } = useRegisterSW()

// 显示更新提示
if (needRefresh) {
  showUpdateDialog(() => updateServiceWorker(true))
}
```

- 用户确认后调用 `updateServiceWorker()` 激活新版本

## 5. 版本控制

- 通过版本号控制缓存更新：

```ts
VitePWA({
  workbox: {
    cacheId: 'my-app-v1',
    // 版本变化时旧缓存自动清理
  },
})
```

## 6. 缓存清理

- 新版本激活时清理旧缓存：

```ts
VitePWA({
  workbox: {
    cleanupOutdatedCaches: true,
    // 删除不再需要的缓存
    runtimeCaching: [
      {
        handler: 'CacheFirst',
        options: {
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 天
          },
        },
      },
    ],
  },
})
```
