# [0085. 插件顺序控制](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0085.%20%E6%8F%92%E4%BB%B6%E9%A1%BA%E5%BA%8F%E6%8E%A7%E5%88%B6)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `enforce: 'pre'`](#3-enforce-pre)
- [4. `enforce: 'post'`](#4-enforce-post)
- [5. 普通插件](#5-普通插件)
- [6. 与 Rollup 插件顺序的关系](#6-与-rollup-插件顺序的关系)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 插件的执行顺序机制
- 掌握 `enforce` 选项控制插件执行顺序的方式
- 理解 Vite 插件与 Rollup 插件顺序的关系

## 2. 评价

- 插件顺序影响转换结果，理解顺序机制有助于排查插件间的冲突
- 大部分情况下不需要手动控制顺序，Vite 的默认行为已经足够

## 3. `enforce: 'pre'`

- 设置 `enforce: 'pre'` 的插件会在**核心插件之前**执行
- 适用场景：需要在 Vite 核心处理之前对代码进行预处理

```ts
{
  name: 'my-pre-plugin',
  enforce: 'pre',
  transform(code, id) {
    // 在 Vite 核心转换之前执行
    return code.replace(/foo/g, 'bar')
  },
}
```

- 典型用途：自定义文件解析、代码预处理

## 4. `enforce: 'post'`

- 设置 `enforce: 'post'` 的插件会在**核心插件之后**执行
- 适用场景：需要在所有其他插件处理完之后再做最终处理

```ts
{
  name: 'my-post-plugin',
  enforce: 'post',
  transform(code, id) {
    // 在所有其他插件处理完之后执行
    return code
  },
}
```

- 典型用途：代码压缩、最终的代码注入、产物分析

## 5. 普通插件

- 不设置 `enforce` 的插件在**核心插件和 `post` 插件之间**执行
- 这是大部分插件的默认行为
- 执行顺序：`pre` 插件 → Vite 核心插件 → 普通插件 → `post` 插件

## 6. 与 Rollup 插件顺序的关系

- 在生产构建阶段（Rollup），插件顺序同样由 `enforce` 控制
- Rollup 插件（不带 `enforce`）被视为普通插件
- 完整的执行顺序：
  1. `enforce: 'pre'` 的 Vite 插件
  2. Vite 核心插件
  3. 普通 Vite 插件 + Rollup 插件（按数组顺序）
  4. `enforce: 'post'` 的插件
- 同一个 `enforce` 级别内，按 `plugins` 数组的顺序执行

```ts
export default defineConfig({
  plugins: [
    pluginA(), // 普通，先执行
    { ...pluginB(), enforce: 'pre' }, // pre，最先执行
    pluginC(), // 普通，后执行
    { ...pluginD(), enforce: 'post' }, // post，最后执行
  ],
})
// 实际执行顺序：B → A → C → D
```
