# [0199. 从 Webpack 迁移](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0199.%20%E4%BB%8E%20Webpack%20%E8%BF%81%E7%A7%BB)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 配置思想差异](#3-配置思想差异)
- [4. Loader 到 Plugin 的迁移](#4-loader-到-plugin-的迁移)
- [5. Alias 迁移](#5-alias-迁移)
- [6. DefinePlugin 迁移](#6-defineplugin-迁移)
- [7. 静态资源迁移](#7-静态资源迁移)
- [8. 环境变量迁移](#8-环境变量迁移)

<!-- endregion:toc -->

## 1. 本节内容

- 了解从 Webpack 迁移到 Vite 的关键差异
- 掌握 Loader、Alias、DefinePlugin、静态资源、环境变量的迁移方式

## 2. 评价

- Webpack 到 Vite 的迁移是值得的，开发体验会有质的提升
- 大部分 Webpack 配置都有对应的 Vite 方案

## 3. 配置思想差异

| Webpack             | Vite                       |
| ------------------- | -------------------------- |
| 需要大量配置        | 开箱即用，合理默认值       |
| 开发时全量打包      | 开发时不打包，ESM 按需加载 |
| Loader 处理文件     | 插件处理文件               |
| `webpack.config.js` | `vite.config.ts`           |

## 4. Loader 到 Plugin 的迁移

- Webpack Loader 的对应关系：
  - `babel-loader` → `@vitejs/plugin-react`（Vite 内置 Oxc 转换器）
  - `ts-loader` → Vite 内置支持
  - `css-loader` → Vite 内置支持
  - `sass-loader` → 安装 `sass` 即可
  - `file-loader` / `url-loader` → Vite 内置支持
  - `vue-loader` → `@vitejs/plugin-vue`

## 5. Alias 迁移

```ts
// Webpack
resolve: { alias: { '@': path.resolve(__dirname, 'src') } }

// Vite
resolve: { alias: { '@': resolve(__dirname, 'src') } }
```

## 6. DefinePlugin 迁移

```ts
// Webpack
new webpack.DefinePlugin({ __APP_VERSION__: JSON.stringify('1.0') })

// Vite
define: {
  __APP_VERSION__: JSON.stringify('1.0')
}
```

## 7. 静态资源迁移

- Webpack 中使用 `import img from './img.png'` 需要配置 loader
- Vite 中直接 `import`，开箱即用
- Webpack 的 `public/` 目录对应 Vite 的 `public/` 目录

## 8. 环境变量迁移

```ts
// Webpack
process.env.REACT_APP_API_URL

// Vite
import.meta.env.VITE_API_URL
```

- 前缀从 `REACT_APP_` / `VUE_APP_` 变为 `VITE_`
