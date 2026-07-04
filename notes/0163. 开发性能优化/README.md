# [0163. 开发性能优化](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0163.%20%E5%BC%80%E5%8F%91%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 减少冷启动时间](#3-减少冷启动时间)
- [4. 优化依赖预构建](#4-优化依赖预构建)
- [5. 减少不必要插件](#5-减少不必要插件)
- [6. 排查慢插件](#6-排查慢插件)
- [7. 文件监听优化](#7-文件监听优化)

<!-- endregion:toc -->

## 1. 本节内容

- 了解提升 Vite 开发服务器性能的优化手段
- 掌握冷启动、依赖预构建、插件优化等技巧

## 2. 评价

- Vite 的开发性能已经很好，大部分项目不需要额外优化
- 当项目规模增大、开发体验变差时，可以参考以下优化手段

## 3. 减少冷启动时间

- 优化冷启动的方式：
  - 使用 `optimizeDeps.include` 预构建常用依赖
  - 减少 `vite.config.ts` 中的插件数量
  - 使用 SWC 替代 Babel
  - 避免在配置文件中执行耗时操作

## 4. 优化依赖预构建

- 配置 `optimizeDeps.include` 预构建常用依赖：

```ts
export default defineConfig({
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'axios'],
  },
})
```

- 减少首次访问时的预构建时间

## 5. 减少不必要插件

- 每个插件都会增加启动时间和模块处理时间
- 移除开发时不需要的插件（如压缩插件、分析插件）
- 使用条件启用：只在需要时启用插件

## 6. 排查慢插件

- 使用 `vite-plugin-inspect` 查看每个插件的处理耗时
- 使用 `--debug` 标志查看详细的启动日志
- 逐个禁用插件，找到影响性能的插件

## 7. 文件监听优化

- 如果 HMR 变慢，检查文件监听配置：
  - 排除 `node_modules` 和 `.git` 目录
  - 在 WSL/Docker 中使用 `usePolling: true`
  - 减少监听的文件数量

```ts
export default defineConfig({
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
  },
})
```
