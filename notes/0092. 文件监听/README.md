# [0092. 文件监听](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0092.%20%E6%96%87%E4%BB%B6%E7%9B%91%E5%90%AC)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `server.watch`](#3-serverwatch)
- [4. Chokidar](#4-chokidar)
- [5. WSL 文件监听问题](#5-wsl-文件监听问题)
- [6. Docker 文件监听问题](#6-docker-文件监听问题)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite Dev Server 的文件监听机制
- 掌握 `server.watch` 和 Chokidar 的配置方式
- 理解 WSL 和 Docker 环境下的文件监听问题及解决方案

## 2. 评价

- 文件监听是 HMR 的基础，大部分情况下不需要手动配置
- WSL 和 Docker 环境是最常遇到文件监听问题的场景，`usePolling: true` 是通用解决方案

## 3. `server.watch`

- 配置 Vite 的文件监听行为：

```ts
export default defineConfig({
  server: {
    watch: {
      // 忽略的文件/目录
      ignored: ['**/node_modules/**', '**/.git/**'],
      // 是否使用轮询（解决 WSL/Docker 问题）
      usePolling: false,
      // 轮询间隔（毫秒）
      interval: 100,
    },
  },
})
```

- 默认使用操作系统的原生文件系统事件（高效）
- 只在遇到文件监听不生效的问题时才需要修改配置

## 4. Chokidar

- Vite 内部使用 Chokidar 库进行文件监听
- Chokidar 是 Node.js 生态中最流行的文件监听库
- 支持的特性：
  - 跨平台文件系统事件监听
  - 递归监听目录
  - 文件过滤（glob 模式）
  - 轮询模式（fallback）
- `server.watch` 的选项会直接传递给 Chokidar

## 5. WSL 文件监听问题

- 在 WSL（Windows Subsystem for Linux）中，文件监听可能不生效
- 原因：WSL 的文件系统事件无法正确传递给 Linux 内核
- 解决方案：

```ts
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
})
```

- `usePolling` 通过定期轮询文件修改时间来检测变化，兼容性更好但 CPU 开销略高
- WSL2 已经改善了文件监听支持，如果项目在 WSL2 的 Linux 文件系统中，可能不需要此配置

## 6. Docker 文件监听问题

- 在 Docker 容器中开发时，文件监听同样可能不生效
- 原因：Docker 的文件系统事件无法从宿主机传递到容器内
- 解决方案：

```ts
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
})
```

- 也可以使用 Docker 的 `--poll` 选项或 `chokidar` 的轮询模式
- 性能影响：轮询模式会增加 CPU 使用率，但对于开发环境通常可以接受
