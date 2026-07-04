# [0206. 插件容器](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0206.%20%E6%8F%92%E4%BB%B6%E5%AE%B9%E5%99%A8)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Plugin Container](#3-plugin-container)
- [4. Rollup 插件兼容](#4-rollup-插件兼容)
- [5. 钩子调用机制](#5-钩子调用机制)
- [6. 开发与构建差异](#6-开发与构建差异)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 插件容器（Plugin Container）的工作原理
- 理解 Rollup 插件兼容机制和钩子调用方式

## 2. 评价

- 插件容器是 Vite 插件系统的核心，理解它有助于编写高质量插件

## 3. Plugin Container

- Plugin Container 是 Vite 内部的插件执行引擎
- 负责按顺序调用插件的各个钩子函数
- 在开发模式下，Plugin Container 模拟 Rollup 的插件接口

## 4. Rollup 插件兼容

- Vite 的 Plugin Container 实现了 Rollup 的核心插件接口：
  - `resolveId`：解析模块路径
  - `load`：加载模块内容
  - `transform`：转换模块代码
- 大部分 Rollup 插件可以直接在 Vite 中使用

## 5. 钩子调用机制

- 钩子按 `enforce` 分组执行：
  1. `pre` 插件的钩子
  2. Vite 核心插件的钩子
  3. 普通插件的钩子
  4. `post` 插件的钩子
- 每个钩子可以返回值终止链式调用（如 `resolveId` 返回路径后不再调用后续插件）

## 6. 开发与构建差异

- 开发模式：Plugin Container 在 Node.js 中执行，处理浏览器请求
- 构建模式：直接使用 Rollup/Rolldown 的原生插件系统
- 某些钩子只在特定模式下生效：
  - `configureServer`：仅开发模式
  - `transformIndexHtml`：两种模式都生效
  - `generateBundle`：仅构建模式
