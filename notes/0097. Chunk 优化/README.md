# [0097. Chunk 优化](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0097.%20Chunk%20%E4%BC%98%E5%8C%96)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Chunk 命名](#3-chunk-命名)
- [4. Chunk 体积分析](#4-chunk-体积分析)
- [5. 避免过度拆包](#5-避免过度拆包)
- [6. 避免循环依赖](#6-避免循环依赖)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Chunk 命名、体积控制和依赖关系优化
- 掌握避免过度拆包和循环依赖的最佳实践

## 2. 评价

- Chunk 优化是构建性能调优的重要环节
- 过度拆包和循环依赖是常见的性能陷阱

## 3. Chunk 命名

- 自定义 Chunk 的命名格式：

```ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 入口 chunk
        entryFileNames: 'assets/js/[name]-[hash].js',
        // 非入口 chunk（动态导入、共享模块）
        chunkFileNames: 'assets/js/[name]-[hash].js',
        // 资源文件（图片、字体、CSS）
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
})
```

- `[hash]` 是基于文件内容的哈希，内容变化时哈希变化，利于长期缓存
- 命名建议：保留 `[name]` 便于调试，不要只用 `[hash]`

## 4. Chunk 体积分析

- 使用 `build.chunkSizeWarningLimit` 控制体积警告阈值：

```ts
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000, // 1MB 以下不警告
  },
})
```

- 使用 `rollup-plugin-visualizer` 分析 Chunk 组成（详见 0100 节）
- 体积过大的 Chunk 应考虑进一步拆分

## 5. 避免过度拆包

- 过度拆包的问题：
  - 增加 HTTP 请求数（浏览器并发连接数有限）
  - 增加解析和执行开销
  - 小文件的网络开销可能大于文件本身的大小
- 合理的拆包策略：
  - 入口 chunk：尽量小，只包含初始化逻辑
  - Vendor chunk：按变化频率分组（框架、UI 库、工具库）
  - 业务 chunk：按路由或功能模块拆分
  - 共享 chunk：自动提取，无需手动干预
- 经验值：单个 chunk 控制在 200KB - 500KB 之间比较合理

## 6. 避免循环依赖

- 循环依赖（A → B → A）会导致 Chunk 优化失效
- 问题：
  - Rollup 无法将循环依赖的模块拆分到不同的 chunk
  - 可能导致 chunk 体积异常增大
  - 运行时可能出现 `undefined` 的导入
- 排查方法：
  - 使用 `rollup-plugin-visualizer` 查看 chunk 依赖关系
  - 使用 `madge` 工具检测循环依赖：`npx madge --circular src/`
- 解决方案：
  - 提取公共代码到独立模块
  - 使用依赖注入打破循环
  - 重构模块的依赖关系
