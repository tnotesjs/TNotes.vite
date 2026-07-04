# [0131. Worker 高级用法](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0131.%20Worker%20%E9%AB%98%E7%BA%A7%E7%94%A8%E6%B3%95)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. SharedWorker](#3-sharedworker)
- [4. Comlink](#4-comlink)
- [5. 复杂计算](#5-复杂计算)
- [6. 文件处理](#6-文件处理)
- [7. 图像处理](#7-图像处理)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Web Worker 的高级用法和实用场景
- 掌握 Comlink 简化 Worker 通信的方式
- 了解复杂计算、文件处理、图像处理等场景的 Worker 实践

## 2. 评价

- Comlink 可以大幅简化 Worker 的通信代码，推荐使用
- Worker 在处理大数据和复杂计算时效果最显著

## 3. SharedWorker

- SharedWorker 可以被多个页面共享，适用于跨标签页通信：

```ts
// shared-worker.ts
const connections = []
self.onconnect = (e) => {
  const port = e.ports[0]
  connections.push(port)
  port.onmessage = (msg) => {
    // 广播给所有连接的页面
    connections.forEach((p) => p.postMessage(msg.data))
  }
}
```

## 4. Comlink

- Google 开发的库，将 Worker 通信简化为函数调用：

```bash
npm install comlink
```

```ts
// Worker
import { expose } from 'comlink'

const api = {
  add(a: number, b: number) {
    return a + b
  },
  async heavyCompute(data: number[]) {
    /* ... */
  },
}
expose(api)
```

```ts
// 主线程
import { wrap } from 'comlink'
import MyWorker from './worker?worker'

const worker = wrap(new MyWorker())
const result = await worker.add(1, 2) // 像调用本地函数一样
```

## 5. 复杂计算

- 将 CPU 密集型计算放到 Worker 中：

```ts
// worker.ts
self.onmessage = (e) => {
  const { data } = e.data
  // 大数据排序
  const sorted = data.sort((a, b) => a - b)
  self.postMessage(sorted)
}
```

- 适用场景：数据分析、加密解密、数学计算

## 6. 文件处理

- 在 Worker 中解析大文件：

```ts
// worker.ts
self.onmessage = async (e) => {
  const file = e.data
  const text = await file.text()
  const rows = text.split('\n').map((line) => line.split(','))
  self.postMessage(rows)
}
```

- 适用场景：CSV 解析、Excel 导入、大文本处理

## 7. 图像处理

- 在 Worker 中处理图像数据：

```ts
// worker.ts
self.onmessage = (e) => {
  const { imageData, filter } = e.data
  const data = imageData.data
  // 灰度滤镜
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
    data[i] = data[i + 1] = data[i + 2] = avg
  }
  self.postMessage(imageData)
}
```

- 适用场景：图片滤镜、压缩、Canvas 离屏渲染
