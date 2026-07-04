# [0105. Polyfill 策略](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0105.%20Polyfill%20%E7%AD%96%E7%95%A5)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 按需 Polyfill](#3-按需-polyfill)
- [4. 全量 Polyfill](#4-全量-polyfill)
- [5. Runtime Polyfill](#5-runtime-polyfill)
- [6. API Polyfill](#6-api-polyfill)
- [7. 语法降级](#7-语法降级)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Polyfill 的概念和不同策略
- 掌握按需 Polyfill 和全量 Polyfill 的区别
- 理解语法降级与 API Polyfill 的关系

## 2. 评价

- Polyfill 是兼容旧浏览器的关键手段，但会增加产物体积
- 推荐按需 Polyfill，避免全量引入

## 3. 按需 Polyfill

- 只为目标浏览器缺失的 API 添加 Polyfill
- `@vitejs/plugin-legacy` 使用 `core-js` 实现按需 Polyfill：

```ts
legacy({
  targets: ['defaults', 'not IE 11'],
  polyfills: true, // 按需注入
})
```

- 按需策略基于 Browserslist 配置，只为需要的浏览器注入对应的 Polyfill
- 优势：产物体积最小

## 4. 全量 Polyfill

- 引入完整的 Polyfill 包（如 `import 'core-js/stable'`）
- 不推荐：会增加大量不必要的代码（通常 100KB+）
- 仅在无法确定目标浏览器时考虑

## 5. Runtime Polyfill

- 使用 `polyfill.io` 等服务按需加载 Polyfill：

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=Promise,Array.from"></script>
```

- 优势：根据浏览器 User-Agent 按需返回 Polyfill
- 缺点：依赖第三方服务，有隐私和可用性风险

## 6. API Polyfill

- API Polyfill 为浏览器缺失的 API 提供实现（如 `Promise`、`fetch`、`Array.from`）
- 与语法降级不同，API Polyfill 是在运行时添加全局 API
- 常见的 Polyfill 库：
  - `core-js`：最全面的 Polyfill 库
  - `whatwg-fetch`：fetch API 的 Polyfill
  - `abortcontroller-polyfill`：AbortController 的 Polyfill

## 7. 语法降级

- 语法降级将新语法转换为旧语法（由 Babel/SWC/Esbuild 处理）
- 与 API Polyfill 的区别：
  - 语法降级：`const` → `var`，箭头函数 → `function`，`?.` → 条件判断
  - API Polyfill：添加 `Promise`、`Symbol`、`Array.prototype.includes` 等全局 API
- Vite 使用 Esbuild 进行语法降级（通过 `build.target` 配置）
- `@vitejs/plugin-legacy` 同时处理语法降级和 API Polyfill
