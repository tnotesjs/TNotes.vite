# [0076. Solid](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0076.%20Solid)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Solid + Vite](#3-solid--vite)
- [4. JSX 编译](#4-jsx-编译)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 SolidJS 与 Vite 的集成方式
- 掌握 SolidJS 的 JSX 编译特点
- 理解 SolidJS 与 React 的关键差异

## 2. 评价

- SolidJS 是性能最好的前端框架之一，与 Vite 集成良好
- 适合对性能有极致要求的项目，学习曲线比 React 略陡
- 使用 JSX 语法，React 开发者可以快速上手

## 3. Solid + Vite

- 创建 SolidJS 项目：

```bash
# 使用 degit 模板
npx degit solidjs/templates/js my-solid-app
npx degit solidjs/templates/ts my-solid-app

# 或使用 create-vite（SolidJS 模板）
npm create vite@latest my-app -- --template solid
npm create vite@latest my-app -- --template solid-ts
```

- SolidJS 使用 `vite-plugin-solid` 插件：

```ts
// vite.config.ts
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
})
```

- SolidJS 的特点：
  - **无虚拟 DOM**：编译时将 JSX 转换为真实的 DOM 操作
  - **细粒度响应式**：只有依赖变化的部分会更新
  - **极小的运行时**：产物体积小，运行时开销低
  - **类 React JSX 语法**：使用 JSX 但语义不同

## 4. JSX 编译

- SolidJS 的 JSX 与 React JSX 有本质区别：
  - React JSX 编译为 `React.createElement()`（虚拟 DOM）
  - SolidJS JSX 编译为真实的 DOM 创建和更新操作
- SolidJS 的 JSX 需要专用的编译器（`babel-preset-solid`），不能使用 Esbuild 的 JSX 转换
- 关键差异：
  - SolidJS 中组件函数**只执行一次**（不像 React 每次渲染都执行）
  - 响应式通过 Signal（`createSignal`）实现，而非 `useState`
  - 事件处理使用 `onclick`（小写），而非 `onClick`

```tsx
import { createSignal } from 'solid-js'

function Counter() {
  const [count, setCount] = createSignal(0)
  return <button onClick={() => setCount(count() + 1)}>Count: {count()}</button>
}
```
