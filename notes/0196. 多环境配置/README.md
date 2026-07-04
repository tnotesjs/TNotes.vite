# [0196. 多环境配置](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0196.%20%E5%A4%9A%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. dev](#3-dev)
- [4. test](#4-test)
- [5. staging](#5-staging)
- [6. production](#6-production)
- [7. preview](#7-preview)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 项目的多环境配置方式
- 掌握 dev、test、staging、production、preview 各环境的配置

## 2. 评价

- 合理的多环境配置可以让项目在不同环境中正确运行

## 3. dev

- 开发环境（`vite` 命令）：
  - 加载 `.env.development`
  - 启动 Dev Server（端口 5173）
  - 启用 HMR、Source Map
  - API 代理到后端

## 4. test

- 测试环境（`vitest` 命令）：
  - 加载 `.env.test`
  - 使用 jsdom/happy-dom 环境
  - Mock 外部依赖

## 5. staging

- 预发布环境（`vite build --mode staging`）：
  - 加载 `.env.staging`
  - API 地址指向预发布服务器
  - 可能启用额外的调试工具

## 6. production

- 生产环境（`vite build`）：
  - 加载 `.env.production`
  - 代码压缩、Tree Shaking
  - Source Map 为 hidden 模式
  - API 地址指向生产服务器

## 7. preview

- 预览环境（`vite preview`）：
  - 加载 `.env.production`
  - 本地预览构建产物
  - 端口 4173
