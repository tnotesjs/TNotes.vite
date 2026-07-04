# [0140. 组件懒加载](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0140.%20%E7%BB%84%E4%BB%B6%E6%87%92%E5%8A%A0%E8%BD%BD)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Vue 异步组件](#3-vue-异步组件)
- [4. React lazy](#4-react-lazy)
- [5. 按需加载弹窗](#5-按需加载弹窗)
- [6. 按需加载图表库](#6-按需加载图表库)

<!-- endregion:toc -->

## 1. 本节内容

- 掌握 Vue 和 React 中组件懒加载的方式
- 了解按需加载弹窗、图表库等场景的实践

## 2. 评价

- 组件懒加载适合体积大、使用频率低的组件
- 按需加载图表库可以显著减少首屏加载体积

## 3. Vue 异步组件

- 使用 `defineAsyncComponent` 定义异步组件：

```ts
import { defineAsyncComponent } from 'vue'

const HeavyComponent = defineAsyncComponent(
  () => import('./components/HeavyComponent.vue'),
)
```

- 支持 Loading/Error 状态：

```ts
const HeavyComponent = defineAsyncComponent({
  loader: () => import('./components/HeavyComponent.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,
  timeout: 3000,
})
```

## 4. React lazy

- 使用 `React.lazy()` 定义懒加载组件：

```tsx
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

## 5. 按需加载弹窗

- 弹窗组件通常只在用户操作时才需要，适合懒加载：

```ts
// Vue
const EditDialog = defineAsyncComponent(
  () => import('./components/EditDialog.vue'),
)

// 打开弹窗时才加载
const showDialog = ref(false)
```

```tsx
// React
const EditDialog = lazy(() => import('./EditDialog'))

function App() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Edit</button>
      {open && (
        <Suspense fallback={null}>
          <EditDialog onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </>
  )
}
```

## 6. 按需加载图表库

- 图表库（如 ECharts、Chart.js）体积很大，适合按需加载：

```ts
async function renderChart(container: HTMLElement, data: any[]) {
  // 动态导入 ECharts
  const echarts = await import('echarts')
  const chart = echarts.init(container)
  chart.setOption({
    /* ... */
  })
}
```

- 只在用户访问包含图表的页面时才加载 ECharts，首屏不加载
