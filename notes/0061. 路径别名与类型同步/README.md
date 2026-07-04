# [0061. 路径别名与类型同步](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0061.%20%E8%B7%AF%E5%BE%84%E5%88%AB%E5%90%8D%E4%B8%8E%E7%B1%BB%E5%9E%8B%E5%90%8C%E6%AD%A5)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Vite `resolve.alias`](#3-vite-resolvealias)
- [4. TS `paths`](#4-ts-paths)
- [5. 自动同步方案](#5-自动同步方案)

<!-- endregion:toc -->

## 1. 本节内容

- 理解为什么路径别名需要在 Vite 和 TypeScript 两处同步配置
- 掌握手动同步和自动同步的方案
- 了解 `vite-tsconfig-paths` 等自动化工具

## 2. 评价

- 路径别名配置不同步是新手最容易踩的坑之一，理解原理后可以避免很多困惑
- 推荐使用 `vite-tsconfig-paths` 插件实现自动同步，减少维护成本

## 3. Vite `resolve.alias`

- 在 `vite.config.ts` 中配置，负责**运行时**的模块路径解析：

```ts
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
```

- 作用：将 `import { foo } from '@/utils/foo'` 中的 `@/` 解析为 `src/` 的实际路径
- 如果只配了这里，运行正常但 IDE 会报红（TypeScript 找不到模块）

## 4. TS `paths`

- 在 `tsconfig.json` 中配置，负责**类型检查**时的路径解析：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

- 作用：告诉 TypeScript `@/` 别名对应 `src/` 目录，消除 IDE 中的红色波浪线
- 如果只配了这里，IDE 不报红但运行时路径解析会失败

- **两处配置缺一不可**：
  - 只有 `resolve.alias`：运行正常，IDE 报红
  - 只有 `tsconfig.json` paths：IDE 正常，运行时失败
  - 两处都配：IDE 和运行时都正常 ✅

## 5. 自动同步方案

- 手动维护两处配置容易遗漏或不一致，推荐使用自动化方案：
- **方案一：`vite-tsconfig-paths` 插件**（推荐）

```bash
npm install -D vite-tsconfig-paths
```

```ts
// vite.config.ts
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
})
```

- 效果：自动读取 `tsconfig.json` 的 `paths` 配置，同步到 Vite 的 `resolve.alias`
- 只需在 `tsconfig.json` 中维护一处配置即可

- **方案二：读取 tsconfig.json 手动解析**

```ts
import { readFileSync } from 'fs'
import { resolve } from 'path'

const tsconfig = JSON.parse(readFileSync('./tsconfig.json', 'utf-8'))
const paths = tsconfig.compilerOptions?.paths || {}

const alias = Object.fromEntries(
  Object.entries(paths).map(([key, value]) => [
    key.replace('/*', ''),
    resolve(__dirname, (value as string[])[0].replace('/*', '')),
  ]),
)

export default defineConfig({
  resolve: { alias },
})
```

- 方案二更灵活但更复杂，推荐直接使用方案一的 `vite-tsconfig-paths`
