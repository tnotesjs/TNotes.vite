# [0115. 库模式配置](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0115.%20%E5%BA%93%E6%A8%A1%E5%BC%8F%E9%85%8D%E7%BD%AE)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `build.lib`](#3-buildlib)
- [4. `entry`](#4-entry)
- [5. `name`](#5-name)
- [6. `formats`](#6-formats)
- [7. `fileName`](#7-filename)

<!-- endregion:toc -->

## 1. 本节内容

- 掌握 Vite 库模式的各项配置选项
- 了解 `build.lib` 下各配置项的作用

## 2. 评价

- 库模式配置简洁明了，几个核心选项即可覆盖大部分场景

## 3. `build.lib`

- 启用库模式的顶层配置：

```ts
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'MyLib',
      formats: ['es', 'umd'],
      fileName: (format) => `my-lib.${format}.js`,
    },
  },
})
```

## 4. `entry`

- 库的入口文件，可以是 JS/TS 文件
- 通常为 `src/index.ts`，导出库的公共 API

```ts
lib: {
  entry: 'src/index.ts',
}
```

## 5. `name`

- UMD 格式下的全局变量名
- 当通过 `<script>` 标签引入时，可以通过此名称访问库

```ts
lib: {
  name: 'MyLib',
}
```

```html
<script src="https://cdn.example.com/my-lib.umd.js"></script>
<script>
  console.log(window.MyLib) // 访问库
</script>
```

## 6. `formats`

- 指定输出格式，可选值：`'es'`、`'cjs'`、`'umd'`、`'iife'`

```ts
lib: {
  formats: ['es', 'umd'],
}
```

- 推荐至少输出 `es` 和 `umd` 两种格式

## 7. `fileName`

- 自定义输出文件名，可以是字符串或函数

```ts
lib: {
  // 固定文件名
  fileName: 'my-lib',

  // 按格式区分文件名（推荐）
  fileName: (format) => `my-lib.${format}.js`,
}
```
