# [0078. Lit](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0078.%20Lit)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Web Components](#3-web-components)
- [4. Vite 集成](#4-vite-集成)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Lit 框架和 Web Components 的基本概念
- 掌握 Lit 与 Vite 的集成方式
- 理解 Web Components 的适用场景

## 2. 评价

- Lit 是开发 Web Components 的最佳框架之一，由 Google 维护
- Web Components 是浏览器原生标准，适合开发跨框架的可复用组件
- Vite 原生支持 Web Components，集成非常简单

## 3. Web Components

- 浏览器原生的组件标准，包含三个核心技术：
  - Custom Elements：自定义 HTML 元素
  - Shadow DOM：封装组件内部的 DOM 和样式
  - HTML Templates：可复用的 HTML 模板
- 优势：
  - 框架无关：可以在 Vue、React、Angular 等任何框架中使用
  - 浏览器原生：无需运行时框架，体积小
  - 样式隔离：Shadow DOM 天然隔离样式
- 缺点：
  - API 较底层，开发体验不如现代框架
  - SSR 支持较弱
  - 无障碍（Accessibility）支持需要额外处理

## 4. Vite 集成

- 创建 Lit 项目：

```bash
npm create vite@latest my-app -- --template lit
npm create vite@latest my-app -- --template lit-ts
```

- Lit 组件示例：

```ts
import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('my-counter')
export class MyCounter extends LitElement {
  static styles = css`
    button {
      padding: 8px 16px;
    }
  `

  @property({ type: Number }) count = 0

  render() {
    return html`
      <button @click=${() => this.count++}>Count: ${this.count}</button>
    `
  }
}
```

- 在 HTML 中使用：

```html
<script type="module" src="./src/my-counter.ts"></script>
<my-counter></my-counter>
```

- Vite 对 Web Components 的原生支持：
  - `<my-counter>` 等自定义元素标签在 HTML 中直接可用
  - Custom Elements Manifest 可以通过插件生成
  - HMR 支持良好
