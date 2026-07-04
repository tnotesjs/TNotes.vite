# [0047. URL 处理](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0047.%20URL%20%E5%A4%84%E7%90%86)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `new URL(..., import.meta.url)`](#3-new-url-importmetaurl)
- [4. `?url`](#4-url)
- [5. `?raw`](#5-raw)
- [6. `?inline`](#6-inline)
- [7. `?worker`](#7-worker)
- [8. `?sharedworker`](#8-sharedworker)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 中 URL 相关的处理机制
- 掌握 `new URL()` 语法和资源查询后缀的用法
- 理解 `?url`、`?raw`、`?inline`、`?worker` 等后缀的作用

## 2. 评价

- 资源查询后缀是 Vite 的一大特色，提供了灵活的资源导入方式
- `new URL(..., import.meta.url)` 是构建动态资源 URL 的推荐方式

## 3. `new URL(..., import.meta.url)`

- Vite 支持使用 `new URL()` 构造函数来获取资源的完整 URL
- 语法：`new URL('相对路径', import.meta.url)`
- 这是浏览器原生 API，Vite 在构建时会对其进行处理

```ts
const imgUrl = new URL('./img.png', import.meta.url).href
// 开发环境：'http://localhost:5173/src/img.png'
// 生产环境：'/assets/img-abc123.png'
```

- 典型用途：动态拼接资源路径

```ts
function getImageUrl(name: string) {
  return new URL(`./assets/${name}.png`, import.meta.url).href
}
```

- 注意：路径必须是静态可分析的，不能使用完全动态的变量

## 4. `?url`

- 使用 `?url` 后缀获取资源的 URL 字符串（不解析资源内容）

```ts
import workerUrl from './worker.js?url'
// workerUrl 为文件的最终 URL 字符串

const worker = new Worker(workerUrl)
```

- 典型用途：需要手动创建 Worker、音频、视频等需要 URL 的场景
- 与直接 `import` 的区别：`import` 会解析模块内容，`?url` 只返回路径

## 5. `?raw`

- 使用 `?raw` 后缀以字符串形式导入资源的原始内容

```ts
import svgString from './icon.svg?raw'
document.getElementById('app').innerHTML = svgString

import shaderCode from './shader.glsl?raw'
const shader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(shader, shaderCode)
```

- 典型用途：SVG 内联、GLSL 着色器、文本模板等
- 构建时资源内容会被内联为字符串常量

## 6. `?inline`

- 使用 `?inline` 后缀将资源以 Base64 Data URL 的形式内联

```ts
import imgUrl from './small-image.png?inline'
// imgUrl 为 'data:image/png;base64,...'
```

- 典型用途：确保小资源被内联（不受 `assetsInlineLimit` 限制）
- 适用于需要将资源打包进 JS 文件的场景（如离线页面）

## 7. `?worker`

- 使用 `?worker` 后缀将文件作为 Web Worker 导入

```ts
import MyWorker from './worker?worker'

const worker = new MyWorker()
worker.onmessage = (e) => console.log(e.data)
```

- Vite 会在构建时自动打包 Worker 代码
- 可以通过 `?worker&inline` 将 Worker 代码内联为 Blob URL

## 8. `?sharedworker`

- 使用 `?sharedworker` 后缀将文件作为 SharedWorker 导入

```ts
import SharedWorker from './shared-worker?sharedworker'

const worker = new SharedWorker()
worker.port.onmessage = (e) => console.log(e.data)
```

- SharedWorker 可以被多个页面共享，适用于跨标签页通信等场景

- todo
