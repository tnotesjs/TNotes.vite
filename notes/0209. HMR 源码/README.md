# [0209. HMR 源码](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0209.%20HMR%20%E6%BA%90%E7%A0%81)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 文件监听](#3-文件监听)
- [4. 模块失效](#4-模块失效)
- [5. 更新边界](#5-更新边界)
- [6. WebSocket 推送](#6-websocket-推送)
- [7. 客户端接收更新](#7-客户端接收更新)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite HMR 的源码实现
- 理解文件监听、模块失效、更新边界、WebSocket 推送的完整流程

## 2. 评价

- HMR 是 Vite 开发体验的核心，理解其源码有助于编写支持 HMR 的插件

## 3. 文件监听

- 使用 Chokidar 监听项目文件变化
- 监听范围：`src/`、`public/` 等目录
- 排除：`node_modules/`、`.git/` 等
- 文件变化时触发 HMR 更新流程

## 4. 模块失效

- 文件变化后，Vite 使该模块的缓存失效
- 沿着模块图的 importers 链向上冒泡，使依赖链上的模块也失效
- 直到找到 HMR 边界（`accept` 回调）

## 5. 更新边界

- HMR 边界是模块图中第一个接受自身更新的模块
- 如果没有找到边界，更新冒泡到入口模块，触发整页刷新
- 框架插件（Vue/React）自动为组件设置 HMR 边界

## 6. WebSocket 推送

- 通过 WebSocket 向客户端发送更新消息
- 消息类型：
  - `update`：模块更新（包含更新的模块路径和时间戳）
  - `full-reload`：整页刷新
  - `prune`：模块移除
  - `error`：编译错误

## 7. 客户端接收更新

- 客户端 HMR Runtime 接收 WebSocket 消息
- 根据消息类型执行对应操作：
  - `update`：向 Dev Server 请求更新后的模块，执行 `accept` 回调
  - `full-reload`：刷新页面
  - `error`：显示错误覆盖层
