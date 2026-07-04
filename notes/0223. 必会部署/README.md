# [0223. 必会部署](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0223.%20%E5%BF%85%E4%BC%9A%E9%83%A8%E7%BD%B2)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. SPA 刷新 404](#3-spa-刷新-404)
- [4. 子路径部署](#4-子路径部署)
- [5. CDN 部署](#5-cdn-部署)
- [6. 缓存策略](#6-缓存策略)
- [7. Source Map 处理](#7-source-map-处理)

<!-- endregion:toc -->

## 1. 本节内容

- Vite 必会部署知识速查
- 覆盖 SPA 404、子路径部署、CDN 部署、缓存策略、Source Map 处理

## 2. 评价

- 部署是项目上线的最后一步，配置错误会导致白页或资源 404

## 3. SPA 刷新 404

- 原因：服务器没有 `/about` 文件，返回 404
- 解决：Nginx `try_files $uri $uri/ /index.html`

## 4. 子路径部署

- 配置 `base: '/my-app/'`
- Vue Router 配置 `createWebHistory('/my-app/')`

## 5. CDN 部署

- 配置 `base: 'https://cdn.example.com/'`
- HTML 部署在源站，资源从 CDN 加载

## 6. 缓存策略

- HTML：`no-cache`（不强缓存）
- JS/CSS/图片：`max-age=31536000, immutable`（长期缓存）
- Vite 内容哈希保证缓存一致性

## 7. Source Map 处理

- 使用 `build.sourcemap: 'hidden'` 生成但不暴露
- 上传到 Sentry 等错误监控平台
- Nginx 拒绝 `.map` 文件访问：`location ~* \.map$ { deny all; }`
