# [0111. MPA 配置](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0111.%20MPA%20%E9%85%8D%E7%BD%AE)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `build.rollupOptions.input`](#3-buildrollupoptionsinput)
- [4. 多入口打包](#4-多入口打包)
- [5. 公共资源复用](#5-公共资源复用)
- [6. 页面级资源隔离](#6-页面级资源隔离)

<!-- endregion:toc -->

## 1. 本节内容

- 掌握 MPA 的 Vite 配置方式
- 了解多入口打包和公共资源复用的策略

## 2. 评价

- MPA 配置的核心是 `build.rollupOptions.input`
- 公共资源复用和页面级隔离是 MPA 优化的关键

## 3. `build.rollupOptions.input`

- 指定多个 HTML 入口：

```ts
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
        login: resolve(__dirname, 'login.html'),
      },
    },
  },
})
```

## 4. 多入口打包

- Rollup 为每个入口生成独立的 chunk
- 共享模块自动提取为共享 chunk（如 Vue、React 等框架代码）
- 可以通过 `manualChunks` 控制共享 chunk 的拆分策略

## 5. 公共资源复用

- 多个页面共享的代码会被自动提取：
  - 框架核心（Vue/React）
  - 工具库（lodash-es、dayjs）
  - 公共组件和工具函数
- 共享 chunk 会被浏览器缓存，后续页面加载时直接复用

## 6. 页面级资源隔离

- 每个页面只加载自己需要的 JS 和 CSS
- 通过懒加载实现页面间的代码隔离：

```ts
// admin/main.ts 只导入 admin 相关的模块
import { createApp } from 'vue'
import AdminApp from './AdminApp.vue'
import adminRouter from './router'

createApp(AdminApp).use(adminRouter).mount('#app')
```

- 避免在一个入口中导入另一个页面的代码，否则会导致 chunk 体积膨胀
