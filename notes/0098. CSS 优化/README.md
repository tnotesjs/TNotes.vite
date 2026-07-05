# [0098. CSS 优化](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0098.%20CSS%20%E4%BC%98%E5%8C%96)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. CSS 代码分割](#3-css-代码分割)
- [4. CSS 压缩](#4-css-压缩)
- [5. 关键 CSS](#5-关键-css)
- [6. 异步 CSS](#6-异步-css)
- [7. 移除未使用 CSS](#7-移除未使用-css)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 生产构建中的 CSS 优化策略
- 掌握 CSS 代码分割、压缩、关键 CSS 提取和未使用 CSS 移除

## 2. 评价

- Vite 内置了大部分 CSS 优化能力，开箱即用
- 关键 CSS 提取和未使用 CSS 移除需要额外插件，按需使用

## 3. CSS 代码分割

- Vite 自动进行 CSS 代码分割：
  - 每个组件/模块导入的 CSS 提取为独立文件
  - 动态导入的组件，其 CSS 按需加载
  - 共享的 CSS 提取为公共 CSS 文件
- 效果：首屏只加载当前路由需要的 CSS，减少初始 CSS 体积

## 4. CSS 压缩

- Vite 默认使用 Lightning CSS（Rust 实现）压缩 CSS（`build.cssMinify` 默认为 `'lightningcss'`）
- 压缩操作：移除空白、合并规则、缩短颜色值、优化选择器
- 可切换 CSS 处理引擎（`css.transformer`，实验性，默认为 `'postcss'`）：

```ts
export default defineConfig({
  css: {
    transformer: 'lightningcss', // 或 'postcss'（默认）
  },
})
```

## 5. 关键 CSS

- 关键 CSS（Critical CSS）是指首屏渲染所需的最小 CSS 集合
- 使用 `vite-plugin-critical` 提取关键 CSS：

```bash
npm install -D vite-plugin-critical
```

```ts
import critical from 'vite-plugin-critical'

export default defineConfig({
  plugins: [
    critical({
      criticalBase: 'dist/',
      criticalPages: [{ uri: '/', template: 'index' }],
    }),
  ],
})
```

- 效果：关键 CSS 内联到 HTML 的 `<head>` 中，非关键 CSS 异步加载
- 优势：减少首次渲染的阻塞时间（FCP）

## 6. 异步 CSS

- 非关键 CSS 可以通过 `<link rel="preload">` 异步加载：

```html
<link
  rel="preload"
  href="/assets/styles/non-critical.css"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
```

- Vite 的代码分割已经实现了 CSS 的按需加载，通常不需要额外配置
- 如果需要更精细的控制，可以使用 `vite-plugin-critical` 自动处理

## 7. 移除未使用 CSS

- 使用 `purgecss` 或 Tailwind CSS 的内置功能移除未使用的 CSS
- Tailwind CSS 内置了按需生成（见 055 节），无需额外配置
- 通用方案（使用 `@fullhuman/postcss-purgecss`）：

```js
// postcss.config.js
import purgecss from '@fullhuman/postcss-purgecss'

export default {
  plugins: [
    ...(process.env.NODE_ENV === 'production'
      ? [
          purgecss({
            content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
          }),
        ]
      : []),
  ],
}
```

- 注意：动态生成的类名（如 `class={\`btn-${type}\`}`）可能被误删，需要配置 safelist
