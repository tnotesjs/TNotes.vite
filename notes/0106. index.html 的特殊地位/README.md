# [0106. index.html 的特殊地位](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0106.%20index.html%20%E7%9A%84%E7%89%B9%E6%AE%8A%E5%9C%B0%E4%BD%8D)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Vite 以 HTML 作为入口](#3-vite-以-html-作为入口)
- [4. HTML 中引入模块](#4-html-中引入模块)
- [5. HTML 模板变量](#5-html-模板变量)

<!-- endregion:toc -->

## 1. 本节内容

- 理解 `index.html` 在 Vite 项目中的特殊地位
- 了解 Vite 以 HTML 作为入口的设计理念
- 掌握 HTML 中引入模块和模板变量的用法

## 2. 评价

- `index.html` 位于项目根目录是 Vite 与 Webpack 最显著的结构差异之一
- 理解这一点有助于正确组织项目结构

## 3. Vite 以 HTML 作为入口

- Vite 以 `index.html` 作为应用的入口文件，而非 JavaScript 文件
- 与 Webpack 的区别：
  - Webpack：入口是 JS 文件（`entry: './src/main.js'`），HTML 由插件生成
  - Vite：入口是 HTML 文件，JS 通过 `<script type="module">` 引入
- 优势：
  - 更接近浏览器的原生加载方式
  - HTML 中可以直接看到应用的资源结构
  - 开发服务器直接服务于 HTML 文件

## 4. HTML 中引入模块

- 通过 `<script type="module">` 引入 JS 入口：

```html
<script type="module" src="/src/main.ts"></script>
```

- Vite 会拦截这个请求，转译 TypeScript 后返回给浏览器
- 也支持内联模块：

```html
<script type="module">
  import { createApp } from '/src/main.ts'
  createApp()
</script>
```

- CSS 可以通过 `<link>` 引入或在 JS 中 `import`

## 5. HTML 模板变量

- Vite 支持在 HTML 中使用环境变量（通过 `%ENV_VARIABLE%` 语法）：

```html
<title>%VITE_APP_TITLE%</title>
<meta name="description" content="%VITE_APP_DESCRIPTION%" />
```

- `import.meta.env` 中的任何属性都可以通过 `%CONST_NAME%` 语法在 HTML 中使用，包括内置常量如 `%MODE%`、`%BASE_URL%`、`%DEV%`、`%PROD%`、`%SSR%`
- 也可以使用 `%BASE_URL%` 获取基础路径

```html
<link rel="icon" href="%BASE_URL%favicon.ico" />
```

- 注意：HTML 模板变量在构建时被替换，不是运行时替换
