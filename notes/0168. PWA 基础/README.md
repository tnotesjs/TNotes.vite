# [0168. PWA 基础](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0168.%20PWA%20%E5%9F%BA%E7%A1%80)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Service Worker](#3-service-worker)
- [4. Manifest](#4-manifest)
- [5. 离线缓存](#5-离线缓存)
- [6. 安装到桌面](#6-安装到桌面)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 PWA（Progressive Web App）的基本概念
- 掌握 Service Worker、Manifest、离线缓存的工作原理
- 了解"安装到桌面"功能

## 2. 评价

- PWA 让 Web 应用拥有接近原生应用的体验
- 适合需要离线访问、推送通知、安装到桌面的场景

## 3. Service Worker

- Service Worker 是运行在浏览器后台的脚本，独立于页面
- 核心能力：
  - 拦截网络请求
  - 缓存资源
  - 离线可用
  - 后台同步
  - 推送通知
- 生命周期：注册 → 安装 → 激活 → 运行

## 4. Manifest

- Web App Manifest 是一个 JSON 文件，描述应用的元信息：

```json
{
  "name": "My App",
  "short_name": "App",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#1890ff",
  "background_color": "#ffffff",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

## 5. 离线缓存

- Service Worker 使用 Cache API 缓存资源：
  - 预缓存：构建时确定需要缓存的资源列表
  - 运行时缓存：动态缓存 API 响应和资源
- 离线时，Service Worker 从缓存中返回资源

## 6. 安装到桌面

- PWA 可以被"安装"到设备的桌面/主屏幕
- 需要满足的条件：
  - 有效的 Manifest 文件
  - 注册了 Service Worker
  - 使用 HTTPS
  - 用户与页面有交互
- 安装后以独立窗口运行，类似原生应用
