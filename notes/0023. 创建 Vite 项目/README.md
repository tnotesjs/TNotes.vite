# [0023. 创建 Vite 项目](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0023.%20%E5%88%9B%E5%BB%BA%20Vite%20%E9%A1%B9%E7%9B%AE)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 使用 `create-vite`](#3-使用-create-vite)
- [4. 创建 Vue 项目](#4-创建-vue-项目)
- [5. 创建 React 项目](#5-创建-react-项目)
- [6. 创建 Svelte 项目](#6-创建-svelte-项目)
- [7. 创建 Vanilla 项目](#7-创建-vanilla-项目)
- [8. 创建 TypeScript 项目](#8-创建-typescript-项目)

<!-- endregion:toc -->

## 1. 本节内容

- 掌握使用 `create-vite` 快速创建项目
- 了解不同框架模板的创建方式
- 理解 TypeScript 项目的创建选项

## 2. 评价

- `create-vite` 是官方推荐的脚手架工具，生成的模板简洁且规范
- 如果需要更完整的项目模板（含路由、状态管理、测试配置），可以考虑 `create-vue`、`create-t3-app` 等框架专用脚手架

## 3. 使用 `create-vite`

- 交互式创建：`npm create vite@latest`（推荐，会引导选择框架和功能）
- 直接指定模板创建：`npm create vite@latest my-app -- --template vue`
- 可用的 template 选项：
  - `vanilla`：纯 JavaScript 项目
  - `vanilla-ts`：纯 TypeScript 项目
  - `vue`：Vue 3 项目
  - `vue-ts`：Vue 3 + TypeScript 项目
  - `react`：React 项目
  - `react-ts`：React + TypeScript 项目
  - `react-swc`：React + SWC（替代 Babel，编译更快）
  - `react-swc-ts`：React + SWC + TypeScript
  - `svelte`：Svelte 项目
  - `svelte-ts`：Svelte + TypeScript 项目
  - `lit`：Lit Web Components 项目
  - `lit-ts`：Lit + TypeScript 项目
  - `preact`：Preact 项目
  - `preact-ts`：Preact + TypeScript 项目
  - `solid`：SolidJS 项目
  - `solid-ts`：SolidJS + TypeScript 项目
  - `qwik`：Qwik 项目
  - `qwik-ts`：Qwik + TypeScript 项目

## 4. 创建 Vue 项目

- 命令：`npm create vite@latest my-vue-app -- --template vue`
- 生成的项目结构简洁，包含最少的文件：
  - `src/main.ts`：应用入口，创建 Vue 实例
  - `src/App.vue`：根组件
  - `src/components/HelloWorld.vue`：示例组件
  - `src/style.css`：全局样式
- 如需更完整的 Vue 项目模板（含 Vue Router、Pinia、Vitest 等），推荐使用 `npm create vue@latest`（由 Vue 团队维护的 `create-vue`）

## 5. 创建 React 项目

- 命令：`npm create vite@latest my-react-app -- --template react`
- 推荐使用 `react-swc` 模板，SWC 比 Babel 编译速度快 20-70 倍
- TypeScript 项目使用 `react-swc-ts` 模板
- 生成的项目使用 JSX 自动转换（无需手动 `import React`）
- 如需更完整的 React 项目模板（含路由、状态管理方案选择），可考虑 `create-t3-app` 或 Next.js

## 6. 创建 Svelte 项目

- 命令：`npm create vite@latest my-svelte-app -- --template svelte`
- Vite 是 Svelte 和 SvelteKit 的默认构建工具
- 生成的项目使用 `.svelte` 单文件组件格式
- 如需完整的 Svelte 应用框架（路由、SSR 等），应使用 `npm create svelte@latest`（SvelteKit）

## 7. 创建 Vanilla 项目

- 命令：`npm create vite@latest my-app -- --template vanilla`
- 最简单的模板，不含任何框架
- 适合学习 Vite 本身、开发轻量页面或实验 ES Modules 特性
- 生成的结构：
  - `index.html`：入口 HTML
  - `main.js`：入口脚本
  - `style.css`：样式文件
  - `public/vite.svg`：Vite logo

## 8. 创建 TypeScript 项目

- 模板名加 `-ts` 后缀即可，如 `vue-ts`、`react-swc-ts`、`svelte-ts`
- TypeScript 模板相比普通模板多了：
  - `tsconfig.json`：TypeScript 编译配置
  - `tsconfig.node.json`：Node.js 环境的 TS 配置（用于 `vite.config.ts`）
  - `.d.ts` 声明文件（如 `env.d.ts`，用于声明 Vite 特有的模块类型）
- Vite 使用 Esbuild 转译 TypeScript，**只做转译不做类型检查**
- 建议在 CI 流水线中加入 `tsc --noEmit` 或框架对应的类型检查命令（如 `vue-tsc --noEmit`）
