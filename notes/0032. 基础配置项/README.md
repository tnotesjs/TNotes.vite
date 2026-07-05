# [0032. 基础配置项](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0032.%20%E5%9F%BA%E7%A1%80%E9%85%8D%E7%BD%AE%E9%A1%B9)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `root`](#3-root)
- [4. `base`](#4-base)
- [5. `publicDir`](#5-publicdir)
- [6. `cacheDir`](#6-cachedir)
- [7. `mode`](#7-mode)
- [8. `logLevel`](#8-loglevel)
- [9. `clearScreen`](#9-clearscreen)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 的顶层基础配置项
- 理解 `root`、`base`、`publicDir` 等核心选项的作用
- 掌握 `mode` 与环境变量的关系

## 2. 评价

- 基础配置项是所有 Vite 项目都会接触到的，建议逐个理解
- 大多数项目只需配置 `base`（部署到子路径时）和 `publicDir`，其余使用默认值即可

## 3. `root`

- 项目根目录（`index.html` 所在的目录），默认为 `process.cwd()`
- 绝对路径，可以指定为文件系统中的任意目录
- 典型场景：Monorepo 中将子包目录设为 Vite 的 root

```ts
export default defineConfig({
  root: 'packages/my-app',
})
```

- Vite 会将此目录作为起点解析所有相对路径（包括 `src`、`public`、配置文件等）

## 4. `base`

- 公共基础路径，默认为 `'/''`
- 影响所有静态资源的引用路径（JS、CSS、图片等）
- 常见场景：
  - 部署到域名根路径：`base: '/'`（默认）
  - 部署到子路径：`base: '/my-app/'`
  - 部署到 CDN：`base: 'https://cdn.example.com/assets/'`
- 开发模式和生产模式可以使用不同的 `base`，通过配置函数实现：

```ts
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/my-app/',
}))
```

- 注意：`base` 必须以 `/` 开头和结尾（CDN 地址除外）

## 5. `publicDir`

- 静态资源目录的路径，默认为 `'public'`
- 该目录中的文件会被原样复制到构建产物的根目录，不做任何处理
- 设置为 `false` 可以禁用此功能
- 典型用途：
  - `favicon.ico`、`robots.txt`、`sitemap.xml`
  - PWA 的 `manifest.json`
  - 第三方 SDK 脚本
  - 大体积的媒体文件（避免被构建工具编码）

```ts
export default defineConfig({
  publicDir: 'static', // 使用 'static' 目录替代默认的 'public'
})
```

## 6. `cacheDir`

- 缓存目录的路径，默认为 `'node_modules/.vite'`
- 存储的内容：
  - 依赖预构建的产物（`deps/` 目录）
  - 预构建的元数据（`_metadata.json`）
  - 某些插件的缓存文件
- 可以自定义路径，适用于 Monorepo 中共享缓存或 CI 环境中指定缓存位置

```ts
export default defineConfig({
  cacheDir: '.vite-cache',
})
```

- 清除缓存的方式：删除此目录后重启 Dev Server

## 7. `mode`

- 指定构建模式，默认值：
  - `vite` 命令：`'development'`
  - `vite build` 命令：`'production'`
- 模式决定了加载哪个 `.env` 文件：
  - `development` → `.env.development`
  - `production` → `.env.production`
  - `staging` → `.env.staging`
- 通过 CLI 指定：`vite build --mode staging`
- 注意：`mode` 与 `NODE_ENV` 是两个不同的概念。`vite` 命令会自动将 `NODE_ENV` 设为 `'development'`，`vite build` 会设为 `'production'`；但自定义 mode（如 `--mode staging`）不会自动改变 `NODE_ENV`，需要在 `.env.[mode]` 中手动设置

## 8. `logLevel`

- 调整 Vite 在控制台输出的日志级别
- 可选值：
  - `'info'`：显示所有日志（默认）
  - `'warn'`：只显示警告和错误
  - `'error'`：只显示错误
  - `'silent'`：完全静默
  - `'warn'` + `'error'` 等价于 `'warn'`
- 也可以通过 CLI 指定：`vite build --logLevel error`

## 9. `clearScreen`

- 默认为 `true`，每次启动 Dev Server 或重新编译时清空终端屏幕
- 设为 `false` 可以保留终端的输出历史
- 典型场景：
  - 在 CI/CD 环境中通常设为 `false`，方便查看完整日志
  - 使用自定义的终端管理工具（如 tmux、screen）时可能需要关闭
