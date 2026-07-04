# [0096. 代码分割](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0096.%20%E4%BB%A3%E7%A0%81%E5%88%86%E5%89%B2)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 动态导入](#3-动态导入)
- [4. 路由懒加载](#4-路由懒加载)
- [5. `manualChunks`](#5-manualchunks)
- [6. Vendor 拆分](#6-vendor-拆分)
- [7. 公共模块拆分](#7-公共模块拆分)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 生产构建的代码分割策略
- 掌握动态导入、路由懒加载和 `manualChunks` 的使用方式
- 理解 Vendor 拆分和公共模块拆分的最佳实践

## 2. 评价

- 代码分割是优化首屏加载速度的关键手段
- 路由懒加载是最基础也最有效的分割方式
- `manualChunks` 是高级用法，需要根据项目实际情况调整

## 3. 动态导入

- 使用 `import()` 语法实现按需加载：

```ts
// 静态导入（打包到主 chunk）
import { utils } from './utils'

// 动态导入（独立 chunk，按需加载）
const { utils } = await import('./utils')
```

- Vite 会自动将动态导入的模块拆分为独立的 chunk
- 使用场景：
  - 路由懒加载
  - 大型库的按需加载（如图表库、编辑器）
  - 功能模块的条件加载

## 4. 路由懒加载

- Vue Router：

```ts
const routes = [
  { path: '/', component: () => import('@/views/Home.vue') },
  { path: '/about', component: () => import('@/views/About.vue') },
]
```

- React Router：

```tsx
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
```

- 每个路由对应的组件会被打包为独立的 chunk，首屏只加载当前路由的代码

## 5. `manualChunks`

- 手动指定 chunk 分割策略：

```ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-vue': ['vue', 'vue-router', 'pinia'],
          'vendor-ui': ['element-plus'],
          'vendor-utils': ['lodash-es', 'dayjs'],
        },
      },
    },
  },
})
```

- 也可以使用函数形式（更灵活）：

```ts
manualChunks(id) {
  if (id.includes('node_modules/vue')) return 'vendor-vue'
  if (id.includes('node_modules/element-plus')) return 'vendor-ui'
  if (id.includes('node_modules')) return 'vendor'
}
```

## 6. Vendor 拆分

- 将第三方依赖拆分为独立的 chunk，利用浏览器缓存：

```ts
manualChunks(id) {
  if (id.includes('node_modules')) {
    // 将大型依赖单独拆分
    if (id.includes('vue')) return 'vendor-vue'
    if (id.includes('echarts')) return 'vendor-echarts'
    // 其余 node_modules 合并
    return 'vendor'
  }
}
```

- 策略：
  - 框架核心（Vue/React）单独拆分（变化频率低，缓存命中率高）
  - 大型库（如 ECharts、Monaco Editor）单独拆分
  - 其余小依赖合并为一个 vendor chunk

## 7. 公共模块拆分

- Rollup 会自动提取被多个 chunk 共享的模块为独立的共享 chunk
- 例如：`utils.ts` 被 Home 和 About 两个路由都引用，会被自动提取为共享 chunk
- 无需手动配置，Rollup 默认行为即可
- 注意：过度拆分会导致过多的 HTTP 请求，需要平衡拆分粒度和请求数
