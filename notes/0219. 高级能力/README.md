# [0219. 高级能力](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0219.%20%E9%AB%98%E7%BA%A7%E8%83%BD%E5%8A%9B)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. SSR](#3-ssr)
- [4. Library Mode](#4-library-mode)
- [5. Monorepo](#5-monorepo)
- [6. 微前端](#6-微前端)
- [7. 性能优化](#7-性能优化)
- [8. 源码理解](#8-源码理解)

<!-- endregion:toc -->

## 1. 本节内容

- Vite 高级能力的速查清单
- 覆盖 SSR、库模式、Monorepo、微前端、性能优化、源码理解

## 2. 评价

- 高级能力适合需要深入掌握 Vite 的开发者

## 3. SSR

- Vite 内置 SSR 支持，通过 `createServer` + `ssrLoadModule` 实现
- 推荐使用 Nuxt / Next.js 等框架

## 4. Library Mode

- `build.lib` 配置将项目构建为 npm 库
- 支持 ESM、CJS、UMD 多格式输出

## 5. Monorepo

- pnpm workspace + Turborepo 管理多包项目
- `resolve.dedupe` 解决依赖去重

## 6. 微前端

- Module Federation：运行时共享模块
- qiankun / micro-app：成熟的微前端框架

## 7. 性能优化

- 代码分割、Tree Shaking、资源压缩
- 预加载、预取、懒加载
- CDN 部署、缓存策略

## 8. 源码理解

- Dev Server 启动流程、模块图、插件容器
- HMR 源码：文件监听 → 模块失效 → WebSocket 推送
- 构建流程：配置解析 → 插件注入 → Rollup 打包
