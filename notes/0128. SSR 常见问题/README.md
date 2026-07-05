# [0128. SSR 常见问题](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0128.%20SSR%20%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 浏览器 API 不存在](#3-浏览器-api-不存在)
- [4. Hydration mismatch](#4-hydration-mismatch)
- [5. 样式闪烁](#5-样式闪烁)
- [6. 内存泄漏](#6-内存泄漏)
- [7. 缓存策略](#7-缓存策略)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 SSR 开发中的常见问题和解决方案
- 掌握浏览器 API 不存在、Hydration Mismatch 等问题的处理方式

## 2. 评价

- SSR 的大部分问题源于服务端和客户端环境的差异
- 理解这些差异是正确编写 SSR 代码的关键

## 3. 浏览器 API 不存在

- 服务端没有 `window`、`document`、`localStorage`、`navigator` 等浏览器 API
- 解决方案：

```ts
// 方式一：条件判断
if (typeof window !== 'undefined') {
  localStorage.getItem('token')
}

// 方式二：onMounted 中使用（Vue）
onMounted(() => {
  // 只在客户端执行
  localStorage.getItem('token')
})

// 方式三：import.meta.env.SSR
if (!import.meta.env.SSR) {
  // 客户端特有逻辑
}
```

## 4. Hydration mismatch

- 服务端和客户端渲染结果不一致时出现
- 常见原因：
  - 使用了 `Date.now()`、`Math.random()` 等不确定的值
  - 依赖了客户端特有的 API
  - 条件渲染依赖了客户端状态
- 解决方案：
  - 使用 `onMounted` 延迟渲染客户端特有的内容
  - 使用 `<ClientOnly>` 组件包裹客户端特有的内容
  - 确保服务端和客户端使用相同的数据

## 5. 样式闪烁

- SSR 页面首次加载时可能出现样式闪烁（FOUC）
- 原因：HTML 已渲染但 CSS 还未加载完成
- 解决方案：
  - 使用 SSR Manifest 正确注入 CSS 的 `<link>` 标签
  - 将关键 CSS 内联到 HTML 的 `<head>` 中
  - 使用 `<link rel="preload">` 提前加载 CSS

## 6. 内存泄漏

- SSR 应用在服务端长期运行，内存泄漏会导致服务器崩溃
- 常见原因：
  - 在全局作用域中存储请求相关的数据
  - 未清理的定时器和事件监听器
  - 闭包引用了请求级别的对象
- 解决方案：
  - 每次请求创建新的应用实例
  - 避免在全局作用域中存储请求数据
  - 使用 `--inspect` 和 Chrome DevTools 检测内存泄漏

## 7. 缓存策略

- SSR 页面的缓存可以显著提升性能：
  - 页面级缓存：缓存完整的 HTML 响应
  - 组件级缓存：缓存渲染开销大的组件的 HTML 片段
  - 数据缓存：缓存 API 响应数据
- Vue SSR 内置了组件级缓存支持

```ts
const LRU = require('lru-cache')
const microCache = new LRU({ max: 100, maxAge: 1000 * 60 })

// 缓存页面 HTML
const cached = microCache.get(url)
if (cached) return cached
const html = await renderToString(app)
microCache.set(url, html)
```
