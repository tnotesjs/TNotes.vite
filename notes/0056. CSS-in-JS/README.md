# [0056. CSS-in-JS](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0056.%20CSS-in-JS)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 与 React 项目集成](#3-与-react-项目集成)
- [4. Emotion](#4-emotion)
- [5. Styled Components](#5-styled-components)
- [6. UnoCSS](#6-unocss)
- [7. Windi CSS](#7-windi-css)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 CSS-in-JS 方案在 Vite 中的集成方式
- 掌握 Emotion、Styled Components 等常用库的配置
- 了解 UnoCSS 和 Windi CSS 的原子化方案

## 2. 评价

- CSS-in-JS 在 React 生态中使用广泛，Vite 支持良好
- UnoCSS 是 Vite 生态中的"新星"，性能和灵活性都优于传统方案
- Vue 项目更推荐使用 Scoped CSS 或 CSS Modules，CSS-in-JS 使用较少

## 3. 与 React 项目集成

- Vite 的 React 模板开箱即用支持 JSX，CSS-in-JS 库通常不需要额外配置
- 常用的 CSS-in-JS 方案：
  - Emotion：React 生态最流行的 CSS-in-JS 库
  - Styled Components：另一款主流的 CSS-in-JS 库
  - Vanilla Extract：零运行时的 CSS-in-JS 方案（编译时提取）
- 选择建议：
  - 新项目推荐 Vanilla Extract（零运行时，性能最优）
  - 已有项目沿用 Emotion 或 Styled Components

## 4. Emotion

- 安装：`npm install @emotion/react @emotion/styled`

```tsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const style = css`
  color: hotpink;
  font-size: 24px;
`

function App() {
  return <div css={style}>Hello Emotion!</div>
}
```

- 需要在 `tsconfig.json` 中配置 `jsxImportSource`：

```json
{
  "compilerOptions": {
    "jsxImportSource": "@emotion/react"
  }
}
```

- 或在文件顶部添加 `/** @jsxImportSource @emotion/react */` 注释

## 5. Styled Components

- 安装：`npm install styled-components`
- 需要安装 Vite 插件以支持 SSR 和调试工具：

```bash
npm install -D vite-plugin-styled-components
```

```ts
// vite.config.ts
import styledComponents from 'vite-plugin-styled-components'

export default defineConfig({
  plugins: [react(), styledComponents()],
})
```

- 使用方式：

```tsx
import styled from 'styled-components'

const Button = styled.button`
  background: ${(props) => (props.primary ? '#007bff' : '#6c757d')};
  color: white;
  padding: 8px 16px;
`

function App() {
  return <Button primary>Click Me</Button>
}
```

## 6. UnoCSS

- 原子化 CSS 引擎，由 Vite 核心团队成员 Anthony Fu 开发
- 安装：`npm install -D unocss`

```ts
// vite.config.ts
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [UnoCSS()],
})
```

- 在入口文件中引入：`import 'virtual:uno.css'`
- 优势：
  - 比 Tailwind CSS 更快（按需生成，几乎零开销）
  - 支持多种预设（Uno、Wind、Attributify 等）
  - 高度可定制
  - 兼容 Tailwind CSS / Windi CSS 的类名

```html
<div class="text-center text-red-500 p-4">Hello UnoCSS!</div>
```

## 7. Windi CSS

- UnoCSS 的前身，已停止维护，推荐迁移到 UnoCSS
- 安装：`npm install -D windicss`

```ts
// vite.config.ts
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [WindiCSS()],
})
```

- 如果项目仍在使用 Windi CSS，建议制定迁移计划到 UnoCSS
- UnoCSS 提供了 `@unocss/preset-wind` 预设，兼容 Windi CSS 的类名
