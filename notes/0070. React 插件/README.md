# [0070. React 插件](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0070.%20React%20%E6%8F%92%E4%BB%B6)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `@vitejs/plugin-react`](#3-vitejsplugin-react)
- [4. `@vitejs/plugin-react-swc`](#4-vitejsplugin-react-swc)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 React 项目在 Vite 中使用的核心插件
- 掌握 `@vitejs/plugin-react` 和 `@vitejs/plugin-react-swc` 的配置和区别
- 理解 Fast Refresh 的工作原理

## 2. 评价

- 两个插件二选一即可，功能等价，区别在于编译器（Babel vs SWC）
- 新项目推荐 `@vitejs/plugin-react-swc`，编译速度更快

## 3. `@vitejs/plugin-react`

- React 的 Vite 官方插件，基于 Babel 实现
- 负责：
  - JSX/TSX 语法转译
  - React Fast Refresh（热更新）
  - 自动注入 React 导入（React 17+ JSX Transform）

```bash
npm install -D @vitejs/plugin-react
```

```ts
// vite.config.ts
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- 常用选项：

```ts
react({
  // 自动导入 React（默认 true，React 17+ 不需要手动 import）
  jsxRuntime: 'automatic',
  // Babel 插件
  babel: {
    plugins: ['babel-plugin-styled-components'],
  },
})
```

- 适用场景：需要自定义 Babel 插件的项目（如某些 CSS-in-JS 库需要 Babel 插件）

## 4. `@vitejs/plugin-react-swc`

- 基于 SWC（Rust 实现）的 React 插件，功能与 `@vitejs/plugin-react` 等价
- 优势：编译速度比 Babel 快 20-70 倍

```bash
npm install -D @vitejs/plugin-react-swc
```

```ts
// vite.config.ts
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
})
```

- 常用选项：

```ts
react({
  // 启用装饰器支持（实验性）
  tsDecorators: true,
})
```

- 两个插件的对比：

| 特性          | `plugin-react`（Babel） | `plugin-react-swc`（SWC） |
| ------------- | ----------------------- | ------------------------- |
| 编译速度      | 较慢                    | 极快（Rust 实现）         |
| Fast Refresh  | ✅                      | ✅                        |
| JSX Transform | ✅                      | ✅                        |
| Babel 插件    | ✅ 支持                 | ❌ 不支持                 |
| 装饰器        | 需要 Babel 插件         | 内置支持                  |
| 推荐度        | 需要 Babel 生态时使用   | 默认推荐                  |

- Fast Refresh 原理：
  1. 监听组件文件变化
  2. 通过 React 的 Hot Module Replacement API 更新组件
  3. 保留组件状态（如果组件逻辑允许）
  4. 如果组件有副作用（如 `useEffect`），组件会被完整重载
