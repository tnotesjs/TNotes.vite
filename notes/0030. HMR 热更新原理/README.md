# [0030. HMR 热更新原理](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0030.%20HMR%20%E7%83%AD%E6%9B%B4%E6%96%B0%E5%8E%9F%E7%90%86)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. HMR 是什么](#3-hmr-是什么)
- [4. Vite HMR 流程](#4-vite-hmr-流程)
- [5. WebSocket 通信](#5-websocket-通信)
- [6. 模块热替换边界](#6-模块热替换边界)
- [7. CSS HMR](#7-css-hmr)
- [8. Vue HMR](#8-vue-hmr)
- [9. React Fast Refresh](#9-react-fast-refresh)
- [10. 手写 HMR API](#10-手写-hmr-api)

<!-- endregion:toc -->

## 1. 本节内容

- 理解 HMR（Hot Module Replacement）的基本概念
- 了解 Vite HMR 的完整工作流程
- 掌握 CSS、Vue、React 的 HMR 实现原理
- 了解如何使用 HMR API 手动处理模块更新

## 2. 评价

- HMR 是现代前端开发体验的核心，理解其原理有助于编写支持 HMR 的代码
- CSS HMR 和 Vue/React 的框架级 HMR 是日常开发中接触最多的场景
- 手写 HMR API 在开发库或自定义插件时会用到

## 3. HMR 是什么

- HMR（Hot Module Replacement，热模块替换）是指在不刷新整个页面的情况下，更新修改的模块
- 传统的页面刷新方式（Live Reload）会丢失应用状态（如表单输入、滚动位置、组件内部状态）
- HMR 的优势：
  - 保留应用状态，只替换变化的模块
  - 更新速度极快（毫秒级别）
  - 特别适合 UI 开发：调整样式、修改组件逻辑后即时看到效果
- 所有现代前端框架（Vue、React、Svelte）都通过各自的插件支持 HMR

## 4. Vite HMR 流程

- 完整的 HMR 流程：
  1. **文件监听**：Vite Dev Server 通过 `chokidar` 监听项目文件变化
  2. **模块失效**：文件变化后，Vite 使该模块及其依赖链上的模块缓存失效
  3. **WebSocket 通知**：通过 WebSocket 连接向浏览器发送 HMR 更新消息
  4. **客户端处理**：浏览器端的 HMR Runtime 接收消息，向 Dev Server 请求更新后的模块
  5. **模块替换**：用新模块替换旧模块，触发模块的 `accept` 回调
  6. **冒泡更新**：如果当前模块没有处理 HMR，更新会冒泡到父模块，直到某个模块处理或触发整页刷新
- 关键点：更新是**精确到模块级别**的，只有变化的模块和受影响的模块会被更新

## 5. WebSocket 通信

- Vite 使用 WebSocket 实现 Dev Server 与浏览器之间的双向实时通信
- WebSocket 连接由 Vite 自动建立，无需手动配置
- 通信的消息类型：
  - `update`：模块更新通知，包含更新的模块路径和时间戳
  - `full-reload`：整页刷新通知（当 HMR 无法处理时的降级方案）
  - `prune`：模块移除通知
  - `error`：编译错误通知，在浏览器中显示错误覆盖层
- 如果 WebSocket 连接断开（如 Dev Server 重启），浏览器会自动重连
- 配置代理时需注意 WebSocket 的路径（`/vite-hmr`），确保代理不干扰 WebSocket 连接

## 6. 模块热替换边界

- HMR 的更新边界（HMR Boundary）决定了哪些模块会被热替换
- 一个模块成为 HMR 边界的条件：该模块通过 `import.meta.hot.accept()` 接受了自身的更新
- 更新传播规则：
  - 如果变化的模块是 HMR 边界，只更新该模块自身
  - 如果不是 HMR 边界，更新向上冒泡到最近的 HMR 边界
  - 如果冒泡到入口模块仍未找到边界，触发整页刷新
- 示例：

```ts
// 假设模块 A 导入模块 B，模块 B 导入模块 C
// 如果模块 C 变化且模块 B 是 HMR 边界：
//   → 只更新模块 B
// 如果模块 B 不是 HMR 边界，但模块 A 是：
//   → 更新模块 B 和模块 A
// 如果都不是 HMR 边界：
//   → 整页刷新
```

## 7. CSS HMR

- CSS 的 HMR 是**开箱即用**的，无需任何额外代码
- 原理：
  1. 监听到 `.css` / `.scss` / `.less` 等样式文件变化
  2. Vite 重新编译样式内容
  3. 通过 WebSocket 通知浏览器
  4. 浏览器用新的 `<style>` 标签替换旧的样式
- CSS Modules 的 HMR 同样自动支持，但需要导入该 CSS Modules 文件的模块也支持 HMR
- **不丢失任何状态**：CSS HMR 只替换样式，不影响 DOM 结构和 JavaScript 状态
- 这是日常开发中最频繁体验到的 HMR 场景

## 8. Vue HMR

- Vue 的 HMR 由 `@vitejs/plugin-vue` 提供，实现了**组件级热替换**
- 支持的更新场景：
  - `<template>` 修改：重新渲染组件，保留组件状态
  - `<script>` 修改：重新执行 setup/render 逻辑
  - `<style>` 修改：同 CSS HMR，即时替换样式
- Vue HMR 的实现原理：
  - Vue Compiler 在编译 SFC 时注入 HMR 相关代码（`__VUE_HMR_RUNTIME__`）
  - 模板变化时，生成新的渲染函数并热替换
  - `<script setup>` 中的变量变化时，重新执行 setup 函数
- 状态保留策略：
  - 父组件状态保留
  - 被修改组件的本地状态重置（因为 setup 重新执行了）
  - 兄弟组件状态不受影响

## 9. React Fast Refresh

- React 的 HMR 方案叫 **Fast Refresh**，由 `@vitejs/plugin-react` 提供
- Fast Refresh 的能力：
  - **函数组件 / Hook 变化**：重新执行组件函数，保留状态（如果可以保留的话）
  - **纯渲染逻辑变化**：即时重渲染，完全保留状态
  - **有副作用的 Hook 变化**（如 `useEffect`）：组件会被完整重载
  - **类型 / 类组件变化**：触发整页刷新（降级方案）
- 与 Vue HMR 的对比：
  - Vue 的 HMR 粒度更细（模板编译级），React Fast Refresh 是运行时方案
  - 两者在实际体验上差异不大，都能实现组件级热替换
- Fast Refresh 要求组件遵循一些规则（如不在渲染函数中写副作用），否则会降级为整页刷新

## 10. 手写 HMR API

- Vite 提供了 `import.meta.hot` API 供模块手动处理 HMR
- 基本用法：

```ts
// 假设这是一个普通的工具模块（非 Vue/React 组件）
export function greet(name: string) {
  return `Hello, ${name}!`
}

// 手动处理 HMR
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    // 模块更新后的回调
    console.log('模块已更新:', newModule)
  })

  import.meta.hot.dispose(() => {
    // 模块被替换前的清理逻辑
    console.log('模块即将被替换')
  })
}
```

- 常用 API：
  - `import.meta.hot.accept(cb)`：接受自身的更新
  - `import.meta.hot.accept(deps, cb)`：接受依赖模块的更新
  - `import.meta.hot.dispose(cb)`：注册清理回调，在模块被替换前执行
  - `import.meta.hot.decline()`：拒绝更新，触发整页刷新
  - `import.meta.hot.invalidate(msg)`：主动使模块失效
- 适用场景：
  - 开发自定义库时提供 HMR 支持
  - 管理全局状态（如 WebSocket 连接、定时器）的模块，需要在更新时清理资源
  - 非框架组件的普通 JS 模块，希望实现热替换
