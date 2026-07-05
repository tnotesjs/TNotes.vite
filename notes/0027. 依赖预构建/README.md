# [0027. 依赖预构建](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0027.%20%E4%BE%9D%E8%B5%96%E9%A2%84%E6%9E%84%E5%BB%BA)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 什么是依赖预构建](#3-什么是依赖预构建)
- [4. 为什么需要预构建](#4-为什么需要预构建)
  - [4.1. CommonJS 模块无法在浏览器中直接使用](#41-commonjs-模块无法在浏览器中直接使用)
  - [4.2. 模块请求爆炸（Request Waterfall）](#42-模块请求爆炸request-waterfall)
  - [4.3. 裸模块导入的路径解析](#43-裸模块导入的路径解析)
- [5. CommonJS 转 ESM](#5-commonjs-转-esm)
- [6. 依赖缓存](#6-依赖缓存)
- [7. `node_modules/.vite`](#7-node_modulesvite)
- [8. `optimizeDeps`](#8-optimizedeps)

<!-- endregion:toc -->

## 1. 本节内容

- 理解什么是依赖预构建以及为什么需要它
- 了解 CommonJS 转 ESM 的必要性
- 掌握依赖缓存机制和 `optimizeDeps` 配置

## 2. 评价

- 依赖预构建是 Vite 正常工作的基石，理解它有助于排查开发中的常见问题（如依赖缓存、模块格式不兼容等）
- 大部分项目不需要手动配置 `optimizeDeps`，但了解其能力有助于处理特殊情况

## 3. 什么是依赖预构建

- 依赖预构建（Dependency Pre-Bundling）是 Vite 在首次启动时对 `node_modules` 中的依赖进行的预处理
- 由 Esbuild 执行，速度极快（比 JavaScript 打包器快 10-100 倍）
- 预构建的目的：
  1. 将 CommonJS / UMD 格式的依赖转换为 ESM 格式
  2. 将大量零散的小模块合并为单个模块，减少浏览器请求数量
- 预构建的结果缓存在 `node_modules/.vite` 目录中，后续启动直接使用缓存

## 4. 为什么需要预构建

预构建解决了三个核心问题。

### 4.1. CommonJS 模块无法在浏览器中直接使用

大量 npm 包（如 lodash、axios）仍然使用 CommonJS 格式发布，浏览器原生只支持 ESM（`import`/`export`），不支持 `require()`/`module.exports`。预构建将 CJS 转换为 ESM，让浏览器可以正确加载。

### 4.2. 模块请求爆炸（Request Waterfall）

一个 npm 包可能由数百个小模块组成（如 `lodash` 有 600+ 个模块），如果不预构建，浏览器需要发起数百个 HTTP 请求，导致严重的瀑布流问题。预构建将这些小模块合并为一个或少数几个文件，大幅减少请求数。

### 4.3. 裸模块导入的路径解析

`import _ from 'lodash'` 这种裸模块导入在浏览器中无法工作，Vite 需要将其重写为实际的文件路径，预构建阶段会完成这个映射。

## 5. CommonJS 转 ESM

- 预构建使用 Esbuild 将 CommonJS 模块转换为 ESM 格式
- 转换过程处理了常见的 CJS 模式：
  - `module.exports = ...` → `export default ...`
  - `exports.foo = ...` → `export const foo = ...`
  - `require('xxx')` → `import xxx from 'xxx'`
- 某些复杂的 CJS 模式可能无法被 Esbuild 正确转换，此时需要手动配置 `optimizeDeps.include` 或 `optimizeDeps.esbuildOptions`
- 转换后的模块存储在 `node_modules/.vite/deps` 目录中

## 6. 依赖缓存

- Vite 会将预构建结果缓存到文件系统中，避免每次启动都重新构建
- 缓存标识（Hash）基于以下因素计算：
  - 包管理器的 lock 文件（`package-lock.json`、`pnpm-lock.yaml`、`yarn.lock`）
  - `vite.config.ts` 中与 `optimizeDeps` 相关的配置
  - `package.json` 中的 `dependencies` 和 `devDependencies`
- 当以上任一因素变化时，缓存自动失效，Vite 会在下次启动时重新预构建
- 手动清除缓存：删除 `node_modules/.vite` 目录后重启 Dev Server

## 7. `node_modules/.vite`

- 预构建产物的缓存目录，由 Vite 自动管理
- 目录结构：

```
node_modules/.vite/
├── deps/           # 预构建后的依赖文件（ESM 格式）
├── _metadata.json  # 缓存元数据（Hash、依赖列表等）
└── package.json    # 使 deps 目录可被正确导入
```

- 不应手动修改此目录，修改会被 Vite 在下次启动时覆盖
- 排查问题时可以删除此目录强制重新预构建
- 在 `.gitignore` 中应包含 `node_modules/.vite`

## 8. `optimizeDeps`

- `optimizeDeps` 是 `vite.config.ts` 中用于控制依赖预构建行为的配置项
- 常用配置：

```ts
export default defineConfig({
  optimizeDeps: {
    // 强制包含某些依赖（适用于动态导入的依赖或 CJS 兼容问题）
    include: ['lodash-es', 'dayjs'],

    // 排除某些依赖不进行预构建（如已经在 ESM 格式的本地包）
    exclude: ['my-local-package'],

    // 传递给 Esbuild 的选项
    esbuildOptions: {
      target: 'esnext',
    },
  },
})
```

- 典型使用场景：
  - `include`：某些依赖是动态导入的，Vite 无法在启动时发现，需要手动指定
  - `exclude`：Monorepo 中的本地包已经是 ESM 格式，不需要预构建
  - `esbuildOptions`：调整 Esbuild 的编译目标或特殊选项
