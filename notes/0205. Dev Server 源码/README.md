# [0205. Dev Server 源码](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0205.%20Dev%20Server%20%E6%BA%90%E7%A0%81)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 服务启动流程](#3-服务启动流程)
- [4. 中间件机制](#4-中间件机制)
- [5. 模块图 Module Graph](#5-模块图-module-graph)
- [6. 依赖扫描](#6-依赖扫描)
- [7. HMR 处理](#7-hmr-处理)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite Dev Server 的源码结构和启动流程
- 理解中间件机制、模块图、依赖扫描和 HMR 处理

## 2. 评价

- 源码级理解有助于排查复杂问题和编写高质量插件
- 建议在阅读源码时结合调试工具逐步跟踪

## 3. 服务启动流程

- Dev Server 的启动流程：
  1. 解析 Vite 配置（`resolveConfig`）
  2. 创建 HTTP 服务器（基于 Connect 中间件框架）
  3. 执行依赖预构建（Esbuild）
  4. 注册内置中间件（静态文件、模块转换、HMR 等）
  5. 执行 `configureServer` 插件钩子
  6. 监听端口，开始服务

## 4. 中间件机制

- Vite Dev Server 基于 Connect 框架，使用中间件处理请求
- 核心中间件：
  - `indexHtmlMiddleware`：处理 `index.html` 请求
  - `transformMiddleware`：拦截模块请求，执行插件转换
  - `serveStaticMiddleware`：提供静态文件服务
  - `proxyMiddleware`：API 代理
- 中间件按顺序执行，每个中间件可以决定是否传递给下一个

## 5. 模块图 Module Graph

- Vite 维护了一个模块图（Module Graph），记录所有已加载模块的依赖关系
- 模块图的数据结构：
  - 每个文件对应一个 `ModuleNode`
  - 记录模块的 importers（谁导入了它）和 imported（它导入了谁）
  - 记录模块的最后修改时间和 HMR 边界
- HMR 更新时，通过模块图找到受影响的模块链

## 6. 依赖扫描

- 启动时使用 Esbuild 扫描源码中的 `import` 语句
- 发现 `node_modules` 中的依赖，进行预构建
- 预构建结果缓存在 `node_modules/.vite` 目录

## 7. HMR 处理

- HMR 的处理流程：
  1. Chokidar 监听文件变化
  2. 使变化模块及其依赖链上的模块缓存失效
  3. 通过模块图找到 HMR 边界
  4. 通过 WebSocket 发送更新消息
  5. 客户端接收消息，请求更新后的模块
  6. 执行模块的 `accept` 回调
