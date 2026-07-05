# [0109. HTML 资源优化](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0109.%20HTML%20%E8%B5%84%E6%BA%90%E4%BC%98%E5%8C%96)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. preload](#3-preload)
- [4. modulepreload](#4-modulepreload)
- [5. favicon](#5-favicon)
- [6. meta 信息](#6-meta-信息)
- [7. CDN 资源](#7-cdn-资源)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 HTML 层面的资源加载优化策略
- 掌握 preload、modulepreload 的使用方式
- 了解 meta 信息和 CDN 资源的配置

## 2. 评价

- HTML 是浏览器解析的第一个文件，优化 HTML 中的资源加载顺序可以提升首屏速度
- Vite 已自动处理了大部分优化（如 modulepreload），了解原理即可

## 3. preload

- `<link rel="preload">` 提前加载关键资源：

```html
<link rel="preload" href="/assets/font.woff2" as="font" crossorigin />
<link rel="preload" href="/assets/hero.webp" as="image" />
```

- 适用场景：
  - 关键字体文件（避免 FOIT - Flash of Invisible Text）
  - 首屏关键图片
  - 关键 CSS 文件
- Vite 会自动为关键 chunk 添加 preload 提示

## 4. modulepreload

- `<link rel="modulepreload">` 预加载 ES 模块：

```html
<link rel="modulepreload" href="/assets/index-[hash].js" />
```

- 与普通 preload 的区别：modulepreload 会预解析和预编译模块
- Vite 自动为入口 chunk 的依赖添加 modulepreload
- 浏览器支持：Chrome 66+、Edge 79+、Safari 16.4+（Vite 默认启用 modulepreload polyfill 为不支持的浏览器提供兼容）

## 5. favicon

- 确保 favicon 位于 `public/` 目录：

```html
<link rel="icon" href="/favicon.ico" />
```

- 支持多种格式和尺寸：

```html
<link rel="icon" type="image/svg+xml" href="/icon.svg" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

## 6. meta 信息

- 推荐的 meta 标签配置：

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="%VITE_APP_DESCRIPTION%" />
<meta name="theme-color" content="#1890ff" />
```

- 使用环境变量动态设置 meta 内容

## 7. CDN 资源

- 将大型第三方库通过 CDN 引入，减少构建产物体积：

```html
<script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"></script>
```

- 使用 `vite-plugin-cdn-import` 自动处理：

```ts
import importToCDN from 'vite-plugin-cdn-import'

export default defineConfig({
  plugins: [
    importToCDN({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: 'https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js',
        },
      ],
    }),
  ],
})
```

- 注意：CDN 引入的库不会被 Tree Shaking，需要确保体积收益大于损失
