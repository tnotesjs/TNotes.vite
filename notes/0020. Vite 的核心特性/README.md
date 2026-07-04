# [0020. Vite 的核心特性](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0020.%20Vite%20%E7%9A%84%E6%A0%B8%E5%BF%83%E7%89%B9%E6%80%A7)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 极速冷启动](#3-极速冷启动)
- [4. 原生 ESM 开发服务器](#4-原生-esm-开发服务器)
- [5. 按需编译](#5-按需编译)
- [6. 快速热更新 HMR](#6-快速热更新-hmr)
- [7. 开箱即用的 TypeScript 支持](#7-开箱即用的-typescript-支持)
- [8. 插件机制](#8-插件机制)
- [9. 生产环境构建优化](#9-生产环境构建优化)

<!-- endregion:toc -->

## 1. 本节内容

- 深入了解 Vite 的各项核心特性
- 理解每个特性背后的技术原理和设计思想
- 建立对 Vite 能力边界的完整认知

## 2. 评价

- 本节是对上一篇"Vite 是什么"的展开和深化
- 建议重点关注**极速冷启动**和**按需编译**，这两个是 Vite 区别于传统工具的核心差异
- 其余特性（TypeScript 支持、插件机制等）后续会有专门章节深入

## 3. 极速冷启动

- **核心原理**：Vite 开发阶段不需要打包整个应用，而是直接利用浏览器原生的 ES Modules 能力加载模块
- **传统工具的问题**：Webpack 等打包器在启动时需要从入口文件开始，递归构建整个模块依赖图，项目越大启动越慢
- **Vite 的做法**：
  - 启动时只做**依赖预构建**（使用 Esbuild，速度比 JS 打包器快 10-100 倍），将 `node_modules` 中的 CommonJS / UMD 模块转换为 ESM
  - 源码部分**不做任何打包**，直接交给浏览器按需加载
  - 冷启动速度几乎不受项目规模影响，大型项目也能秒级启动

## 4. 原生 ESM 开发服务器

- Vite 的开发服务器基于浏览器原生的 `<script type="module">` 机制工作
- **工作流程**：
  1. 浏览器请求入口 HTML
  2. 遇到 `<script type="module">` 标签，向 Vite Dev Server 发起模块请求
  3. Vite 拦截请求，对源码进行即时转换（如 TS → JS、Vue SFC 编译等）后返回
  4. 浏览器加载该模块的 import，触发新的请求，按需逐个加载
- **关键优势**：模块的解析和加载是**渐进式**的，不需要等待整个应用编译完成
- **与传统工具的差异**：Webpack Dev Server 需要先打包所有模块，生成 bundle 后才能提供服务；Vite 则是"边请求边编译"

## 5. 按需编译

- Vite 只在浏览器**真正请求**某个模块时才对其进行编译，而非预先编译所有文件
- **开发阶段的编译范围**：
  - `node_modules` 依赖 → 由 Esbuild 预构建（一次性，后续有缓存）
  - 项目源码 → 按需编译（浏览器请求到哪个文件就编译哪个）
  - 动态导入（`import()`）的模块 → 只有实际访问到的路由/页面才会被编译
- **带来的好处**：
  - 启动快：不需要等所有文件编译完
  - 内存占用低：只编译和加载当前需要的模块
  - 与项目规模解耦：无论项目有 100 个文件还是 10000 个文件，首屏加载速度几乎不变

## 6. 快速热更新 HMR

- **HMR（Hot Module Replacement）**：文件修改后，只更新变化的模块，无需刷新整个页面
- **Vite HMR 的优势**：
  - 精确的模块边界：基于 ESM 的 import/export 关系，可以精确定义模块的更新边界
  - 无需重建依赖图：传统工具需要重新构建受影响的模块链，Vite 只需使对应模块的缓存失效
  - 框架级优化：`@vitejs/plugin-vue` 和 `@vitejs/plugin-react` 等官方插件提供了更精细的组件级 HMR
- **对比 Webpack HMR**：Webpack 的 HMR 需要维护运行时的模块图谱，随着项目增大更新速度会明显下降；Vite 的 HMR 速度与项目规模基本无关

## 7. 开箱即用的 TypeScript 支持

- Vite 开箱即用支持 TypeScript，**无需额外配置**
- **实现方式**：Vite 使用 Esbuild（而非 tsc）来转译 TypeScript 代码
  - 速度极快：Esbuild 转译 TS 比 tsc 快 20-30 倍
  - **只做转译，不做类型检查**：Esbuild 只负责将 TS 语法转换为 JS，不执行类型检查
- **类型检查的处理**：
  - 类型检查交给 IDE（VS Code 的 red squiggles）或单独的 `tsc --noEmit` 命令
  - 可以在 CI/CD 流水线中加入 `vue-tsc` 或 `tsc --noEmit` 来保障类型安全
- **同样开箱即用支持的还包括**：JSX/TSX、CSS Modules（`.module.css`）、PostCSS 等

## 8. 插件机制

- Vite 提供了基于 **Rollup 插件接口**的插件系统，同时扩展了一些 Vite 特有的钩子
- **设计优势**：
  - 复用 Rollup 生态：大量 Rollup 插件可以直接在 Vite 中使用
  - 统一的开发和构建插件：同一个插件在开发和生产环境都生效，避免行为不一致
  - 插件可以拦截模块请求、转换代码内容、注入环境变量等
- **官方插件**：`@vitejs/plugin-vue`、`@vitejs/plugin-react`、`@vitejs/plugin-legacy` 等
- **社区生态**：Vite 的插件生态增长迅速，涵盖了从 CSS 框架集成到 SVG 处理等各种场景
- 更多细节将在后续"Vite 插件"系列章节中展开

## 9. 生产环境构建优化

- Vite 生产构建使用 **Rollup**（未来将逐步迁移到 **Rolldown**，Rust 实现的 Rollup 替代品）
- **内置优化能力**：
  - **自动代码分割（Code Splitting）**：自动拆分动态导入的模块为独立 chunk
  - **Tree Shaking**：移除未使用的代码，减小产物体积
  - **CSS 代码分割**：自动提取公共 CSS，按页面按需加载
  - **资源处理**：自动对静态资源进行哈希命名、内联小资源、压缩大资源
  - **多页面应用支持**：通过 `build.rollupOptions.input` 配置多个入口
- **产物体积优化建议**：
  - 使用 `vite-plugin-cdn-import` 将大型库通过 CDN 引入
  - 使用 `rollup-plugin-visualizer` 分析产物组成
  - 合理配置 `build.chunkSizeWarningLimit` 和手动 chunk 分割策略
