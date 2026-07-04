# [0046. 静态资源导入](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0046.%20%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90%E5%AF%BC%E5%85%A5)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 图片导入](#3-图片导入)
- [4. 字体导入](#4-字体导入)
- [5. SVG 导入](#5-svg-导入)
- [6. JSON 导入](#6-json-导入)
- [7. Worker 文件导入](#7-worker-文件导入)
- [8. WASM 导入](#8-wasm-导入)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 中各种静态资源的导入方式
- 掌握图片、字体、SVG、JSON、Worker、WASM 等资源的处理方式
- 理解 Vite 的资源内联和 URL 处理机制

## 2. 评价

- Vite 对静态资源的处理非常完善，支持开箱即用的 ESM 导入
- 不同于 Webpack 需要各种 Loader，Vite 原生支持大部分资源类型

## 3. 图片导入

- 直接使用 ESM `import` 导入图片：

```ts
import logoUrl from './logo.png'
// logoUrl 为带哈希的 URL 字符串，如 '/assets/logo-abc123.png'

document.getElementById('logo').src = logoUrl
```

- CSS 中的 `url()` 引用会自动处理：

```css
.logo {
  background: url('./logo.png');
}
```

- HTML 中的 `src` 属性同样自动处理：

```html
<img src="./logo.png" />
```

- 支持的图片格式：`.png`、`.jpg`、`.jpeg`、`.gif`、`.svg`、`.webp`、`.avif`、`.ico`

## 4. 字体导入

- 字体文件可以通过 `import` 或 CSS `@font-face` 引入：

```ts
import fontUrl from './font.woff2'
```

```css
@font-face {
  font-family: 'MyFont';
  src: url('./font.woff2') format('woff2');
}
```

- 支持的字体格式：`.woff`、`.woff2`、`.eot`、`.ttf`、`.otf`
- 小于 `assetsInlineLimit`（默认 4KB）的字体会被 Base64 内联

## 5. SVG 导入

- SVG 可以作为图片 URL 导入：

```ts
import svgUrl from './icon.svg'
// svgUrl 为带哈希的 URL 字符串
```

- 也可以作为纯文本导入（使用 `?raw` 后缀）：

```ts
import svgContent from './icon.svg?raw'
// svgContent 为 SVG 的 XML 字符串
```

- SVG 组件化（需要插件支持，如 `vite-plugin-svg-icons`）
- 更多 SVG 处理方式见下一节「0050. SVG 处理」

## 6. JSON 导入

- JSON 文件可以直接通过 `import` 导入：

```ts
import config from './config.json'
console.log(config.name)
```

- 支持具名导入（`json.namedExports` 默认开启）：

```ts
import { name, version } from './package.json'
```

- 也可以使用 `import type` 只导入类型：

```ts
import type { Config } from './config.json'
```

## 7. Worker 文件导入

- 使用 `?worker` 后缀将文件作为 Web Worker 导入：

```ts
import Worker from './worker.js?worker'

const worker = new Worker()
worker.postMessage('hello')
```

- Vite 会在构建时自动处理 Worker 的打包和内联
- 也支持 `new Worker(new URL('./worker.js', import.meta.url))` 的原生语法
- SharedWorker 使用 `?sharedworker` 后缀

## 8. WASM 导入

- Vite 支持直接导入 WebAssembly 模块：

```ts
import init from './module.wasm'

const { exports } = await init()
```

- 也可以使用原生的 `WebAssembly.instantiateStreaming` API
- WASM 文件会被复制到输出目录并返回 URL
