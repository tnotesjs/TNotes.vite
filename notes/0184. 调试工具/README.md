# [0184. 调试工具](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0184.%20%E8%B0%83%E8%AF%95%E5%B7%A5%E5%85%B7)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 浏览器 DevTools](#3-浏览器-devtools)
- [4. Network 面板](#4-network-面板)
- [5. Source Map](#5-source-map)
- [6. Vite 日志](#6-vite-日志)
- [7. `--debug`](#7---debug)
- [8. `vite-plugin-inspect`](#8-vite-plugin-inspect)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 项目中常用的调试工具
- 掌握浏览器 DevTools、Network 面板、Source Map、Vite 日志等调试方式

## 2. 评价

- 浏览器 DevTools 是最基础也最强大的调试工具
- `vite-plugin-inspect` 是调试 Vite 插件的利器

## 3. 浏览器 DevTools

- Chrome DevTools 的常用功能：
  - **Console**：查看日志和错误
  - **Elements**：检查 DOM 和 CSS
  - **Sources**：查看源码和打断点
  - **Network**：查看网络请求
  - **Performance**：性能分析
  - **Lighthouse**：网站质量检测

## 4. Network 面板

- 用于排查资源加载问题：
  - 查看请求的 URL 是否正确
  - 检查响应状态码（200、404、500 等）
  - 查看请求和响应的 Headers
  - 分析加载瀑布图（Waterfall）

## 5. Source Map

- 开启 Source Map 后可以在 DevTools 中调试 TypeScript 源码：

```ts
export default defineConfig({
  build: {
    sourcemap: true,
  },
})
```

- 在 Sources 面板中可以直接打断点、查看变量

## 6. Vite 日志

- 调整日志级别查看更多信息：

```ts
export default defineConfig({
  logLevel: 'info', // 'info' | 'warn' | 'error' | 'silent'
})
```

- CLI 方式：`vite --logLevel info`

## 7. `--debug`

- 使用 `--debug` 标志查看详细的调试日志：

```bash
vite --debug
```

- 输出 Vite 内部的详细信息，包括模块解析、插件执行等

## 8. `vite-plugin-inspect`

- 检查 Vite 插件的转换结果：

```ts
import inspect from 'vite-plugin-inspect'

export default defineConfig({
  plugins: [inspect()],
})
```

- 访问 `http://localhost:5173/__inspect/` 查看：
  - 每个模块经过了哪些插件的处理
  - 转换前后的代码对比
  - 每个钩子的执行耗时
