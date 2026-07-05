# [0167. 性能指标](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0167.%20%E6%80%A7%E8%83%BD%E6%8C%87%E6%A0%87)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. FCP](#3-fcp)
- [4. LCP](#4-lcp)
- [5. CLS](#5-cls)
- [6. INP](#6-inp)
- [7. TTFB](#7-ttfb)
- [8. Lighthouse](#8-lighthouse)
- [9. Web Vitals](#9-web-vitals)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Web 性能的核心指标（Core Web Vitals）
- 掌握 FCP、LCP、CLS、INP、TTFB 的含义和优化方向
- 了解 Lighthouse 和 Web Vitals 的使用

## 2. 评价

- 性能指标是衡量用户体验的量化标准
- Google 将 Core Web Vitals 作为搜索排名因素

## 3. FCP

- First Contentful Paint（首次内容绘制）
- 衡量页面首次渲染任何内容（文本、图片等）的时间
- 目标：≤ 1.8 秒
- 优化：减少关键资源加载时间、内联关键 CSS

## 4. LCP

- Largest Contentful Paint（最大内容绘制）
- 衡量页面最大内容元素（首屏大图、标题等）的渲染时间
- 目标：≤ 2.5 秒
- 优化：预加载关键图片、优化服务器响应时间、使用 CDN

## 5. CLS

- Cumulative Layout Shift（累积布局偏移）
- 衡量页面加载过程中元素意外移动的程度
- 目标：≤ 0.1
- 优化：为图片和视频设置尺寸、避免动态注入内容、使用 `font-display: swap`

## 6. INP

- Interaction to Next Paint（交互到下次绘制）
- 衡量页面对用户交互（点击、输入等）的响应速度
- 目标：≤ 200 毫秒
- 优化：减少主线程阻塞、拆分长任务、使用 Web Worker

## 7. TTFB

- Time to First Byte（首字节时间）
- 衡量浏览器收到服务器响应第一个字节的时间
- 目标：≤ 800 毫秒
- 优化：使用 CDN、优化服务器性能、使用 HTTP/2 或 HTTP/3

## 8. Lighthouse

- Google 提供的网站质量检测工具：
  - Performance（性能）
  - Accessibility（无障碍）
  - Best Practices（最佳实践）
  - SEO
- 使用方式：Chrome DevTools → Lighthouse 面板

## 9. Web Vitals

- 使用 `web-vitals` 库在真实用户环境中采集性能指标：

```ts
import { onLCP, onFID, onCLS } from 'web-vitals'

onLCP(console.log)
onFID(console.log)
onCLS(console.log)
```

- 可以将数据上报到监控平台，分析真实用户的性能体验
