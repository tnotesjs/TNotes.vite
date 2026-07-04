# [0081. 常用官方插件](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0081.%20%E5%B8%B8%E7%94%A8%E5%AE%98%E6%96%B9%E6%8F%92%E4%BB%B6)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Vue 插件](#3-vue-插件)
- [4. React 插件](#4-react-插件)
- [5. Legacy 插件](#5-legacy-插件)
- [6. SSR 相关插件](#6-ssr-相关插件)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 官方维护的常用插件
- 掌握各官方插件的用途和基本配置方式

## 2. 评价

- 官方插件质量最高、兼容性最好，应优先选择
- `@vitejs/plugin-vue` 和 `@vitejs/plugin-react` 是对应框架项目的必备插件

## 3. Vue 插件

- **`@vitejs/plugin-vue`**：Vue 3 SFC 编译和 HMR 支持（必备）
- **`@vitejs/plugin-vue-jsx`**：Vue 项目中的 JSX/TSX 支持（可选）
- 详见 0064 节「Vue 插件」

## 4. React 插件

- **`@vitejs/plugin-react`**：基于 Babel 的 React JSX 编译和 Fast Refresh
- **`@vitejs/plugin-react-swc`**：基于 SWC 的 React 插件，编译速度更快（推荐）
- 详见 0070 节「React 插件」

## 5. Legacy 插件

- **`@vitejs/plugin-legacy`**：为旧版浏览器提供兼容性支持
- 功能：
  - 自动生成对应的 Legacy chunk（ES5 语法）
  - 自动注入 Polyfill（core-js）
  - 使用 `<script nomodule>` 实现渐进式加载
- 安装和使用：

```ts
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'], // 浏览器兼容目标
    }),
  ],
})
```

- 适用场景：需要兼容不支持 ESM 的旧版浏览器
- 注意：会增加构建产物体积，现代浏览器不需要此插件

## 6. SSR 相关插件

- Vite 的 SSR 支持主要通过内置 API 实现，而非独立插件
- 相关能力：
  - `vite build --ssr`：构建 SSR 产物
  - `createViteServer({ ssr: true })`：创建 SSR 开发服务器
  - `ssrLoadModule()`：在服务端加载模块
- 推荐使用 Nuxt（Vue）或 Next.js（React）等框架处理 SSR 复杂性
