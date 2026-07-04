# [0192. 构建 API](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0192.%20%E6%9E%84%E5%BB%BA%20API)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 编程式构建](#3-编程式构建)
- [4. 多配置构建](#4-多配置构建)
- [5. 自定义构建流程](#5-自定义构建流程)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 构建的 Node API
- 掌握编程式构建、多配置构建和自定义构建流程

## 2. 评价

- 编程式构建适合自定义构建脚本和 CI/CD 集成
- 多配置构建适用于库模式 + 应用模式同时构建的场景

## 3. 编程式构建

```ts
import { build } from 'vite'

const result = await build({
  root: process.cwd(),
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
```

- 返回 Rollup 的输出结果，包含生成的文件信息

## 4. 多配置构建

- 同时构建多个配置（如库模式 + 应用模式）：

```ts
import { build } from 'vite'

// 构建库
await build({
  build: {
    lib: { entry: 'src/index.ts', formats: ['es', 'cjs'] },
    outDir: 'dist/lib',
  },
})

// 构建应用
await build({
  build: { outDir: 'dist/app' },
})
```

## 5. 自定义构建流程

- 在构建前后执行自定义逻辑：

```ts
import { build } from 'vite'

console.log('Build started...')
await build({ root: process.cwd() })
console.log('Build completed!')

// 构建后执行其他任务
// 如：上传 Source Map、生成报告等
```
