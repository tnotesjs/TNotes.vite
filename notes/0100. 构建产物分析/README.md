# [0100. 构建产物分析](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0100.%20%E6%9E%84%E5%BB%BA%E4%BA%A7%E7%89%A9%E5%88%86%E6%9E%90)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Rollup Visualizer](#3-rollup-visualizer)
- [4. Bundle Analyzer](#4-bundle-analyzer)
- [5. Source Map 分析](#5-source-map-分析)
- [6. Chunk 依赖关系分析](#6-chunk-依赖关系分析)

<!-- endregion:toc -->

## 1. 本节内容

- 了解分析 Vite 构建产物的常用工具
- 掌握 `rollup-plugin-visualizer` 和 Bundle Analyzer 的使用
- 理解 Source Map 分析和 Chunk 依赖关系分析

## 2. 评价

- 构建产物分析是性能优化的第一步，先分析再优化
- `rollup-plugin-visualizer` 是 Vite 生态中最推荐的分析工具

## 3. Rollup Visualizer

- 最推荐的构建产物分析工具，生成交互式的可视化报告

```bash
npm install -D rollup-plugin-visualizer
```

```ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    visualizer({
      open: true, // 构建后自动打开报告
      filename: 'stats.html', // 报告文件名
      gzipSize: true, // 显示 gzip 后的体积
      brotliSize: true, // 显示 brotli 后的体积
    }),
  ],
})
```

- 报告内容：
  - 各 chunk 的体积占比（Treemap 图）
  - 每个模块的体积和依赖关系
  - 识别体积最大的模块和依赖

## 4. Bundle Analyzer

- 使用 `source-map-explorer` 分析已有的构建产物：

```bash
npm install -D source-map-explorer
npx source-map-explorer dist/assets/index-*.js
```

- 需要先开启 source map 生成（`build.sourcemap: true`）
- 提供与 Rollup Visualizer 类似的可视化报告

## 5. Source Map 分析

- Source Map 将构建后的代码映射回源码，便于：
  - 定位体积最大的源文件
  - 分析哪些源码被包含在最终产物中
  - 排查 Tree Shaking 失效的原因
- 开启 Source Map：

```ts
export default defineConfig({
  build: {
    sourcemap: true, // 或 'hidden' 避免暴露给浏览器
  },
})
```

## 6. Chunk 依赖关系分析

- 使用 `madge` 分析模块间的依赖关系：

```bash
npm install -D madge
npx madge --image deps.svg src/main.ts
```

- 生成依赖关系图，可以识别：
  - 循环依赖
  - 不合理的依赖关系
  - 过深的依赖链
- 结合 `rollup-plugin-visualizer` 的 Chunk 视图，可以全面了解构建产物的组成
