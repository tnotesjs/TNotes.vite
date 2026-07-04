# [0201. 从 Create React App 迁移](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0201.%20%E4%BB%8E%20Create%20React%20App%20%E8%BF%81%E7%A7%BB)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. CRA 与 Vite 差异](#3-cra-与-vite-差异)
- [4. 环境变量前缀](#4-环境变量前缀)
- [5. JSX 配置](#5-jsx-配置)
- [6. Testing 配置](#6-testing-配置)
- [7. PWA 迁移](#7-pwa-迁移)

<!-- endregion:toc -->

## 1. 本节内容

- 了解从 Create React App（CRA）迁移到 Vite 的关键步骤
- 掌握环境变量前缀、JSX 配置、测试配置的迁移方式

## 2. 评价

- CRA 已停止维护，迁移到 Vite 是必要的
- React 社区已全面转向 Vite

## 3. CRA 与 Vite 差异

| CRA                 | Vite                            |
| ------------------- | ------------------------------- |
| 基于 Webpack        | 原生 ESM + Rollup               |
| `react-scripts`     | `vite` + `@vitejs/plugin-react` |
| `REACT_APP_` 前缀   | `VITE_` 前缀                    |
| `public/index.html` | `index.html`（根目录）          |
| Jest 测试           | Vitest 测试                     |

## 4. 环境变量前缀

- `REACT_APP_` 改为 `VITE_`
- `process.env.REACT_APP_XXX` 改为 `import.meta.env.VITE_XXX`

## 5. JSX 配置

- CRA 使用 Babel 处理 JSX
- Vite 推荐使用 SWC（`@vitejs/plugin-react-swc`）：

```ts
import react from '@vitejs/plugin-react-swc'

export default defineConfig({ plugins: [react()] })
```

## 6. Testing 配置

- 从 Jest 迁移到 Vitest：

```ts
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
})
```

- Vitest 兼容 Jest API，大部分测试代码无需修改

## 7. PWA 迁移

- CRA 的 `service-worker.js` → `vite-plugin-pwa`
- 配置方式不同，但功能等价
