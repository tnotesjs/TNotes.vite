# [0021. Vite 的工作模式](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0021.%20Vite%20%E7%9A%84%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 开发模式：`vite`](#3-开发模式vite)
- [4. 生产构建：`vite build`](#4-生产构建vite-build)
- [5. 本地预览：`vite preview`](#5-本地预览vite-preview)
- [6. SSR 模式](#6-ssr-模式)
- [7. Library Mode 库模式](#7-library-mode-库模式)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 支持的各种工作模式
- 理解开发、构建、预览等模式的用途和区别
- 了解 SSR 模式和库模式的适用场景

## 2. 评价

- Vite 的工作模式划分清晰，每种模式对应一个明确的使用场景
- 日常开发最常用的是 `vite`（开发）和 `vite build`（构建），其余按需了解即可

## 3. 开发模式：`vite`

运行 `vite` 或 `npx vite` 启动开发服务器（默认端口 5173）。核心特性包括基于原生 ESM 的模块服务（无需打包）、按需编译（只转换浏览器请求的模块）、内置 HMR（热模块替换，文件修改即时更新）、自动处理 TypeScript、JSX、CSS Modules 等。在 `package.json` 中通常配置为：

```json
{
  "scripts": {
    "dev": "vite",
    "start": "vite"
  }
}
```

支持的常用选项：

- `--port <port>`：指定端口
- `--host`：监听所有网络接口（局域网访问）
- `--open`：启动后自动打开浏览器
- `--https`：启用 HTTPS

## 4. 生产构建：`vite build`

运行 `vite build` 执行生产环境构建。与开发模式的关键区别在于：使用 Rolldown（Vite 6+）打包（Vite 2 ~ 5 使用 Rollup），而非 Esbuild + ESM；执行完整的 Tree Shaking、Code Splitting、CSS 提取；输出优化后的静态资源到 `dist/` 目录；资源文件名带内容哈希，适合长期缓存。常用选项：

- `--outDir <dir>`：指定输出目录
- `--watch`：监听文件变化并重新构建（类似 Webpack 的 watch 模式）
- `--sourcemap`：生成 source map
- `--minify [type]`：压缩方式（默认 `esbuild`，可选 `terser` 或 `false`）

构建产物可以直接部署到任意静态服务器（Nginx、Vercel、Netlify 等）。

## 5. 本地预览：`vite preview`

`vite preview` 用于在本地预览生产构建的产物，本质是一个轻量的静态文件服务器，服务于 `dist/` 目录。典型用途包括构建后快速验证产物是否正确、检查路由和资源加载及 SPA fallback 是否正常、无需部署到远程服务器即可测试。默认端口 4173（与开发服务器的 5173 区分）。注意：`vite preview` 仅用于本地预览，不应用于生产环境。

## 6. SSR 模式

Vite 内置了对 SSR（Server-Side Rendering，服务端渲染）的支持，使用方式为 `vite build --ssr` 或通过 API `createViteServer({ ssr: true })`。SSR 模式下，同一份源码既可以在服务端运行也可以在客户端运行，服务端直接使用 ESM 导入无需额外打包步骤，Vite 提供 `ssrLoadModule()` API 在服务端加载模块。适用场景包括 SEO 友好的首屏渲染、需要服务端数据获取的场景，Nuxt（Vue）和 SvelteKit 等框架底层依赖此能力。纯前端 SPA 项目不需要关心 SSR 模式。

## 7. Library Mode 库模式

运行 `vite build --lib` 或在配置中指定 `build.lib` 选项，将项目构建为可发布的 npm 库。库模式的产物包括 ESM 格式（`.mjs` 或 `.js`）、UMD 格式（同时支持 `<script>` 标签和 CommonJS `require`）、CSS 文件（自动提取）。配置示例：

```ts
// vite.config.ts
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'MyLib',
      formats: ['es', 'umd'],
      fileName: (format) => `my-lib.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'], // 将 peer dependencies 排除
      output: {
        globals: { vue: 'Vue' },
      },
    },
  },
})
```

适用场景包括开发 UI 组件库（如 Element Plus、Ant Design Vue）、发布工具函数库、需要同时支持 ESM 和 UMD 两种消费方式的场景。与 `vite build`（应用模式）的区别在于库模式不会打包外部依赖，由消费者自行安装。
