# [0129. Web Worker 基础](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0129.%20Web%20Worker%20%E5%9F%BA%E7%A1%80)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Worker 是什么](#3-worker-是什么)
- [4. 主线程与 Worker 通信](#4-主线程与-worker-通信)
- [5. 使用场景](#5-使用场景)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Web Worker 的基本概念和工作原理
- 掌握主线程与 Worker 之间的通信方式
- 理解 Web Worker 的适用场景

## 2. 评价

- Web Worker 是在浏览器中实现多线程的标准方式
- 适合将 CPU 密集型任务放到 Worker 中执行，避免阻塞主线程

## 3. Worker 是什么

- Web Worker 是浏览器提供的多线程机制
- 特点：
  - 独立的执行上下文，不阻塞主线程
  - 无法直接访问 DOM、`window`、`document`
  - 通过 `postMessage` / `onmessage` 与主线程通信
  - 可以使用 `fetch`、`WebSocket`、`IndexedDB` 等 Web API
- 类型：
  - Dedicated Worker：专属于创建它的页面
  - Shared Worker：可以被多个页面共享
  - Service Worker：用于离线缓存和推送通知

## 4. 主线程与 Worker 通信

- 使用 `postMessage` 发送消息，`onmessage` 接收消息：

```ts
// 主线程
const worker = new Worker(new URL('./worker.ts', import.meta.url))
worker.postMessage({ type: 'calculate', data: [1, 2, 3] })
worker.onmessage = (e) => {
  console.log('结果:', e.data)
}
```

```ts
// Worker
self.onmessage = (e) => {
  const { type, data } = e.data
  if (type === 'calculate') {
    const result = data.reduce((a, b) => a + b, 0)
    self.postMessage(result)
  }
}
```

- 数据通过结构化克隆传递（支持大部分 JS 对象，不支持函数）

## 5. 使用场景

- 适合使用 Worker 的场景：
  - 大数据量计算（排序、搜索、加密）
  - 图像处理（滤镜、裁剪、压缩）
  - 音视频处理
  - 大文件解析（CSV、Excel）
  - 复杂的算法（路径规划、物理模拟）
- 不适合的场景：
  - 简单的计算（通信开销大于计算本身）
  - 需要频繁操作 DOM 的任务
