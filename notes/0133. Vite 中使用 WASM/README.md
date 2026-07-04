# [0133. Vite 中使用 WASM](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0133.%20Vite%20%E4%B8%AD%E4%BD%BF%E7%94%A8%20WASM)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 导入 `.wasm`](#3-导入-wasm)
- [4. 异步初始化](#4-异步初始化)
- [5. WASM 打包](#5-wasm-打包)
- [6. WASM 文件部署](#6-wasm-文件部署)

<!-- endregion:toc -->

## 1. 本节内容

- 了解在 Vite 中导入和使用 WASM 的方式
- 掌握 WASM 的异步初始化和打包配置

## 2. 评价

- Vite 对 WASM 有原生支持，但使用方式仍在演进中
- 推荐使用 `vite-plugin-wasm` 插件获得更好的开发体验

## 3. 导入 `.wasm`

- Vite 支持直接导入 `.wasm` 文件：

```ts
import init from './module.wasm'

const { exports } = await init()
const result = exports.add(1, 2)
```

- 也可以使用 `?url` 获取 WASM 文件的 URL：

```ts
import wasmUrl from './module.wasm?url'

const { instance } = await WebAssembly.instantiateStreaming(fetch(wasmUrl))
```

## 4. 异步初始化

- WASM 模块必须异步初始化（`WebAssembly.instantiate` 是异步的）：

```ts
async function initWasm() {
  const { instance } = await WebAssembly.instantiateStreaming(
    fetch('/module.wasm'),
  )
  return instance.exports
}

const wasm = await initWasm()
```

- 某些 WASM 工具链（如 `wasm-pack`）会生成带 `init()` 函数的 JS 包装器

## 5. WASM 打包

- Vite 在构建时会将 `.wasm` 文件复制到输出目录
- 使用 `vite-plugin-wasm` 可以将 WASM 内联为 Base64：

```bash
npm install -D vite-plugin-wasm
```

```ts
import wasm from 'vite-plugin-wasm'

export default defineConfig({
  plugins: [wasm()],
})
```

## 6. WASM 文件部署

- WASM 文件需要与 JS 产物一起部署
- 确保服务器正确配置 WASM 文件的 MIME 类型（`application/wasm`）
- Nginx 配置：

```nginx
types {
  application/wasm wasm;
}
```
