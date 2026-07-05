# [0073. 状态管理](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0073.%20%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Redux Toolkit](#3-redux-toolkit)
- [4. Zustand](#4-zustand)
- [5. Jotai](#5-jotai)
- [6. Recoil](#6-recoil)
- [7. TanStack Query](#7-tanstack-query)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 React 生态中常用的状态管理方案
- 掌握 Redux Toolkit、Zustand、Jotai 等库与 Vite 的集成方式
- 理解不同状态管理方案的适用场景

## 2. 评价

- React 状态管理方案众多，选择时应根据项目规模和团队偏好决定
- 小型项目推荐 Zustand 或 Jotai，大型项目推荐 Redux Toolkit
- TanStack Query 是服务端状态管理的最佳选择，与客户端状态管理互补

## 3. Redux Toolkit

- React 生态最成熟的状态管理库，适合大型项目和团队协作
- 安装：`npm install @reduxjs/toolkit react-redux`

```tsx
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    // ...
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

- 与 Vite 集成无需额外配置，开箱即用
- Redux DevTools 浏览器扩展在开发环境中自动启用

## 4. Zustand

- 轻量级状态管理库，API 简洁，学习成本低
- 安装：`npm install zustand`

```tsx
import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))

function Counter() {
  const { count, increment } = useStore()
  return <button onClick={increment}>Count: {count}</button>
}
```

- 优势：
  - 无 Provider，直接在组件中使用
  - 支持中间件（持久化、日志等）
  - 体积小（约 1KB gzipped）
  - 支持 TypeScript 泛型

## 5. Jotai

- 原子化状态管理库，受 Recoil 启发但更轻量
- 安装：`npm install jotai`

```tsx
import { atom, useAtom } from 'jotai'

const countAtom = atom(0)

function Counter() {
  const [count, setCount] = useAtom(countAtom)
  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
}
```

- 特点：
  - 自下而上的状态管理（从原子开始）
  - 自动优化重渲染（只订阅使用的原子）
  - 支持派生原子（computed）
  - 适合需要细粒度状态控制的场景

## 6. Recoil

- Facebook 出品的原子化状态管理库
- 安装：`npm install recoil`

```tsx
import { atom, useRecoilState } from 'recoil'

const countState = atom({
  key: 'countState',
  default: 0,
})

function Counter() {
  const [count, setCount] = useRecoilState(countState)
  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
}
```

- 注意：Recoil 已较长时间未更新，新项目建议选择 Jotai 或 Zustand

## 7. TanStack Query

- 专注服务端状态管理的库（原 React Query），与客户端状态管理互补
- 安装：`npm install @tanstack/react-query`

```tsx
import { useQuery } from '@tanstack/react-query'

function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then((r) => r.json()),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error!</div>
  return (
    <ul>
      {data.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  )
}
```

- 核心能力：
  - 自动缓存和后台刷新
  - 请求去重
  - 乐观更新
  - 分页和无限滚动
- 推荐组合：TanStack Query（服务端状态）+ Zustand/Jotai（客户端状态）
