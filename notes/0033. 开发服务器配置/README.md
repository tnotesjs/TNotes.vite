# [0033. 开发服务器配置](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0033.%20%E5%BC%80%E5%8F%91%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%85%8D%E7%BD%AE)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `server.host`](#3-serverhost)
- [4. `server.port`](#4-serverport)
- [5. `server.strictPort`](#5-serverstrictport)
- [6. `server.open`](#6-serveropen)
- [7. `server.proxy`](#7-serverproxy)
- [8. `server.cors`](#8-servercors)
- [9. `server.https`](#9-serverhttps)
- [10. `server.headers`](#10-serverheaders)
- [11. `server.watch`](#11-serverwatch)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 开发服务器的各项配置选项
- 掌握端口、主机、代理、CORS、HTTPS 等常用配置
- 理解文件监听和自定义 headers 的用法

## 2. 评价

- 开发服务器配置是日常开发中最常调整的部分
- `server.proxy` 是前后端分离项目中最重要的配置，几乎每个项目都会用到
- 其他配置项按需使用即可

## 3. `server.host`

- 指定 Dev Server 监听的网络接口，默认为 `'localhost'`
- 常用值：
  - `'localhost'` 或 `'127.0.0.1'`：仅本机可访问（默认）
  - `'0.0.0.0'`：监听所有网络接口，局域网内的其他设备也可访问
  - `true`：等价于 `'0.0.0.0'`
- 典型场景：移动端真机调试时需要局域网访问
- CLI 快捷方式：`vite --host`

## 4. `server.port`

- 指定 Dev Server 的端口号，默认为 `5173`
- 如果端口被占用，Vite 会自动尝试下一个可用端口
- CLI 快捷方式：`vite --port 3000`

## 5. `server.strictPort`

- 默认为 `false`
- 设为 `true` 后，如果指定端口被占用，Vite 不会自动尝试其他端口，而是直接报错退出
- 典型场景：CI/CD 流水线中需要确保端口固定

## 6. `server.open`

- 默认为 `false`
- 设为 `true` 后，Dev Server 启动时自动在默认浏览器中打开页面
- 也可以指定打开的路径：`server.open: '/index.html'`
- CLI 快捷方式：`vite --open`

## 7. `server.proxy`

- 配置 API 代理，解决开发环境中的跨域问题
- 基本用法：

```ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```

- 简写形式（不修改路径）：`'/api': 'http://localhost:8080'`
- 支持 WebSocket 代理：`'/socket': { target: 'ws://localhost:8080', ws: true }`
- 可以配置多个代理规则，按顺序匹配
- 底层使用 `http-proxy-3`，支持其所有配置选项

## 8. `server.cors`

- 配置 Dev Server 的 CORS（跨域资源共享）策略
- 默认仅允许 localhost、`127.0.0.1` 和 `::1` 的跨域请求，设为 `true` 可允许所有来源（有安全风险）
- 可以传入 CORS 配置对象进行细粒度控制：

```ts
export default defineConfig({
  server: {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  },
})
```

- 开发环境通常保持默认即可，生产环境的 CORS 由后端服务器或 Nginx 配置

## 9. `server.https`

- 启用 HTTPS 开发服务器
- `server.https` 需要一个合法可用的证书，建议使用 `@vitejs/plugin-basic-ssl` 插件来创建自签名证书
- 自定义证书：

```ts
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('cert/key.pem'),
      cert: fs.readFileSync('cert/cert.pem'),
    },
  },
})
```

- CLI 快捷方式：`vite --https`
- 典型场景：需要调用 HTTPS-only 的 API（如某些浏览器 API）时
- 自签名证书首次访问时浏览器会提示不安全，需要手动确认

## 10. `server.headers`

- 为 Dev Server 的所有响应添加自定义 HTTP headers
- 典型用途：

```ts
export default defineConfig({
  server: {
    headers: {
      'X-Custom-Header': 'value',
      'Cache-Control': 'no-cache',
    },
  },
})
```

- 应用场景：调试缓存策略、模拟特定的 HTTP 响应头、设置安全相关的 headers

## 11. `server.watch`

- 配置 Dev Server 的文件监听行为
- 默认使用 `chokidar` 监听文件变化
- 可以传递 `chokidar` 的选项来自定义监听行为：

```ts
export default defineConfig({
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/.git/**'],
      usePolling: false,
      interval: 100,
    },
  },
})
```

- 常见问题及解决方案：
  - Docker 容器中 HMR 不生效：设置 `usePolling: true`（因为 Docker 的文件系统事件可能无法传递）
  - WSL（Windows Subsystem for Linux）中 HMR 不生效：同样需要 `usePolling: true`
  - 监听文件过多导致 CPU 占用高：通过 `ignored` 排除不必要的目录
