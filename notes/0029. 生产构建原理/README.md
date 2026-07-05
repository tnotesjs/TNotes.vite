# [0029. 生产构建原理](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0029.%20%E7%94%9F%E4%BA%A7%E6%9E%84%E5%BB%BA%E5%8E%9F%E7%90%86)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 开发环境与生产环境的差异](#3-开发环境与生产环境的差异)
- [4. Rollup / Rolldown 与 Vite 的关系](#4-rollup--rolldown-与-vite-的关系)
- [5. Tree Shaking](#5-tree-shaking)
- [6. 代码分割](#6-代码分割)
- [7. Chunk 生成](#7-chunk-生成)
- [8. 静态资源处理](#8-静态资源处理)
- [9. 压缩与优化](#9-压缩与优化)
  - [9.1. JavaScript 压缩](#91-javascript-压缩)
  - [9.2. CSS 压缩](#92-css-压缩)
  - [9.3. HTML 压缩](#93-html-压缩)
  - [9.4. 图片优化](#94-图片优化)
  - [9.5. Gzip / Brotli 预压缩](#95-gzip--brotli-预压缩)

<!-- endregion:toc -->

## 1. 本节内容

- 理解 Vite 生产构建与开发模式的核心差异
- 了解 Rollup / Rolldown 在生产构建中的角色
- 掌握 Tree Shaking、代码分割、Chunk 生成等关键优化机制

## 2. 评价

- 生产构建是 Vite 输出高质量产物的关键环节，理解它有助于优化构建产物的体积和性能
- Vite 正在从 Rollup 迁移到 Rolldown（Rust 实现），未来构建速度将大幅提升

## 3. 开发环境与生产环境的差异

| 维度 | 开发环境 | 生产环境 |
| --- | --- | --- |
| 模块加载 | 原生 ESM，浏览器逐个请求 | Rollup 打包为 bundle，减少请求数 |
| 编译工具 | Oxc 转换器（极速转译） | Rolldown（高质量打包） |
| 代码压缩 | 不压缩（便于调试） | 自动压缩（oxc 或 terser） |
| Source Map | 默认开启（快速重编译） | 需手动开启（`build.sourcemap: true`） |
| CSS 处理 | `<style>` 标签注入（便于 HMR） | 提取为独立 CSS 文件 |
| 优化策略 | 无（追求启动速度） | Tree Shaking、Code Splitting、压缩等 |

- Vite 的口号是"开发快、构建好"：开发阶段追求极致速度，生产阶段追求产物质量

## 4. Rollup / Rolldown 与 Vite 的关系

- Rollup：当前 Vite 生产构建的默认打包工具（Vite 2 ~ 5）。成熟稳定，广泛用于库打包和应用构建，原生支持 ESM 输出，Tree Shaking 能力优秀，Vite 的插件系统基于 Rollup 的插件接口设计
- Rolldown：Vite 团队开发的 Rust 实现打包器，已在 Vite 6+ 中替代 Rollup 成为默认打包器。构建速度比 Rollup 快 10-30 倍，保持 API 兼容
- 为什么开发和生产使用不同的工具？
  - Oxc 转换器擅长快速转译，但产物优化能力（Tree Shaking、Code Splitting）不如 Rolldown
  - Rolldown 擅长生成高质量的优化产物，同时保持较快的构建速度
  - Vite 结合了两者的优势：开发用 Oxc 转换器获得速度，生产用 Rolldown 获得质量

## 5. Tree Shaking

- Tree Shaking 是指在打包过程中移除未使用的代码（Dead Code Elimination）
- Rollup 的 Tree Shaking 能力在所有打包器中最为出色
- 生效条件：
  - 代码使用 ESM 格式（`import`/`export`），CommonJS 无法被 Tree Shaking
  - 依赖包的 `package.json` 中有 `"sideEffects": false` 声明
  - 代码中没有副作用（Side Effect）的函数调用
- Vite 生产构建默认启用 Tree Shaking，无需额外配置
- 常见陷阱：
  - 导入了但未使用的 CSS 文件可能不会被 Tree Shaking（因为 CSS import 通常被视为有副作用）
  - 某些库的副作用代码（如 polyfill）可能无法被移除

## 6. 代码分割

- 代码分割（Code Splitting）将应用拆分为多个小块（chunk），按需加载。Vite 中的代码分割策略包括：动态导入（`import('./xxx')` 的模块会被自动拆分为独立 chunk）、路由级分割（配合 Vue Router / React Router 的懒加载）、共享模块提取（多个 chunk 共享的模块会被提取为单独的共享 chunk，避免重复加载）。
- 配置示例（手动分割策略）：

```ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-vue': ['vue', 'vue-router', 'pinia'],
          'vendor-ui': ['element-plus'],
        },
      },
    },
  },
})
```

## 7. Chunk 生成

- Rollup 在构建时会根据以下规则生成 chunk：入口 chunk（每个入口文件对应一个 chunk）、动态 chunk（每个动态导入对应一个 chunk）、共享 chunk（被多个 chunk 引用的公共模块）。chunk 命名策略默认使用内容哈希（`index-[hash].js`），可通过 `output.chunkFileNames` 自定义命名规则，内容哈希确保文件内容变化时文件名变化，利于长期缓存。chunk 体积控制通过 `build.chunkSizeWarningLimit`（默认 500KB）设置警告阈值，当 chunk 过大时需要考虑进一步拆分。

## 8. 静态资源处理

- 生产构建时，静态资源的处理流程：
  1. 小于 `build.assetsInlineLimit`（默认 4KB）的资源被 Base64 内联
  2. 大于阈值的资源被复制到 `dist/assets/` 目录，文件名带内容哈希
  3. 代码中的引用路径自动更新为新的文件名
- 资源文件名格式：`assets/[name]-[hash][extname]`
- 可通过 `build.assetsDir` 自定义资源子目录名
- CSS 文件同样带内容哈希，确保缓存一致性

## 9. 压缩与优化

### 9.1. JavaScript 压缩

默认使用 Oxc 压缩（速度极快），可选 terser（压缩率更高但更慢：`build.minify: 'terser'`），可关闭压缩：`build.minify: false`（调试时有用）。

### 9.2. CSS 压缩

默认使用 Lightning CSS（Rust 实现，速度极快，Vite 5.1+ 引入），自动合并重复规则、移除空白、缩短颜色值、优化选择器。

### 9.3. HTML 压缩

使用 `@minify-html/node` 插件可压缩 HTML 输出，Vite 默认不压缩 HTML，需要安装插件。

### 9.4. 图片优化

Vite 不内置图片压缩，需要通过插件实现（如 `vite-plugin-imagemin`），建议在 CI/CD 流水线中使用独立的图片压缩工具。

### 9.5. Gzip / Brotli 预压缩

使用 `vite-plugin-compression` 在构建时生成 `.gz` / `.br` 文件，配合 Nginx 或 CDN 的 `gzip_static` / `brotli_static` 指令，直接返回预压缩文件。
