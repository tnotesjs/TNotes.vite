# [0159. base 配置](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0159.%20base%20%E9%85%8D%E7%BD%AE)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 根路径部署](#3-根路径部署)
- [4. 子路径部署](#4-子路径部署)
- [5. CDN 路径](#5-cdn-路径)
- [6. 相对路径部署](#6-相对路径部署)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 `base` 配置在不同部署场景下的设置方式
- 掌握根路径、子路径、CDN 路径的配置方法

## 2. 评价

- `base` 配置错误会导致资源加载 404，是部署时最常见的问题

## 3. 根路径部署

- 部署到域名根路径时，`base` 为 `'/'`（默认值）：

```ts
export default defineConfig({
  base: '/',
})
```

- 访问地址：`https://example.com/`

## 4. 子路径部署

- 部署到域名的子路径时，`base` 需要设置为子路径：

```ts
export default defineConfig({
  base: '/my-app/',
})
```

- 访问地址：`https://example.com/my-app/`
- 典型场景：GitHub Pages、公司内网的子目录部署

## 5. CDN 路径

- 将资源部署到 CDN 时，`base` 设置为 CDN 地址：

```ts
export default defineConfig({
  base: 'https://cdn.example.com/assets/',
})
```

- HTML 中的所有资源引用都会加上 CDN 前缀
- HTML 文件本身仍部署在源站

## 6. 相对路径部署

- 使用 `'./'` 作为相对路径：

```ts
export default defineConfig({
  base: './',
})
```

- 优势：不需要知道部署路径，灵活性高
- 缺点：某些场景下可能有兼容问题（如 History 模式的路由）
