# [0189. 后端模板集成](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0189.%20%E5%90%8E%E7%AB%AF%E6%A8%A1%E6%9D%BF%E9%9B%86%E6%88%90)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 后端渲染 HTML](#3-后端渲染-html)
- [4. Vite Manifest](#4-vite-manifest)
- [5. 静态资源注入](#5-静态资源注入)
- [6. 开发环境中间件](#6-开发环境中间件)

<!-- endregion:toc -->

## 1. 本节内容

- 了解后端模板引擎与 Vite 的集成方式
- 掌握 Vite Manifest 文件的使用方法

## 2. 评价

- 后端模板集成适合需要服务端渲染 HTML 的传统项目
- Vite Manifest 是连接前后端的桥梁

## 3. 后端渲染 HTML

- 后端使用模板引擎（如 EJS、Jinja2、Blade）渲染 HTML
- 在模板中引用 Vite 构建的资源：

```html
<!-- 需要通过 Vite Manifest 获取实际的文件路径 -->
<link rel="stylesheet" href="/assets/index-[hash].css" />
<script type="module" src="/assets/index-[hash].js"></script>
```

## 4. Vite Manifest

- 开启 Manifest 生成：

```ts
export default defineConfig({
  build: {
    manifest: true, // 生成 manifest.json
  },
})
```

- Manifest 文件内容：

```json
{
  "src/main.ts": {
    "file": "assets/main-[hash].js",
    "css": ["assets/main-[hash].css"]
  }
}
```

- 后端读取 Manifest 文件，获取资源的实际路径

## 5. 静态资源注入

- 在后端模板中动态注入资源路径：

```python
# Django 示例
import json
manifest = json.load(open('dist/.vite/manifest.json'))
main_js = manifest['src/main.ts']['file']
main_css = manifest['src/main.ts']['css'][0]
```

```html
<link rel="stylesheet" href="/{{ main_css }}" />
<script type="module" src="/{{ main_js }}"></script>
```

## 6. 开发环境中间件

- 开发时将 Vite Dev Server 作为后端的中间件：

```ts
// Express 示例
if (process.env.NODE_ENV === 'development') {
  const vite = await createServer({ server: { middlewareMode: true } })
  app.use(vite.middlewares)
} else {
  app.use(express.static('dist'))
}
```

- 开发时享受 Vite 的 HMR，生产时使用构建产物
