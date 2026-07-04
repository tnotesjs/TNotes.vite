# [0034. 构建配置](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0034.%20%E6%9E%84%E5%BB%BA%E9%85%8D%E7%BD%AE)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `build.outDir`](#3-buildoutdir)
- [4. `build.assetsDir`](#4-buildassetsdir)
- [5. `build.assetsInlineLimit`](#5-buildassetsinlinelimit)
- [6. `build.sourcemap`](#6-buildsourcemap)
- [7. `build.minify`](#7-buildminify)
- [8. `build.target`](#8-buildtarget)
- [9. `build.cssTarget`](#9-buildcsstarget)
- [10. `build.rollupOptions`](#10-buildrollupoptions)
- [11. `build.emptyOutDir`](#11-buildemptyoutdir)
- [12. `build.chunkSizeWarningLimit`](#12-buildchunksizewarninglimit)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 生产构建的各项配置选项
- 掌握输出目录、资源处理、压缩、source map 等常用配置
- 理解 Rollup 高级选项的接入方式

## 2. 评价

- 构建配置决定了生产产物的质量和体积，是性能优化的核心
- 大多数项目只需关注 `build.outDir`、`build.sourcemap`、`build.target`，其余使用默认值
- `build.rollupOptions` 是高级用法的入口，用于精细控制代码分割和输出格式

## 3. `build.outDir`

- 构建产物的输出目录，默认为 `'dist'`
- 相对于项目根目录的路径

```ts
export default defineConfig({
  build: {
    outDir: 'build', // 输出到 build/ 目录
  },
})
```

- CLI 快捷方式：`vite build --outDir build`

## 4. `build.assetsDir`

- 静态资源（JS、CSS、图片等）相对于 `outDir` 的存放子目录，默认为 `'assets'`
- 最终资源路径为：`dist/assets/[name]-[hash].[ext]`

```ts
export default defineConfig({
  build: {
    assetsDir: 'static', // 资源存放在 dist/static/ 下
  },
})
```

## 5. `build.assetsInlineLimit`

- 静态资源内联为 Base64 的体积阈值，默认为 **4096（4KB）**
- 小于此值的资源会被内联为 Base64 URI，减少 HTTP 请求
- 大于此值的资源作为独立文件输出

```ts
export default defineConfig({
  build: {
    assetsInlineLimit: 8192, // 8KB 以下的资源内联
  },
})
```

- 设为 `0` 可以禁用内联，所有资源都作为独立文件

## 6. `build.sourcemap`

- 是否生成 source map，默认为 `false`
- 可选值：
  - `true`：生成独立的 `.map` 文件
  - `'inline'`：内联到产物文件中（体积大，仅调试用）
  - `'hidden'`：生成 `.map` 文件但不添加 `//# sourceMappingURL` 注释（安全场景）
- 生产环境建议：
  - 开发环境：`true`（便于调试）
  - 生产环境：`'hidden'`（不暴露源码位置，但错误监控系统可以上传 map 文件）

## 7. `build.minify`

- 代码压缩方式，默认为 `'esbuild'`（极快）
- 可选值：
  - `'esbuild'`：使用 Esbuild 压缩，速度极快，压缩率略低于 terser
  - `'terser'`：使用 terser 压缩，压缩率更高但速度较慢
  - `false`：关闭压缩（调试时有用）
- 选择建议：
  - 绝大多数项目使用默认的 `'esbuild'` 即可
  - 对产物体积有极致要求时才考虑 `'terser'`

## 8. `build.target`

- 构建目标环境，决定输出代码的语法兼容性
- 默认值为 Vite 的默认浏览器兼容目标（可通过 `@vitejs/plugin-legacy` 扩展）
- 常用值：
  - `'es2015'`：兼容到 ES6
  - `'es2020'`：兼容到 ES2020（支持可选链、空值合并等）
  - `'esnext'`：不降级，使用最新语法
  - `'modules'`：根据浏览器对 ESM 的支持来决定
- CLI 快捷方式：`vite build --target es2018`

```ts
export default defineConfig({
  build: {
    target: 'es2020',
  },
})
```

## 9. `build.cssTarget`

- CSS 压缩的目标浏览器，默认为与 `build.target` 相同
- 用法与 `build.target` 类似，但只影响 CSS 压缩
- 典型场景：需要单独控制 CSS 的浏览器兼容性

## 10. `build.rollupOptions`

- 传递给 Rollup 的高级配置选项
- 典型用法：

```ts
export default defineConfig({
  build: {
    rollupOptions: {
      // 多入口配置
      input: {
        main: 'index.html',
        admin: 'admin.html',
      },
      // 手动分割 chunk
      output: {
        manualChunks: {
          'vendor-vue': ['vue', 'vue-router', 'pinia'],
          'vendor-ui': ['element-plus'],
        },
        // 自定义文件名格式
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
      // 排除外部依赖（库模式常用）
      external: ['vue'],
    },
  },
})
```

## 11. `build.emptyOutDir`

- 默认为 `true`，构建前自动清空输出目录
- 设为 `false` 可以保留输出目录中的已有文件
- 安全机制：当输出目录在项目根目录之外时，Vite 不会自动清空（需要手动设置为 `true`）

## 12. `build.chunkSizeWarningLimit`

- 单个 chunk 的体积警告阈值，默认为 **500（KB）**
- 当某个 chunk 超过此值时，构建会在终端输出警告
- 不影响构建结果，仅用于提示开发者关注体积过大的 chunk

```ts
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000, // 1MB 以下不警告
  },
})
```
