# [0216. 框架开发](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0216.%20%E6%A1%86%E6%9E%B6%E5%BC%80%E5%8F%91)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Vue / React 与 Vite 集成](#3-vue--react-与-vite-集成)
- [4. 路由](#4-路由)
- [5. 状态管理](#5-状态管理)
- [6. 样式方案](#6-样式方案)
- [7. 静态资源处理](#7-静态资源处理)

<!-- endregion:toc -->

## 1. 本节内容

- 使用 Vite 进行框架开发的速查清单
- 覆盖 Vue/React 集成、路由、状态管理、样式方案、静态资源

## 2. 评价

- 框架开发是 Vite 最常见的使用场景

## 3. Vue / React 与 Vite 集成

- Vue：`@vitejs/plugin-vue` + `@vitejs/plugin-vue-jsx`（可选）
- React：`@vitejs/plugin-react-swc`（推荐）或 `@vitejs/plugin-react`

## 4. 路由

- Vue Router：`createRouter` + `createWebHistory`，路由懒加载 `() => import()`
- React Router：`BrowserRouter` + `Routes`，`React.lazy()` 懒加载

## 5. 状态管理

- Vue：Pinia（推荐）或 Vuex
- React：Zustand（轻量）、Redux Toolkit（大型项目）、Jotai（原子化）

## 6. 样式方案

- CSS Modules（`.module.css`）：推荐的样式隔离方案
- Tailwind CSS / UnoCSS：原子化 CSS
- Sass/Less：预处理器（安装即可使用）

## 7. 静态资源处理

- `import img from './img.png'`：返回带哈希的 URL
- `import text from './file?raw'`：返回原始字符串
- `import url from './file?url'`：返回文件 URL
