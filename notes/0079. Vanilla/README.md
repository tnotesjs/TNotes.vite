# [0079. Vanilla](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0079.%20Vanilla)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 原生 JS 项目](#3-原生-js-项目)
- [4. 原生 TS 项目](#4-原生-ts-项目)
- [5. 多页面应用](#5-多页面应用)

<!-- endregion:toc -->

## 1. 本节内容

- 了解如何使用 Vite 创建纯 JavaScript/TypeScript 项目
- 掌握无框架的原生开发方式
- 理解 Vite 多页面应用（MPA）的配置

## 2. 评价

- Vanilla 项目是学习 Vite 本身和 ES Modules 的最佳方式
- 适合轻量级页面、实验性项目、库的开发
- Vite 的强大之处在于它不要求你使用任何框架

## 3. 原生 JS 项目

- 创建方式：

```bash
npm create vite@latest my-app -- --template vanilla
```

- 生成的结构极简：

```
my-app/
├── index.html          # 入口 HTML
├── main.js             # 入口脚本
├── style.css           # 样式
├── javascript.svg      # 图标
├── public/
│   └── vite.svg
├── package.json
└── vite.config.js
```

- `main.js` 中可以直接使用 ESM 的 `import`/`export`
- 支持所有 Vite 特性：HMR、TypeScript、CSS Modules 等

## 4. 原生 TS 项目

- 创建方式：

```bash
npm create vite@latest my-app -- --template vanilla-ts
```

- 与 JS 模板的区别：
  - `main.ts` 替代 `main.js`
  - 多了 `tsconfig.json` 配置
  - 可以使用 TypeScript 的所有特性
- 适合不需要框架但需要类型安全的项目（如工具库、数据可视化）

## 5. 多页面应用

- Vite 支持多页面应用（MPA）配置：

```ts
// vite.config.ts
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
        login: resolve(__dirname, 'login.html'),
      },
    },
  },
})
```

- 每个入口对应一个独立的 HTML 文件
- 构建时每个入口生成独立的 chunk，互不影响
- 适用场景：
  - 多个独立页面共享部分代码
  - 后台管理系统的多个入口
  - 从传统多页面项目迁移到 Vite
