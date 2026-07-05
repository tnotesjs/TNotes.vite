# [0084. 插件钩子](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0084.%20%E6%8F%92%E4%BB%B6%E9%92%A9%E5%AD%90)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `config`](#3-config)
- [4. `configResolved`](#4-configresolved)
- [5. `configureServer`](#5-configureserver)
- [6. `configurePreviewServer`](#6-configurepreviewserver)
- [7. `transformIndexHtml`](#7-transformindexhtml)
- [8. `resolveId`](#8-resolveid)
- [9. `load`](#9-load)
- [10. `transform`](#10-transform)
- [11. `handleHotUpdate`](#11-handlehotupdate)
- [12. `buildStart`](#12-buildstart)
- [13. `buildEnd`](#13-buildend)
- [14. `closeBundle`](#14-closebundle)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 插件的常用钩子（Hooks）
- 掌握各钩子的执行时机和用途
- 理解通用钩子和 Vite 特有钩子的区别

## 2. 评价

- 钩子是插件系统的核心，理解钩子才能正确编写或调试插件
- 日常使用中最常用的钩子是 `transform`、`transformIndexHtml`、`configureServer`

## 3. `config`

- 执行时机：解析 Vite 配置之前
- 用途：修改或返回部分配置
- 类型：Vite 特有钩子

```ts
{
  name: 'my-plugin',
  config(config, { command, mode }) {
    return {
      define: { __VERSION__: '"1.0.0"' },
    }
  },
}
```

## 4. `configResolved`

- 执行时机：配置解析完成之后
- 用途：读取最终的配置值，做一些初始化工作
- 类型：Vite 特有钩子

```ts
{
  name: 'my-plugin',
  configResolved(config) {
    // config 是最终合并后的完整配置
    console.log('Build target:', config.build.target)
  },
}
```

## 5. `configureServer`

- 执行时机：Dev Server 创建后
- 用途：向 Dev Server 添加中间件、拦截请求
- 类型：Vite 特有钩子

```ts
{
  name: 'my-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/api/hello') {
        res.end('Hello from plugin!')
      } else {
        next()
      }
    })
  },
}
```

## 6. `configurePreviewServer`

- 执行时机：预览服务器创建后
- 用途：向预览服务器添加中间件
- 类型：Vite 特有钩子，与 `configureServer` 类似但用于 `vite preview`

## 7. `transformIndexHtml`

- 执行时机：处理 `index.html` 时
- 用途：修改 HTML 内容（注入脚本、添加 meta 标签等）
- 类型：Vite 特有钩子

```ts
{
  name: 'my-plugin',
  transformIndexHtml(html) {
    return html.replace(
      '<head>',
      '<head><meta name="description" content="My App">'
    )
  },
}
```

## 8. `resolveId`

- 执行时机：模块解析阶段
- 用途：自定义模块路径解析逻辑
- 类型：通用 Rollup 钩子

```ts
{
  name: 'my-plugin',
  resolveId(source) {
    if (source === 'virtual:my-module') {
      return '\0virtual:my-module' // \0 前缀表示虚拟模块
    }
  },
}
```

## 9. `load`

- 执行时机：模块加载阶段（`resolveId` 之后）
- 用途：返回自定义的模块内容
- 类型：通用 Rollup 钩子

```ts
{
  name: 'my-plugin',
  load(id) {
    if (id === '\0virtual:my-module') {
      return 'export default "Hello from virtual module!"'
    }
  },
}
```

## 10. `transform`

- 执行时机：模块代码转换阶段（`load` 之后）
- 用途：修改模块的源代码
- 类型：通用 Rollup 钩子（最常用）

```ts
{
  name: 'my-plugin',
  transform(code, id) {
    // 只处理 .ts 文件
    if (id.endsWith('.ts')) {
      return code.replace('__DEV__', JSON.stringify(process.env.NODE_ENV === 'development'))
    }
  },
}
```

## 11. `handleHotUpdate`

- 执行时机：文件变化触发 HMR 时
- 用途：自定义 HMR 更新行为
- 类型：Vite 特有钩子

```ts
{
  name: 'my-plugin',
  handleHotUpdate({ file, server }) {
    if (file.endsWith('.custom')) {
      // 自定义 HMR 更新逻辑
      server.ws.send({ type: 'custom', event: 'custom-update' })
      return [] // 返回空数组阻止默认 HMR 行为
    }
  },
}
```

## 12. `buildStart`

- 执行时机：构建开始时
- 用途：执行初始化操作
- 类型：通用 Rollup 钩子

## 13. `buildEnd`

- 执行时机：构建结束时（`generateBundle` 之前）
- 用途：清理资源、输出构建报告
- 类型：通用 Rollup 钩子

## 14. `closeBundle`

- 执行时机：所有产物写入完成后
- 用途：最终的清理和通知操作
- 类型：通用 Rollup 钩子
