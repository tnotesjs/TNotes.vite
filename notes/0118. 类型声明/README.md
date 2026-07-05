# [0118. 类型声明](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0118.%20%E7%B1%BB%E5%9E%8B%E5%A3%B0%E6%98%8E)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `.d.ts` 生成](#3-dts-生成)
- [4. `vite-plugin-dts`](#4-vite-plugin-dts)
- [5. TypeScript 声明文件](#5-typescript-声明文件)
- [6. 类型入口配置](#6-类型入口配置)

<!-- endregion:toc -->

## 1. 本节内容

- 了解如何为库生成 TypeScript 类型声明文件
- 掌握 `vite-plugin-dts` 的使用方式
- 理解 `package.json` 中类型入口的配置

## 2. 评价

- 类型声明是高质量库的标配，TypeScript 用户依赖类型声明获得智能提示
- `vite-plugin-dts` 是最常用的类型声明生成工具

## 3. `.d.ts` 生成

- Vite 库模式不会自动生成 `.d.ts` 类型声明文件
- 需要使用 `vite-plugin-dts` 插件：

```bash
npm install -D vite-plugin-dts
```

```ts
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [dts({ include: ['src'] })],
})
```

- 构建后会在输出目录生成对应的 `.d.ts` 文件

## 4. `vite-plugin-dts`

- 自动从 TypeScript 源码中提取类型声明
- 常用配置：

```ts
dts({
  include: ['src'],
  exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
  outDir: 'dist/types',
  rollupTypes: true, // 将所有类型合并为单个文件
})
```

- `rollupTypes: true` 会将分散的类型声明合并为一个 `.d.ts` 文件，便于分发

## 5. TypeScript 声明文件

- 构建产物目录结构示例：

```
dist/
├── my-lib.es.js
├── my-lib.umd.js
├── style.css
└── index.d.ts      # 类型声明文件
```

- 消费者通过 `import { xxx } from 'my-lib'` 时，IDE 会自动读取类型声明

## 6. 类型入口配置

- 在 `package.json` 中声明类型入口：

```json
{
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/my-lib.es.js",
      "require": "./dist/my-lib.umd.js"
    }
  }
}
```

- `types` 字段应放在 `exports` 的每个条件的最前面（TypeScript 的解析规则）
