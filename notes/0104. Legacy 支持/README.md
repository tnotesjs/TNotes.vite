# [0104. Legacy 支持](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0104.%20Legacy%20%E6%94%AF%E6%8C%81)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `@vitejs/plugin-legacy`](#3-vitejsplugin-legacy)
- [4. 旧浏览器兼容](#4-旧浏览器兼容)
- [5. Polyfill](#5-polyfill)
- [6. SystemJS](#6-systemjs)
- [7. 现代产物与旧版产物](#7-现代产物与旧版产物)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 `@vitejs/plugin-legacy` 的功能和工作原理
- 掌握为旧版浏览器生成兼容产物的配置方式
- 理解 Polyfill 和 SystemJS 的作用

## 2. 评价

- Legacy 支持是为少数旧浏览器用户提供兼容的"兜底"方案
- 会显著增加构建产物体积，只在确实需要兼容旧浏览器时才启用

## 3. `@vitejs/plugin-legacy`

- Vite 官方的旧浏览器兼容插件

```bash
npm install -D @vitejs/plugin-legacy
```

```ts
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
})
```

- 功能：
  - 生成 ES5 语法的 Legacy chunk
  - 自动注入必要的 Polyfill
  - 使用 `<script nomodule>` 实现渐进式加载

## 4. 旧浏览器兼容

- Legacy 插件的工作方式：
  1. 先正常构建现代浏览器的产物（ESM 格式）
  2. 再构建一份 ES5 语法的 Legacy 产物
  3. 在 HTML 中同时注入两套 `<script>` 标签
- 浏览器加载策略：
  - 现代浏览器：加载 `<script type="module">`（现代产物），忽略 `<script nomodule>`
  - 旧浏览器：不识别 `type="module"`，加载 `<script nomodule>`（Legacy 产物）

## 5. Polyfill

- Legacy 插件使用 `core-js` 自动注入 Polyfill
- Polyfill 为旧浏览器提供缺失的 API（如 `Promise`、`Array.from`、`fetch` 等）
- 配置 Polyfill 范围：

```ts
legacy({
  targets: ['defaults', 'not IE 11'],
  // 按需注入（默认）
  polyfills: true,
  // 或手动指定
  // polyfills: ['es.promise.finally', 'es.array.from'],
})
```

- Polyfill 会增加产物体积，应尽量缩小目标范围

## 6. SystemJS

- Legacy 插件使用 SystemJS 作为旧浏览器的模块加载器
- 旧浏览器不支持 ESM（`import`/`export`），SystemJS 提供了兼容的模块加载能力
- SystemJS 的体积约 10KB gzipped，是 Legacy 产物的额外开销
- Legacy 产物的格式：SystemJS 模块（`System.register`）

## 7. 现代产物与旧版产物

- 启用 Legacy 插件后，构建产物结构：

```
dist/
├── assets/
│   ├── index-[hash].js          # 现代产物（ESM）
│   ├── index-legacy-[hash].js   # Legacy 产物（SystemJS）
│   ├── polyfills-[hash].js      # Polyfill
│   └── ...
└── index.html                   # 包含两套 script 标签
```

- `index.html` 中的注入：

```html
<!-- 现代浏览器加载 -->
<script type="module" src="/assets/index-[hash].js"></script>
<!-- 旧浏览器加载（现代浏览器会忽略 nomodule） -->
<script nomodule src="/assets/polyfills-[hash].js"></script>
<script nomodule src="/assets/index-legacy-[hash].js"></script>
```

- 注意：Legacy 产物的体积通常比现代产物大 2-3 倍（ES5 降级 + Polyfill + SystemJS）
