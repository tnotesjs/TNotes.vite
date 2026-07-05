# [0103. Browserslist](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0103.%20Browserslist)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Browserslist 作用](#3-browserslist-作用)
- [4. 与 Babel 的关系](#4-与-babel-的关系)
- [5. 与 PostCSS 的关系](#5-与-postcss-的关系)
- [6. 与 Vite 的关系](#6-与-vite-的关系)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Browserslist 的作用和配置方式
- 理解 Browserslist 与 Babel、PostCSS、Vite 的关系
- 掌握在 Vite 项目中配置 Browserslist 的方式

## 2. 评价

- Browserslist 是前端工具链中统一浏览器目标的标准方案
- Vite 本身不直接使用 Browserslist，但相关工具（Babel、PostCSS、Autoprefixer）会读取它

## 3. Browserslist 作用

- Browserslist 用于定义项目需要支持的浏览器范围
- 配置方式（在 `package.json` 中）：

```json
{
  "browserslist": ["> 1%", "last 2 versions", "not dead", "not ie 11"]
}
```

- 也可以在项目根目录创建 `.browserslistrc` 文件
- 查询语法：
  - `> 1%`：全球市场份额超过 1% 的浏览器
  - `last 2 versions`：每个浏览器的最近 2 个版本
  - `not dead`：排除已停止维护的浏览器
  - `not ie 11`：排除 IE 11
  - `defaults`：等价于 `> 0.5%, last 2 versions, Firefox ESR, not dead`

## 4. 与 Babel 的关系

- Babel 使用 Browserslist 决定需要转译哪些语法特性
- 如果目标浏览器支持箭头函数，Babel 就不会将箭头函数转为 `function` 表达式
- `@vitejs/plugin-react`（Babel 模式）会读取 Browserslist 配置

## 5. 与 PostCSS 的关系

- Autoprefixer 使用 Browserslist 决定需要添加哪些 CSS 前缀
- postcss-preset-env 使用 Browserslist 决定需要转换哪些 CSS 特性
- 示例：如果目标浏览器都支持 CSS Grid，Autoprefixer 就不会添加 Grid 前缀

## 6. 与 Vite 的关系

- Vite 本身不直接读取 Browserslist 配置
- Vite 使用 `build.target` 来控制 JavaScript 的构建目标
- 但是 Vite 生态中的工具会读取 Browserslist：
  - `@vitejs/plugin-react`（Babel 模式）
  - Autoprefixer
  - postcss-preset-env
  - `@vitejs/plugin-legacy`（读取 Browserslist 决定 Polyfill 范围）
- 建议在 `package.json` 中同时配置 `browserslist` 和 Vite 的 `build.target`，保持一致
