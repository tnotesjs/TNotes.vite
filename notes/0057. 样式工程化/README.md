# [0057. 样式工程化](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0057.%20%E6%A0%B7%E5%BC%8F%E5%B7%A5%E7%A8%8B%E5%8C%96)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 全局样式](#3-全局样式)
- [4. 主题变量](#4-主题变量)
- [5. CSS 变量](#5-css-变量)
- [6. 暗黑模式](#6-暗黑模式)
- [7. 响应式设计](#7-响应式设计)
- [8. 样式隔离](#8-样式隔离)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 项目中样式工程化的最佳实践
- 掌握全局样式、主题变量、CSS 变量的组织方式
- 理解暗黑模式、响应式设计和样式隔离的实现方案

## 2. 评价

- 样式工程化是大型项目必须面对的问题，合理的组织方式能显著提升开发效率
- CSS 变量 + 暗黑模式是当前最流行的方案，Vite 对此有良好支持

## 3. 全局样式

- 推荐的全局样式组织结构：

```
src/styles/
├── index.css         # 入口文件，聚合所有全局样式
├── reset.css         # 浏览器样式重置
├── variables.css     # 全局 CSS 变量
├── typography.css    # 字体和排版
└── utilities.css     # 工具类
```

- 在入口文件中引入：

```ts
// main.ts
import './styles/index.css'
```

- 全局样式应控制在最小范围，组件样式优先使用 Scoped CSS 或 CSS Modules

## 4. 主题变量

- 使用 CSS 变量定义主题色（推荐方案）：

```css
/* variables.css */
:root {
  --color-primary: #1890ff;
  --color-success: #52c41a;
  --color-warning: #faad14;
  --color-error: #ff4d4f;
  --bg-color: #ffffff;
  --text-color: #333333;
  --border-radius: 4px;
  --spacing-unit: 8px;
}
```

- 在组件中使用：

```css
.button {
  background-color: var(--color-primary);
  border-radius: var(--border-radius);
  color: var(--text-color);
}
```

- 也可以通过 `css.preprocessorOptions.scss` 注入 Sass 变量（见 0053 节）

## 5. CSS 变量

- CSS 变量（Custom Properties）是实现主题系统的最佳方案
- 优势：
  - 原生浏览器支持，无需编译
  - 支持运行时动态修改（JS 操作 `document.documentElement.style`）
  - 支持继承和级联
  - 性能优秀（浏览器原生实现）
- JavaScript 中操作 CSS 变量：

```ts
// 读取
const primary = getComputedStyle(document.documentElement).getPropertyValue(
  '--color-primary',
)

// 设置
document.documentElement.style.setProperty('--color-primary', '#722ed1')
```

## 6. 暗黑模式

- 使用 CSS 变量 + `prefers-color-scheme` 媒体查询：

```css
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #1a1a1a;
    --text-color: #e0e0e0;
  }
}
```

- 手动切换暗黑模式（通过 class 控制）：

```css
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
}

:root.dark {
  --bg-color: #1a1a1a;
  --text-color: #e0e0e0;
}
```

```ts
// 切换暗黑模式
document.documentElement.classList.toggle('dark')
```

- Tailwind CSS 内置暗黑模式支持：`class="dark:bg-gray-900 dark:text-white"`

## 7. 响应式设计

- Vite 项目中实现响应式设计的常用方案：
  - **CSS 媒体查询**：最基础的方案
  - **CSS 容器查询**：现代方案，基于容器而非视口
  - **Tailwind CSS 断点**：`sm:`、`md:`、`lg:`、`xl:` 前缀
  - **PostCSS 插件**：如 `postcss-px-to-viewport` 实现移动端适配

```css
/* 媒体查询 */
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}

/* 容器查询 */
@container (max-width: 400px) {
  .card {
    flex-direction: column;
  }
}
```

## 8. 样式隔离

- Vite 项目中实现样式隔离的方案：
  - **CSS Modules**（推荐）：`.module.css` 后缀自动启用
  - **Scoped CSS**（Vue）：`<style scoped>` 自动添加作用域
  - **CSS-in-JS**：运行时或编译时生成唯一类名
  - **Shadow DOM**：原生的样式隔离方案
  - **BEM 命名**：约定式的命名规范（如 `.block__element--modifier`）
- 选择建议：
  - Vue 项目：Scoped CSS 或 CSS Modules
  - React 项目：CSS Modules 或 CSS-in-JS
  - 大型项目：CSS Modules（性能好、无运行时开销）
