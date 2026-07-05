# [0080. Vite 插件基础](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0080.%20Vite%20%E6%8F%92%E4%BB%B6%E5%9F%BA%E7%A1%80)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 插件是什么](#3-插件是什么)
- [4. Vite 插件与 Rollup 插件关系](#4-vite-插件与-rollup-插件关系)
- [5. 插件执行顺序](#5-插件执行顺序)
- [6. 插件适用场景](#6-插件适用场景)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 插件的基本概念
- 理解 Vite 插件与 Rollup 插件的关系
- 掌握插件的执行顺序和适用场景

## 2. 评价

- Vite 的插件系统是其扩展性的核心，理解插件机制有助于正确使用和编写插件
- 大部分场景使用官方或社区插件即可，无需自己编写

## 3. 插件是什么

- 插件是一种扩展 Vite 功能的机制，通过钩子（Hooks）在构建流程的不同阶段插入自定义逻辑
- Vite 插件的格式：

```ts
// 简单的 Vite 插件
function myPlugin() {
  return {
    name: 'my-plugin', // 插件名称（必填）
    // 钩子函数
    transform(code, id) {
      // 在模块转换阶段修改代码
      return code.replace('__VERSION__', '"1.0.0"')
    },
  }
}

export default defineConfig({
  plugins: [myPlugin()],
})
```

- 插件可以做的事情：
  - 转换模块内容（`transform`）
  - 解析模块路径（`resolveId`）
  - 加载模块（`load`）
  - 修改 HTML（`transformIndexHtml`）
  - 配置开发服务器（`configureServer`）
  - 处理构建产物（`generateBundle`）

## 4. Vite 插件与 Rollup 插件关系

- Vite 的插件系统基于 Rollup 的插件接口设计
- 大部分 Rollup 插件可以直接在 Vite 中使用
- Vite 在 Rollup 插件接口的基础上扩展了一些特有的钩子：
  - `transformIndexHtml`：转换 `index.html`
  - `configureServer`：配置 Dev Server
  - `handleHotUpdate`：自定义 HMR 行为
  - `resolveId`（扩展）：支持开发环境的模块解析
- Vite 插件也可以返回 Rollup 插件，实现统一的插件接口：

```ts
function myPlugin() {
  return {
    name: 'my-plugin',
    // Vite 特有钩子
    configureServer(server) {
      /* ... */
    },
    // Rollup 通用钩子
    transform(code, id) {
      /* ... */
    },
    // Rollup 构建钩子
    generateBundle(options, bundle) {
      /* ... */
    },
  }
}
```

## 5. 插件执行顺序

- 插件按照数组顺序执行，但不同钩子的执行时机不同
- 常见钩子的执行顺序：
  1. `config`：解析 Vite 配置
  2. `configResolved`：配置解析完成
  3. `configureServer`：配置 Dev Server
  4. `buildStart`：构建开始
  5. `resolveId` → `load` → `transform`：模块处理链
  6. `buildEnd`：构建结束
  7. `generateBundle` → `writeBundle`：产物输出
- 控制顺序的方式：
  - `enforce: 'pre'`：在核心插件之前执行
  - `enforce: 'post'`：在核心插件之后执行
  - 默认：在核心插件和 `post` 插件之间执行

```ts
plugins: [
  {
    name: 'first',
    enforce: 'pre',
    transform() {
      /* ... */
    },
  },
  {
    name: 'normal',
    transform() {
      /* ... */
    },
  },
  {
    name: 'last',
    enforce: 'post',
    transform() {
      /* ... */
    },
  },
]
```

## 6. 插件适用场景

- 常见的插件使用场景：
  - 框架支持：`@vitejs/plugin-vue`、`@vitejs/plugin-react`
  - SVG 处理：`vite-plugin-svg-icons`、`vite-svg-loader`
  - 自动导入：`unplugin-auto-import`、`unplugin-vue-components`
  - 压缩优化：`vite-plugin-compression`、`vite-plugin-imagemin`
  - Mock 数据：`vite-plugin-mock`
  - 环境检查：`vite-plugin-checker`
  - CDN 引入：`vite-plugin-cdn-import`
  - 路径别名：`vite-tsconfig-paths`
- 选择插件的原则：
  - 优先选择官方插件（`@vitejs/` 前缀）
  - 查看插件的 GitHub Stars、最近更新时间、Issue 数量
  - 注意插件与 Vite 版本的兼容性
