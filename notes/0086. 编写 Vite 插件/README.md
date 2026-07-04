# [0086. 编写 Vite 插件](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0086.%20%E7%BC%96%E5%86%99%20Vite%20%E6%8F%92%E4%BB%B6)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 最小插件示例](#3-最小插件示例)
- [4. 虚拟模块](#4-虚拟模块)
- [5. 转换源码](#5-转换源码)
- [6. 修改 HTML](#6-修改-html)
- [7. 自定义 HMR](#7-自定义-hmr)
- [8. 开发环境与构建环境区分](#8-开发环境与构建环境区分)

<!-- endregion:toc -->

## 1. 本节内容

- 掌握编写 Vite 插件的基本方法
- 了解虚拟模块、源码转换、HTML 修改、自定义 HMR 等常见模式
- 理解开发环境与构建环境的区分方式

## 2. 评价

- 编写 Vite 插件是进阶技能，大部分项目使用社区插件即可
- 理解插件编写有助于深入理解 Vite 的工作原理

## 3. 最小插件示例

- 一个最简单的 Vite 插件只需一个包含 `name` 属性的对象：

```ts
function myPlugin() {
  return {
    name: 'my-plugin',
    // 可选：添加钩子函数
    transform(code, id) {
      return code
    },
  }
}

export default defineConfig({
  plugins: [myPlugin()],
})
```

- `name` 属性是必填的，用于在日志和调试中标识插件

## 4. 虚拟模块

- 虚拟模块是内存中不存在于文件系统的模块
- 通过 `resolveId` + `load` 钩子实现：

```ts
function virtualModulePlugin() {
  return {
    name: 'virtual-module',
    resolveId(source) {
      if (source === 'virtual:config') {
        return '\0virtual:config' // \0 前缀是约定，表示虚拟模块
      }
    },
    load(id) {
      if (id === '\0virtual:config') {
        return `export default ${JSON.stringify({ version: '1.0' })}`
      }
    },
  }
}
```

- 使用：`import config from 'virtual:config'`
- 典型用途：自动生成配置、运行时信息注入

## 5. 转换源码

- 使用 `transform` 钩子修改模块源码：

```ts
function envReplacePlugin() {
  return {
    name: 'env-replace',
    transform(code, id) {
      // 只处理 src 目录下的文件
      if (id.includes('/src/')) {
        return code.replace(
          '__BUILD_TIME__',
          JSON.stringify(new Date().toISOString()),
        )
      }
    },
  }
}
```

- 注意：返回 `null` 或 `undefined` 表示不修改该模块

## 6. 修改 HTML

- 使用 `transformIndexHtml` 钩子修改 `index.html`：

```ts
function htmlMetaPlugin() {
  return {
    name: 'html-meta',
    transformIndexHtml(html) {
      return html.replace(
        '<head>',
        `<head>
          <meta name="author" content="My Company">
          <link rel="icon" href="/favicon.ico">`,
      )
    },
  }
}
```

- 也可以返回操作数组（更结构化的方式）：

```ts
transformIndexHtml() {
  return [
    { tag: 'meta', attrs: { name: 'author', content: 'My Company' }, injectTo: 'head' },
  ]
}
```

## 7. 自定义 HMR

- 使用 `handleHotUpdate` 钩子自定义 HMR 行为：

```ts
function customHmrPlugin() {
  return {
    name: 'custom-hmr',
    handleHotUpdate({ file, server }) {
      // 监听自定义文件类型
      if (file.endsWith('.data')) {
        server.ws.send({
          type: 'custom',
          event: 'data-update',
          data: { file },
        })
        return [] // 阻止默认 HMR
      }
    },
  }
}
```

- 客户端监听自定义事件：

```ts
if (import.meta.hot) {
  import.meta.hot.on('data-update', (data) => {
    console.log('Data file updated:', data)
    // 自定义更新逻辑
  })
}
```

## 8. 开发环境与构建环境区分

- 通过 `config` 钩子的 `command` 参数区分：

```ts
function myPlugin() {
  let isDev = false

  return {
    name: 'my-plugin',
    config(config, { command }) {
      isDev = command === 'serve'
    },
    transform(code, id) {
      if (isDev) {
        // 开发环境特有的逻辑
        return code + '\nconsole.log("dev mode")'
      }
      // 生产环境的逻辑
      return code
    },
  }
}
```
