# [0028. 源码转换机制](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0028.%20%E6%BA%90%E7%A0%81%E8%BD%AC%E6%8D%A2%E6%9C%BA%E5%88%B6)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. TypeScript 转换](#3-typescript-转换)
- [4. JSX / TSX 转换](#4-jsx--tsx-转换)
- [5. CSS 转换](#5-css-转换)
- [6. 静态资源转换](#6-静态资源转换)
- [7. Vue / React / Svelte 单文件组件转换](#7-vue--react--svelte-单文件组件转换)
  - [7.1. Vue SFC（`.vue` 文件）](#71-vue-sfcvue-文件)
  - [7.2. React / JSX](#72-react--jsx)
  - [7.3. Svelte（`.svelte` 文件）](#73-sveltesvelte-文件)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 在开发阶段如何转换不同类型的源码
- 理解 TypeScript、JSX、CSS、静态资源等的转换机制
- 掌握框架单文件组件（SFC）的编译流程

## 2. 评价

- 源码转换是 Vite 作为"中间层"的核心能力，理解它有助于排查编译报错
- Vite 借助 Oxc 转换器处理大部分转译工作，速度远快于传统工具链

## 3. TypeScript 转换

- Vite 使用 Oxc 转换器转译 TypeScript，而非 `tsc`
- 速度对比：Oxc 转换器转译 TS 的速度极快
- 关键特性：
  - 只做语法转译，不做类型检查：Oxc 转换器将 TS 语法剥离为纯 JS，但不执行类型检查
  - 支持 `.ts`、`.tsx`、`.mts`（ESM TypeScript）文件
  - 支持 `tsconfig.json` 中的 `paths` 别名解析
- 注意事项：
  - TypeScript 的 `enum`、`namespace` 等需要类型信息的特性可能在某些场景下有兼容问题
  - `const enum` 需要在 `tsconfig.json` 中开启 `isolatedModules: true` 才能正确处理
  - Decorator 语法需要配合 `tsconfig.json` 中的 `experimentalDecorators` 选项

## 4. JSX / TSX 转换

- Vite 内置了 JSX 转换支持，由 Oxc 转换器执行
- Vue 项目中 JSX 由 `@vitejs/plugin-vue` 的 JSX 插件处理
- React 项目中 JSX 使用 React 17+ 的自动导入模式（`react/jsx-runtime`），无需手动 `import React`
- 转换配置在 `tsconfig.json` / `jsx` 选项中指定：
  - `"jsx": "react-jsx"`：React 自动导入模式（推荐）
  - `"jsx": "preserve"`：保留 JSX 语法（交给 Vite 插件处理）
  - `"jsx": "react"`：经典模式，需要 `import React from 'react'`
- `.jsx` 和 `.tsx` 文件都可以直接被 Vite 识别和处理

## 5. CSS 转换

- Vite 内置了对多种 CSS 语法的支持：
  - 原生 CSS：直接加载，无需任何配置
  - CSS Modules：以 `.module.css` 为后缀的文件自动启用 CSS Modules
  - CSS 预处理器：自动检测 `sass`、`less`、`stylus` 等依赖，安装即可使用，无需额外配置
  - PostCSS：项目根目录有 `postcss.config.js` 时自动启用
  - CSS 嵌套：原生 CSS 嵌套语法自动转换为兼容语法
- CSS Modules 示例：

```ts
// 自动识别为 CSS Modules
import styles from './App.module.css'
document.getElementById('app')!.className = styles.container
```

- 开发阶段 CSS 通过 `<style>` 标签注入页面（便于 HMR），生产构建时提取为独立 CSS 文件

## 6. 静态资源转换

- Vite 对静态资源有完善的处理机制：
  - ESM 导入：`import imgUrl from './img.png'` 返回资源的 URL（带哈希）
  - URL 引用：CSS 中的 `url()` 和 HTML 中的 `src` 自动处理
  - 小资源内联：小于 4KB 的资源会被 Base64 内联，减少 HTTP 请求
  - 大资源处理：大于 4KB 的资源被复制到输出目录，返回带哈希的文件名
- 支持的资源类型：
  - 图片：`.png`、`.jpg`、`.jpeg`、`.gif`、`.svg`、`.webp`、`.avif`
  - 字体：`.woff`、`.woff2`、`.eot`、`.ttf`、`.otf`
  - 媒体：`.mp4`、`.webm`、`.ogg`、`.mp3`、`.wav`
  - 其他：`.pdf`、`.wasm`
- 特殊后缀控制：
  - `?url`：显式获取资源的 URL
  - `?raw`：获取资源的原始字符串内容
  - `?worker`：作为 Web Worker 加载

## 7. Vue / React / Svelte 单文件组件转换

### 7.1. Vue SFC（`.vue` 文件）

由 `@vitejs/plugin-vue` 处理。编译流程为 Vue Compiler 将 `.vue` 文件拆分为 template、script、style 三部分，template 编译为渲染函数，script 转换为 ES 模块，style 提取为 CSS。支持 `<script setup>`、`<style scoped>`、`<style module>` 等语法。

### 7.2. React / JSX

JSX 由 Oxc 转换器内置处理（或通过 SWC 加速），`@vitejs/plugin-react` 提供 Fast Refresh（类似 HMR 的 React 专用方案），支持 `.jsx`、`.tsx` 文件。

### 7.3. Svelte（`.svelte` 文件）

由 `@sveltejs/vite-plugin-svelte` 处理。Svelte Compiler 将 `.svelte` 文件编译为高效的原生 JS 操作，属于编译时框架，产物体积小。

所有框架插件都遵循 Vite 的插件接口，统一了开发和构建的行为。
