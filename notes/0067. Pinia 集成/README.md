# [0067. Pinia 集成](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0067.%20Pinia%20%E9%9B%86%E6%88%90)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 状态管理](#3-状态管理)
- [4. 持久化](#4-持久化)
- [5. 模块化 Store](#5-模块化-store)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Pinia 与 Vite 的集成方式
- 掌握状态管理和持久化的基本用法
- 理解模块化 Store 的组织方式

## 2. 评价

- Pinia 是 Vue 3 官方推荐的状态管理库，替代了 Vuex
- 与 Vite 集成无需额外配置，安装即可使用
- Pinia 的 API 设计简洁，学习成本低

## 3. 状态管理

- 安装：`npm install pinia`

```ts
// main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
```

- 定义 Store：

```ts
// src/stores/counter.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  const increment = () => count.value++

  return { count, double, increment }
})
```

- 在组件中使用：

```vue
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>

<template>
  <p>Count: {{ counter.count }}</p>
  <button @click="counter.increment()">+1</button>
</template>
```

## 4. 持久化

- Pinia 默认不持久化状态，页面刷新后状态会丢失
- 使用 `pinia-plugin-persistedstate` 实现持久化：

```bash
npm install pinia-plugin-persistedstate
```

```ts
// main.ts
import { createPinia } from 'pinia'
import piniaPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPersistedstate)
```

```ts
// src/stores/user.ts
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const setToken = (t: string) => {
      token.value = t
    }
    return { token, setToken }
  },
  {
    persist: true, // 启用持久化
  },
)
```

- 默认使用 `localStorage` 存储，可配置为 `sessionStorage` 或自定义存储

## 5. 模块化 Store

- 推荐按功能模块组织 Store：

```
src/stores/
├── index.ts         # 导出所有 Store（可选）
├── user.ts          # 用户相关状态
├── cart.ts          # 购物车状态
├── theme.ts         # 主题设置
└── counter.ts       # 示例 Store
```

- Store 之间可以互相引用：

```ts
// src/stores/cart.ts
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()

  const items = ref([])

  const checkout = () => {
    if (!userStore.token) {
      // 需要登录
      return
    }
    // 结算逻辑
  }

  return { items, checkout }
})
```

- Pinia 的模块化设计天然适合 Vite 的按需加载特性，每个 Store 可以被懒加载
