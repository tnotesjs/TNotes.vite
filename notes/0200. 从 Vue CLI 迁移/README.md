# [0200. 从 Vue CLI 迁移](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0200.%20%E4%BB%8E%20Vue%20CLI%20%E8%BF%81%E7%A7%BB)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Vue CLI 与 Vite 差异](#3-vue-cli-与-vite-差异)
- [4. `vue.config.js` 迁移](#4-vueconfigjs-迁移)
- [5. 环境变量迁移](#5-环境变量迁移)
- [6. 插件迁移](#6-插件迁移)
- [7. 构建配置迁移](#7-构建配置迁移)

<!-- endregion:toc -->

## 1. 本节内容

- 了解从 Vue CLI 迁移到 Vite 的关键步骤
- 掌握 `vue.config.js`、环境变量、插件、构建配置的迁移方式

## 2. 评价

- Vue CLI 已停止维护，迁移到 Vite 是必要的
- Vue 官方推荐所有 Vue 3 项目使用 Vite

## 3. Vue CLI 与 Vite 差异

| Vue CLI             | Vite                          |
| ------------------- | ----------------------------- |
| 基于 Webpack        | 原生 ESM + Rollup             |
| `vue.config.js`     | `vite.config.ts`              |
| `@vue/cli-service`  | `vite` + `@vitejs/plugin-vue` |
| `VUE_APP_` 前缀     | `VITE_` 前缀                  |
| `public/index.html` | `index.html`（根目录）        |

## 4. `vue.config.js` 迁移

```ts
// Vue CLI → vue.config.js
module.exports = {
  publicPath: '/app/',
  devServer: { port: 3000, proxy: { '/api': 'http://localhost:8080' } },
}

// Vite → vite.config.ts
export default defineConfig({
  base: '/app/',
  server: { port: 3000, proxy: { '/api': 'http://localhost:8080' } },
})
```

## 5. 环境变量迁移

- `VUE_APP_` 前缀改为 `VITE_` 前缀
- `process.env.VUE_APP_XXX` 改为 `import.meta.env.VITE_XXX`
- `.env.development` / `.env.production` 文件保持不变

## 6. 插件迁移

- Vue CLI 插件 → Vite 插件：
  - `@vue/cli-plugin-typescript` → Vite 内置 TS 支持
  - `@vue/cli-plugin-router` → 直接使用 `vue-router`
  - `@vue/cli-plugin-vuex` / `pinia` → 直接使用
  - `@vue/cli-plugin-eslint` → `vite-plugin-eslint`

## 7. 构建配置迁移

- `chainWebpack` / `configureWebpack` → `vite.config.ts` 的对应配置
- `css.loaderOptions` → `css.preprocessorOptions`
- `transpileDependencies` → `optimizeDeps.include`
