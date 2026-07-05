# [0208. 转换流程](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0208.%20%E8%BD%AC%E6%8D%A2%E6%B5%81%E7%A8%8B)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Transform Pipeline](#3-transform-pipeline)
- [4. Oxc 转换](#4-oxc-转换)
- [5. 框架插件转换](#5-框架插件转换)
- [6. Sourcemap 合并](#6-sourcemap-合并)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 模块转换的源码流程
- 理解 Transform Pipeline、Esbuild 转换、框架插件转换和 Source Map 合并

## 2. 评价

- 转换流程是 Vite 处理模块的核心环节，理解它有助于排查编译问题

## 3. Transform Pipeline

- 模块转换的流水线：
  1. `load` 钩子：加载模块原始内容
  2. `transform` 钩子：按顺序执行各插件的转换
  3. Oxc 转换：TypeScript → JavaScript
  4. 框架插件转换：Vue SFC → JS + CSS
  5. Source Map 合并

## 4. Oxc 转换

- Oxc 转换器负责 TypeScript 和 JSX 的转译
- 速度极快（基于 Rust 实现）
- 只做语法转译，不做类型检查

## 5. 框架插件转换

- Vue 插件：将 `.vue` 文件拆分为 template、script、style
- React 插件：处理 JSX 转换和 Fast Refresh 注入
- 转换后的代码是标准的 JavaScript + CSS

## 6. Sourcemap 合并

- 每个转换步骤都可能生成 Source Map
- Vite 自动合并多个步骤的 Source Map，确保最终的 Source Map 能映射回原始源码
