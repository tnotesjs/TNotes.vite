# [0038. JSON 配置](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0038.%20JSON%20%E9%85%8D%E7%BD%AE)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `json.namedExports`](#3-jsonnamedexports)
- [4. `json.stringify`](#4-jsonstringify)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 处理 JSON 文件的配置选项
- 理解 `json.namedExports` 和 `json.stringify` 的作用和区别

## 2. 评价

- JSON 配置项使用场景较少，大部分项目保持默认值即可
- `json.stringify: true` 在处理大型 JSON 文件时可以提升性能

## 3. `json.namedExports`

- 默认为 `true`
- 启用后，Vite 会将 JSON 对象的顶层键作为具名导出（Named Exports）

```json
// data.json
{ "name": "Vite", "version": "6.0" }
```

```ts
// 具名导入（namedExports: true 时可用）
import { name, version } from './data.json'

// 默认导入（始终可用）
import data from './data.json'
```

- 设为 `false` 后只能使用默认导入
- 注意：具名导入只适用于顶层键是合法 JavaScript 标识符的情况

## 4. `json.stringify`

- 默认为 `'auto'`（当数据大于 10kB 时才会进行字符串化处理）
- 设为 `true` 后，Vite 会将 JSON 文件作为字符串而非对象内联
- 典型用途：
  - 大型 JSON 文件：避免被内联为 JavaScript 对象，减少 AST 解析开销
  - 需要原样保留 JSON 格式的场景（如配置文件模板）

```ts
export default defineConfig({
  json: {
    stringify: true,
  },
})
```

- 设为 `true` 后，只能使用 `import json from './data.json'` 获取字符串，不能再使用具名导入
