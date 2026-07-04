# [0035. 预览服务器配置](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0035.%20%E9%A2%84%E8%A7%88%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%85%8D%E7%BD%AE)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `preview.host`](#3-previewhost)
- [4. `preview.port`](#4-previewport)
- [5. `preview.open`](#5-previewopen)
- [6. `preview.proxy`](#6-previewproxy)
- [7. `preview.headers`](#7-previewheaders)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 预览服务器的配置选项
- 理解预览服务器与开发服务器配置的区别
- 掌握常用预览配置的用法

## 2. 评价

- 预览服务器配置与开发服务器非常相似，主要用于验证构建产物
- 大多数项目不需要专门配置预览服务器，使用默认值即可

## 3. `preview.host`

- 指定预览服务器监听的网络接口，默认为 `'localhost'`
- 与 `server.host` 用法相同
- 设为 `'0.0.0.0'` 或 `true` 可以在局域网中访问

## 4. `preview.port`

- 指定预览服务器的端口号，默认为 **4173**
- 与开发服务器的 5173 区分，避免冲突
- CLI 快捷方式：`vite preview --port 8080`

## 5. `preview.open`

- 默认为 `false`
- 设为 `true` 后，预览服务器启动时自动打开浏览器
- CLI 快捷方式：`vite preview --open`

## 6. `preview.proxy`

- 与 `server.proxy` 用法相同，用于配置预览服务器的 API 代理
- 典型场景：构建产物中仍需调用后端 API，通过代理避免跨域问题

```ts
export default defineConfig({
  preview: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
```

## 7. `preview.headers`

- 为预览服务器的所有响应添加自定义 HTTP headers
- 与 `server.headers` 用法相同
- 典型用途：模拟生产环境的 CORS 策略、安全 headers 等
