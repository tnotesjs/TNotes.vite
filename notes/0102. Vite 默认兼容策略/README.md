# [0102. Vite 默认兼容策略](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0102.%20Vite%20%E9%BB%98%E8%AE%A4%E5%85%BC%E5%AE%B9%E7%AD%96%E7%95%A5)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 现代浏览器优先](#3-现代浏览器优先)
- [4. ESM 支持要求](#4-esm-支持要求)
- [5. 构建目标配置](#5-构建目标配置)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 的默认浏览器兼容策略
- 理解 Vite 为什么以现代浏览器为目标
- 掌握如何调整兼容策略

## 2. 评价

- Vite 的"现代浏览器优先"策略是其性能优势的基础
- 如果需要兼容旧浏览器，应使用 `@vitejs/plugin-legacy` 而非降低 `build.target`

## 3. 现代浏览器优先

- Vite 默认只支持现代浏览器（支持 ESM 的浏览器）
- 默认的构建目标大约对应：
  - Chrome 111+
  - Firefox 114+
  - Safari 16.4+
  - Edge 111+
- 为什么不支持旧浏览器？
  - 开发阶段依赖浏览器原生 ESM 加载模块，旧浏览器不支持
  - 以现代浏览器为目标可以保留更多原生语法，产物更小、性能更好
  - 旧浏览器的兼容成本很高，不应影响大多数用户的体验

## 4. ESM 支持要求

- Vite 的开发服务器完全依赖浏览器的 ESM（`<script type="module">`）能力
- 不支持 ESM 的浏览器无法使用 Vite 的开发服务器
- 生产构建可以通过 `@vitejs/plugin-legacy` 为旧浏览器生成兼容产物
- ESM 支持的浏览器覆盖率：全球约 95%+ 的浏览器

## 5. 构建目标配置

- 通过 `build.target` 调整构建目标：

```ts
export default defineConfig({
  build: {
    target: 'es2020', // 或 'es2018'、'esnext' 等
  },
})
```

- 注意：降低 `build.target` 不等于支持旧浏览器，因为开发服务器仍然需要 ESM
- 正确的旧浏览器支持方案：`build.target` + `@vitejs/plugin-legacy`
- 详见 0093 节「构建目标」和 0104 节「Legacy 支持」
