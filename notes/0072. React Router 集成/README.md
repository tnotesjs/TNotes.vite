# [0072. React Router 集成](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0072.%20React%20Router%20%E9%9B%86%E6%88%90)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. BrowserRouter](#3-browserrouter)
- [4. HashRouter](#4-hashrouter)
- [5. 路由懒加载](#5-路由懒加载)
- [6. 部署刷新 404 问题](#6-部署刷新-404-问题)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 React Router 与 Vite 的集成方式
- 掌握 BrowserRouter 和 HashRouter 的选择
- 理解路由懒加载和部署刷新 404 问题的解决方案

## 2. 评价

- React Router 是 React 生态的事实标准路由库
- 部署刷新 404 是最常见的坑，理解原因后解决方案很简单

## 3. BrowserRouter

- 使用 HTML5 History API，URL 更美观（无 `#`）

```tsx
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
```

- 如果部署到子路径，需要设置 `basename`：

```tsx
<BrowserRouter basename="/my-app">{/* ... */}</BrowserRouter>
```

- 需要服务器端配置 SPA fallback（将所有路由请求重定向到 `index.html`）

## 4. HashRouter

- 使用 URL 的 hash 部分（`#/path`）实现路由
- 无需服务器配置，适合简单的静态托管

```tsx
import { HashRouter } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  )
}
```

- 缺点：URL 中有 `#`，不太美观，SEO 不友好
- 适用场景：GitHub Pages、简单的静态托管等无法配置服务器的场景

## 5. 路由懒加载

- 使用 `React.lazy()` + `Suspense` 实现路由级别的代码分割：

```tsx
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
```

- Vite 原生支持 `import()` 动态导入，每个懒加载的路由会生成独立的 chunk
- 首屏只加载当前路由的代码，减少初始加载体积

## 6. 部署刷新 404 问题

- 使用 BrowserRouter 时，刷新页面会出现 404 错误
- 原因：
  1. 用户访问 `/about` 路径
  2. 浏览器向服务器请求 `/about` 这个文件
  3. 服务器上没有 `/about` 这个文件，返回 404
  4. 正确做法是返回 `index.html`，由前端路由处理
- 解决方案（Nginx）：

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

- Vite 开发服务器和 `vite preview` 已内置 SPA fallback，开发时不会遇到此问题
- 其他部署平台的解决方案：
  - Vercel / Netlify：在配置文件中设置重写规则
  - GitHub Pages：使用 HashRouter 或配置 404.html
