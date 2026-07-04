# [0217. 构建与部署](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0217.%20%E6%9E%84%E5%BB%BA%E4%B8%8E%E9%83%A8%E7%BD%B2)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 生产构建](#3-生产构建)
- [4. 代码分割](#4-代码分割)
- [5. 资源优化](#5-资源优化)
- [6. `base` 配置](#6-base-配置)
- [7. Nginx / CDN 部署](#7-nginx--cdn-部署)

<!-- endregion:toc -->

## 1. 本节内容

- Vite 构建与部署的速查清单
- 覆盖生产构建、代码分割、资源优化、base 配置和部署方式

## 2. 评价

- 构建与部署是项目上线的最后一步，配置正确至关重要

## 3. 生产构建

- `pnpm build`：输出到 `dist/` 目录
- 默认使用 Esbuild 压缩、Rollup 打包

## 4. 代码分割

- 路由懒加载：`() => import('./pages/Home.vue')`
- `manualChunks`：手动拆分 vendor chunk

## 5. 资源优化

- 小于 4KB 的资源自动 Base64 内联
- 使用 `vite-plugin-imagemin` 压缩图片
- 使用 `vite-plugin-compression` 生成 Gzip/Brotli 文件

## 6. `base` 配置

- 根路径部署：`base: '/'`
- 子路径部署：`base: '/my-app/'`
- CDN 部署：`base: 'https://cdn.example.com/'`

## 7. Nginx / CDN 部署

- Nginx：配置 `try_files $uri $uri/ /index.html`（SPA fallback）
- CDN：静态资源部署到 CDN，HTML 部署在源站
- Vercel / Netlify：连接 Git 仓库自动部署
