# [0069. React 项目创建](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0069.%20React%20%E9%A1%B9%E7%9B%AE%E5%88%9B%E5%BB%BA)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. React + Vite](#3-react--vite)
- [4. React + TypeScript](#4-react--typescript)
- [5. SWC 模板](#5-swc-模板)

<!-- endregion:toc -->

## 1. 本节内容

- 掌握使用 `create-vite` 创建 React 项目
- 了解 React + TypeScript 模板的结构
- 理解 SWC 模板的优势和使用方式

## 2. 评价

- Vite 是 React 社区增长最快的构建工具之一
- 推荐使用 `react-swc-ts` 模板，兼顾 TypeScript 类型安全和编译速度

## 3. React + Vite

- 创建 React 项目：

```bash
npm create vite@latest my-react-app -- --template react
```

- 生成的项目结构：

```
my-react-app/
├── index.html
├── src/
│   ├── main.jsx          # 入口文件
│   ├── App.jsx           # 根组件
│   ├── App.css           # 组件样式
│   └── assets/           # 静态资源
├── vite.config.js
└── package.json
```

- 使用 JSX 自动转换（React 17+），无需手动 `import React`
- 默认使用 Babel 转译 JSX

## 4. React + TypeScript

- 创建 TypeScript 模板：

```bash
npm create vite@latest my-react-app -- --template react-ts
```

- TypeScript 模板多了：
  - `tsconfig.json` 和 `tsconfig.node.json`
  - `.tsx` 组件文件
  - `vite-env.d.ts` 类型声明
- 推荐所有新项目都使用 TypeScript 模板

## 5. SWC 模板

- SWC（Speedy Web Compiler）是 Rust 编写的 JavaScript/TypeScript 编译器
- 比 Babel 快 20-70 倍，是 Vite React 项目的推荐选择

```bash
# SWC + JavaScript
npm create vite@latest my-app -- --template react-swc

# SWC + TypeScript（推荐）
npm create vite@latest my-app -- --template react-swc-ts
```

- SWC 模板与 Babel 模板的区别：
  - 编译速度更快（Rust 实现）
  - 不支持 Babel 插件（如需要自定义 Babel 转换则不能使用 SWC）
  - 功能上等价，大部分场景无差异
- Vite 中 SWC 通过 `@vitejs/plugin-react-swc` 插件集成
