# [0164. 构建性能优化](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0164.%20%E6%9E%84%E5%BB%BA%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 构建缓存](#3-构建缓存)
- [4. 减少 Babel](#4-减少-babel)
- [5. 合理拆分 Chunk](#5-合理拆分-chunk)
- [6. 避免大型依赖](#6-避免大型依赖)
- [7. 并行压缩](#7-并行压缩)

<!-- endregion:toc -->

## 1. 本节内容

- 了解提升 Vite 构建速度的优化手段
- 掌握构建缓存、Babel 替代、Chunk 拆分等技巧

## 2. 评价

- Vite 的构建速度已经很快（Oxc + Rolldown），大部分项目不需要额外优化
- 大型项目可以通过以下手段进一步提升构建速度

## 3. 构建缓存

- 利用缓存避免重复构建：
  - 依赖预构建缓存（`node_modules/.vite`）
  - CI 中缓存 `node_modules` 和构建产物
  - 使用 Turborepo 的远程缓存（Monorepo 场景）

## 4. 减少 Babel

- Babel 是最慢的编译器，尽量使用 Oxc 或 SWC 替代：
  - React 项目：使用 `@vitejs/plugin-react-swc` 替代 `@vitejs/plugin-react`
  - 移除不必要的 Babel 插件
  - 使用 Oxc 的 `target` 配置替代 Babel 的语法降级

## 5. 合理拆分 Chunk

- 过度拆分会导致构建时间增加（更多的 chunk = 更多的处理）
- 合理的拆分策略：
  - 大型依赖单独拆分（如 ECharts、Monaco Editor）
  - 其余 node_modules 合并为一个 vendor chunk
  - 避免将小模块拆分为独立 chunk

## 6. 避免大型依赖

- 大型依赖会增加构建时间：
  - `moment`（~300KB）→ 使用 `dayjs`（~2KB）
  - `lodash`（~500KB）→ 使用 `lodash-es`（支持 Tree Shaking）
  - 全量引入 UI 库 → 按需引入

## 7. 并行压缩

- Vite 默认使用 Oxc 压缩（已支持多线程）
- 如果使用 Terser，可以启用并行压缩：

```ts
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: { passes: 2 },
    },
  },
})
```

- 注意：并行压缩会增加内存占用，CI 环境中需要注意内存限制
