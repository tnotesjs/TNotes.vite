# [0136. 常用场景](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0136.%20%E5%B8%B8%E7%94%A8%E5%9C%BA%E6%99%AF)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 自动注册路由](#3-自动注册路由)
- [4. 自动导入模块](#4-自动导入模块)
- [5. 自动生成菜单](#5-自动生成菜单)
- [6. 自动加载 Markdown](#6-自动加载-markdown)
- [7. 自动收集组件](#7-自动收集组件)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 `import.meta.glob` 的常见应用场景
- 掌握自动注册路由、自动导入模块、自动生成菜单等实用技巧

## 2. 评价

- `import.meta.glob` 的应用场景非常广泛，掌握它可以大幅减少样板代码

## 3. 自动注册路由

- 使用 `import.meta.glob` 自动注册路由，无需手动维护路由表：

```ts
const routeModules = import.meta.glob('../views/**/*.vue', { eager: true })

const routes = Object.entries(routeModules).map(([path, mod]) => {
  const name = path.match(/\.\.\/views\/(.*)\.vue$/)?.[1]
  return {
    path: `/${name?.toLowerCase()}`,
    component: (mod as any).default,
  }
})
```

## 4. 自动导入模块

- 批量导入工具函数或配置文件：

```ts
const utils = import.meta.glob('./utils/*.ts', { eager: true })

// 所有工具函数自动注册
for (const path in utils) {
  const mod = utils[path] as any
  // 使用 mod.default 或具名导出
}
```

## 5. 自动生成菜单

- 根据目录结构自动生成导航菜单：

```ts
const pages = import.meta.glob('../pages/**/meta.ts', { eager: true })

const menu = Object.entries(pages).map(([path, mod]) => ({
  path: path.replace(/\.\.\/pages\//, '').replace(/\/meta\.ts/, ''),
  ...(mod as any).default,
}))
```

## 6. 自动加载 Markdown

- 批量加载 Markdown 文件（适用于文档站点）：

```ts
const docs = import.meta.glob('../docs/*.md', { eager: true })

const articles = Object.entries(docs).map(([path, mod]) => ({
  slug: path.match(/\.\.\/docs\/(.*)\.md$/)?.[1],
  content: (mod as any).default,
}))
```

## 7. 自动收集组件

- 自动注册全局组件：

```ts
const components = import.meta.glob('./components/**/*.vue', { eager: true })

for (const path in components) {
  const mod = components[path] as any
  const name = path.match(/\.\/components\/(.*)\.vue$/)?.[1]
  app.component(name!, mod.default)
}
```
