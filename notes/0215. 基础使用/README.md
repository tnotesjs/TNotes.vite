# [0215. 基础使用](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0215.%20%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 创建项目](#3-创建项目)
- [4. 理解目录结构](#4-理解目录结构)
- [5. 掌握常用命令](#5-掌握常用命令)
- [6. 使用环境变量](#6-使用环境变量)
- [7. 配置代理](#7-配置代理)
- [8. 配置路径别名](#8-配置路径别名)

<!-- endregion:toc -->

## 1. 本节内容

- Vite 基础使用的速查清单
- 覆盖项目创建、目录结构、常用命令、环境变量、代理和路径别名

## 2. 评价

- 这是一份 Vite 日常开发的速查手册，建议收藏备用

## 3. 创建项目

```bash
npm create vite@latest my-app -- --template vue-ts
cd my-app && pnpm install
```

## 4. 理解目录结构

- `index.html`：入口 HTML（根目录）
- `src/`：源码目录
- `public/`：静态资源（原样复制）
- `vite.config.ts`：配置文件

## 5. 掌握常用命令

- `pnpm dev`：启动开发服务器
- `pnpm build`：生产构建
- `pnpm preview`：预览构建产物

## 6. 使用环境变量

- `.env`、`.env.development`、`.env.production`
- 自定义变量以 `VITE_` 开头
- 代码中通过 `import.meta.env.VITE_XXX` 访问

## 7. 配置代理

```ts
server: { proxy: { '/api': 'http://localhost:8080' } }
```

## 8. 配置路径别名

```ts
resolve: { alias: { '@': resolve(__dirname, 'src') } }
```
