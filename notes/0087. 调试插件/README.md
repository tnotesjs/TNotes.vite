# [0087. 调试插件](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0087.%20%E8%B0%83%E8%AF%95%E6%8F%92%E4%BB%B6)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 日志调试](#3-日志调试)
- [4. `vite-plugin-inspect`](#4-vite-plugin-inspect)
- [5. 钩子执行顺序分析](#5-钩子执行顺序分析)
- [6. 性能分析](#6-性能分析)

<!-- endregion:toc -->

## 1. 本节内容

- 了解调试 Vite 插件的常用方法
- 掌握 `vite-plugin-inspect` 的使用方式
- 了解钩子执行顺序分析和性能分析的技巧

## 2. 评价

- `vite-plugin-inspect` 是调试 Vite 插件的利器，强烈推荐安装
- 日志调试是最基本的方式，但 `inspect` 插件提供了更直观的可视化

## 3. 日志调试

- 在插件的钩子函数中使用 `console.log` 输出调试信息：

```ts
function myPlugin() {
  return {
    name: 'my-plugin',
    transform(code, id) {
      console.log(`[my-plugin] Transforming: ${id}`)
      console.log(`[my-plugin] Code length: ${code.length}`)
      return code
    },
  }
}
```

- 使用 `--debug` 标志启动 Vite 可以看到更详细的日志：

```bash
vite --debug
```

- Vite 内部的日志级别可以通过 `logLevel` 配置调整

## 4. `vite-plugin-inspect`

- 提供 Web 界面查看每个模块经过了哪些插件的处理
- 安装：`npm install -D vite-plugin-inspect`

```ts
import inspect from 'vite-plugin-inspect'

export default defineConfig({
  plugins: [inspect()],
})
```

- 访问 `http://localhost:5173/__inspect/` 查看插件转换结果
- 功能：
  - 查看每个模块的转换链（经过了哪些插件）
  - 对比转换前后的代码差异
  - 查看每个钩子的执行耗时
  - 搜索和过滤模块

## 5. 钩子执行顺序分析

- 使用日志输出钩子的执行顺序：

```ts
function debugPlugin(name: string) {
  return {
    name,
    config: () => console.log(`[${name}] config`),
    configResolved: () => console.log(`[${name}] configResolved`),
    buildStart: () => console.log(`[${name}] buildStart`),
    resolveId: (id: string) => {
      console.log(`[${name}] resolveId: ${id}`)
      return null
    },
    load: (id: string) => {
      console.log(`[${name}] load: ${id}`)
      return null
    },
    transform: (code: string, id: string) => {
      console.log(`[${name}] transform: ${id}`)
      return null
    },
    buildEnd: () => console.log(`[${name}] buildEnd`),
  }
}
```

- 通过日志可以清晰地看到各钩子的执行顺序和调用次数

## 6. 性能分析

- 使用 Node.js 的 `--prof` 标志进行性能分析：

```bash
node --prof ./node_modules/.bin/vite build
```

- 使用 `vite-plugin-inspect` 查看每个模块的转换耗时
- 常见的性能问题：
  - 插件的 `transform` 钩子处理了过多不必要的文件
  - 正则表达式匹配效率低
  - 同步操作阻塞了事件循环
- 优化建议：
  - 在 `transform` 中尽早 `return null` 跳过不需要处理的文件
  - 使用文件路径过滤（`include` / `exclude`）
  - 将耗时操作放到 `buildStart` 中一次性执行
