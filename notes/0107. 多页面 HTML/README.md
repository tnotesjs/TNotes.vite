# [0107. 多页面 HTML](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0107.%20%E5%A4%9A%E9%A1%B5%E9%9D%A2%20HTML)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 多入口配置](#3-多入口配置)
- [4. 多 HTML 文件](#4-多-html-文件)
- [5. Rollup input](#5-rollup-input)
- [6. MPA 构建](#6-mpa-构建)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 中多页面 HTML 的配置方式
- 掌握多入口打包和 MPA 构建的配置

## 2. 评价

- 多页面配置是 MPA（多页面应用）的基础
- 通过 `build.rollupOptions.input` 可以轻松实现多入口

## 3. 多入口配置

- 通过 `build.rollupOptions.input` 指定多个 HTML 入口：

```ts
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

## 4. 多 HTML 文件

- 每个入口对应一个独立的 HTML 文件
- HTML 文件可以位于项目根目录或子目录中
- 每个 HTML 文件可以引入不同的 JS 入口：

```html
<!-- index.html -->
<script type="module" src="/src/main.ts"></script>

<!-- admin/index.html -->
<script type="module" src="/src/admin/main.ts"></script>
```

## 5. Rollup input

- `build.rollupOptions.input` 是 Rollup 的多入口配置
- 支持对象形式（指定名称）和数组形式
- 每个入口会生成独立的入口 chunk
- 共享的模块会被自动提取为共享 chunk

## 6. MPA 构建

- MPA 构建的产物结构：

```
dist/
├── index.html
├── admin/
│   └── index.html
├── login.html
└── assets/
    ├── js/
    │   ├── main-[hash].js
    │   ├── admin-[hash].js
    │   └── shared-[hash].js
    └── css/
        └── ...
```

- 每个页面独立加载自己的 JS 和 CSS，互不影响
