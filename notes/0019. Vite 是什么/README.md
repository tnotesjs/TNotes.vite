# [0019. Vite 是什么](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0019.%20Vite%20%E6%98%AF%E4%BB%80%E4%B9%88)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Vite 的定位](#3-vite-的定位)
- [4. Vite 解决了什么问题](#4-vite-解决了什么问题)
- [5. Vite 与传统构建工具的区别](#5-vite-与传统构建工具的区别)
- [6. Vite 与 Webpack、Rollup、Parcel、Rspack 的对比](#6-vite-与-webpackrollupparcelrspack-的对比)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 的定位和核心价值
- 理解 Vite 解决了传统构建工具的哪些痛点
- 对比 Vite 与 Webpack、Rollup、Parcel、Rspack 的差异

## 2. 评价

- 作为入门第一篇，只需对 Vite 有宏观认知即可
- 重点理解"为什么需要 Vite"，而非深入技术细节

## 3. Vite 的定位

- Vite 是一个**下一代前端开发与构建工具**，由 Vue 作者尤雨溪创建
- 名字源自法语 "vite"（意为"快速"），发音 `/vit/（类似"veet"）\*\*
- 定位：**开箱即用**的现代前端工具链，同时覆盖开发体验和生产构建
- 官方口号：_Next Generation Frontend Tooling_（下一代前端开发工具）
- 核心价值主张：**极速的冷启动 + 即时的热更新 + 优化的生产构建**

## 4. Vite 解决了什么问题

- **冷启动慢**：传统打包工具（如 Webpack）在项目启动时需要先打包整个应用，项目越大启动越慢
- **热更新慢**：文件修改后需要重新构建受影响的模块链，更新速度随项目规模线性下降
- **配置复杂**：Webpack 等工具需要大量配置才能正常工作，学习成本高
- **开发与生产割裂**：开发环境和生产环境使用不同的处理方式，可能导致行为不一致

## 5. Vite 与传统构建工具的区别

- **开发阶段不打包**：Vite 利用浏览器原生 ES Modules，开发时不需要打包，直接由浏览器请求模块
- **按需编译**：只编译浏览器当前请求的模块，而非整个应用
- **依赖预构建**：使用 Esbuild（Go 编写，比 JS 打包器快 10-100 倍）预构建 node_modules 依赖
- **生产构建使用 Rollup**：开发用 Esbuild 快速编译，生产用 Rollup 做高质量打包（tree-shaking、code-splitting）
- **配置极简**：合理的默认值，大多数项目零配置即可运行

## 6. Vite 与 Webpack、Rollup、Parcel、Rspack 的对比

| 特性 | Vite | Webpack | Rollup | Parcel | Rspack |
| --- | --- | --- | --- | --- | --- |
| 开发启动速度 | 极快（ESM 原生加载） | 慢（需全量打包） | N/A（非开发工具） | 较快 | 快（Rust 实现） |
| 热更新速度 | 极快（精准模块替换） | 较慢（随项目增大变慢） | N/A | 较快 | 快 |
| 生产构建 | Rollup / Rolldown | 自身打包 | 自身打包 | 自身打包 | 自身打包 |
| 配置复杂度 | 低（开箱即用） | 高 | 中 | 低 | 中高 |
| 底层语言 | Esbuild(Go) + Rollup(JS) | JavaScript | JavaScript | JavaScript + Rust | Rust |
| 生态成熟度 | 快速增长 | 最成熟 | 成熟 | 较小 | 增长中 |

- **Vite vs Webpack**：开发体验碾压，生态在追赶；大型遗留项目迁移有成本
- **Vite vs Rollup**：Vite 生产构建基于 Rollup，两者互补而非竞争
- **Vite vs Parcel**：理念相似（零配置），Vite 生态和社区更活跃
- **Vite vs Rspack**：Rspack 是 Rust 实现的 Webpack 兼容替代品，迁移成本低但生态独立
