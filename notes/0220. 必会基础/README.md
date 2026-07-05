# [0220. 必会基础](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0220.%20%E5%BF%85%E4%BC%9A%E5%9F%BA%E7%A1%80)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `create-vite`](#3-create-vite)
- [4. `vite.config.ts`](#4-viteconfigts)
- [5. `server.proxy`](#5-serverproxy)
- [6. `resolve.alias`](#6-resolvealias)
- [7. `.env`](#7-env)
- [8. `import.meta.env`](#8-importmetaenv)
- [9. 静态资源导入](#9-静态资源导入)
- [10. CSS Modules](#10-css-modules)
- [11. TypeScript 配置](#11-typescript-配置)

<!-- endregion:toc -->

## 1. 本节内容

- Vite 必会基础知识速查
- 覆盖项目创建、配置文件、代理、别名、环境变量、静态资源、CSS、TypeScript

## 2. 评价

- 这些是 Vite 开发的最低要求，必须熟练掌握

## 3. `create-vite`

- `npm create vite@latest my-app -- --template vue-ts`

## 4. `vite.config.ts`

- 使用 `defineConfig` 获得类型提示
- 支持对象形式和函数形式

## 5. `server.proxy`

- 开发环境 API 代理：`server: { proxy: { '/api': 'http://localhost:8080' } }`

## 6. `resolve.alias`

- 路径别名：`resolve: { alias: { '@': resolve(__dirname, 'src') } }`
- 需要同步配置 `tsconfig.json` 的 `paths`

## 7. `.env`

- `.env`（所有环境）、`.env.development`、`.env.production`
- `.env.local` 加入 `.gitignore`

## 8. `import.meta.env`

- 内置变量：`MODE`、`BASE_URL`、`DEV`、`PROD`、`SSR`
- 自定义变量以 `VITE_` 开头

## 9. 静态资源导入

- `import img from './img.png'` 返回 URL
- `import text from './file?raw'` 返回字符串

## 10. CSS Modules

- `.module.css` 后缀自动启用 CSS Modules
- 支持 `.module.scss`、`.module.less`

## 11. TypeScript 配置

- Vite 使用 Oxc 转换器转译 TS，只转译不检查
- 类型检查交给 IDE 和 `tsc --noEmit`
