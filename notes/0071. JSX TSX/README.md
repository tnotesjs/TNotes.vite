# [0071. JSX TSX](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0071.%20JSX%20TSX)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. JSX 转换](#3-jsx-转换)
- [4. Fast Refresh](#4-fast-refresh)
- [5. Babel 配置](#5-babel-配置)
- [6. SWC 配置](#6-swc-配置)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 中 JSX/TSX 的转换机制
- 掌握 Babel 和 SWC 两种 JSX 转换方案的配置
- 理解 Fast Refresh 在 JSX 组件中的工作方式

## 2. 评价

- JSX/TSX 支持是 React 项目的刚需，Vite 通过插件提供了完善的解决方案
- Babel 和 SWC 功能等价，SWC 速度更快，是当前推荐选择

## 3. JSX 转换

- Vite 使用 Esbuild 内置支持 JSX 语法
- 默认的 JSX 转换行为：
  - `.jsx` 文件自动使用 JSX 转换
  - `.tsx` 文件自动使用 TSX 转换
  - React 17+ 使用自动导入模式（`react/jsx-runtime`），无需手动 `import React`
- 如果需要更精细的控制（如自定义 pragma、装饰器支持），需要使用 Babel 或 SWC 插件
- Vue 项目中的 JSX 需要使用 `@vitejs/plugin-vue-jsx` 插件（见 0064 节）

## 4. Fast Refresh

- React 的热更新方案，类似 Vue 的组件级 HMR
- 由 `@vitejs/plugin-react` 或 `@vitejs/plugin-react-swc` 提供
- 能力：
  - 函数组件和 Hook 变化时重新执行，保留状态
  - 纯渲染逻辑变化即时重渲染，完全保留状态
  - 有副作用的 Hook 变化时完整重载组件
  - 类组件或类型变化时降级为整页刷新
- 使用规则：
  - 组件文件必须导出一个 React 组件
  - 不要在渲染函数中写副作用
  - 遵循 React Hooks 规则

## 5. Babel 配置

- 使用 `@vitejs/plugin-react` 时可以通过 `babel` 选项自定义 Babel 配置：

```ts
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          'babel-plugin-styled-components',
          ['@babel/plugin-proposal-decorators', { legacy: true }],
        ],
        presets: [['@babel/preset-env', { targets: '> 1%, not dead' }]],
      },
    }),
  ],
})
```

- 也可以在项目根目录创建 `babel.config.js` 或 `.babelrc`
- Babel 配置的典型用途：
  - 使用 CSS-in-JS 的 Babel 插件（如 styled-components 的 displayName）
  - 启用装饰器语法
  - 自定义 JSX 转换的 pragma

## 6. SWC 配置

- 使用 `@vitejs/plugin-react-swc` 时可以通过 `swc` 选项自定义 SWC 配置：

```ts
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [
    react({
      tsDecorators: true, // 启用装饰器
    }),
  ],
})
```

- SWC 配置通常比 Babel 简洁，因为 SWC 内置了大部分常用功能
- 注意：SWC 不支持 Babel 插件，如果项目依赖特定的 Babel 插件则不能使用 SWC
- 也可以在项目根目录创建 `.swcrc` 文件进行更详细的配置
