# [0224. 必会排错](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0224.%20%E5%BF%85%E4%BC%9A%E6%8E%92%E9%94%99)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 环境变量不生效](#3-环境变量不生效)
- [4. 路径别名不生效](#4-路径别名不生效)
- [5. 依赖预构建异常](#5-依赖预构建异常)
- [6. 构建资源 404](#6-构建资源-404)
- [7. 生产环境空白页](#7-生产环境空白页)
- [8. Node 版本问题](#8-node-版本问题)

<!-- endregion:toc -->

## 1. 本节内容

- Vite 常见问题的排查速查
- 覆盖环境变量、路径别名、依赖预构建、资源 404、白页、Node 版本等常见问题

## 2. 评价

- 这些是 Vite 开发中最常遇到的问题，建议收藏备用

## 3. 环境变量不生效

- 检查变量名是否有 `VITE_` 前缀
- 检查 `.env` 文件是否在项目根目录
- 修改 `.env` 后需要重启开发服务器
- `console.log(import.meta.env)` 查看所有变量

## 4. 路径别名不生效

- 确保 `vite.config.ts` 的 `resolve.alias` 和 `tsconfig.json` 的 `paths` 都配置了
- 两处配置缺一不可

## 5. 依赖预构建异常

- 删除 `node_modules/.vite` 缓存目录
- 使用 `vite --force` 强制重新预构建
- 检查 `optimizeDeps.include` / `exclude` 配置

## 6. 构建资源 404

- 检查 `base` 配置是否与部署路径一致
- 检查 Nginx/服务器的静态文件配置
- 查看浏览器 Network 面板中 404 资源的请求路径

## 7. 生产环境空白页

- 打开浏览器控制台查看 JS 错误
- 检查 `base` 配置
- 检查路由配置（BrowserRouter 的 basename）

## 8. Node 版本问题

- Vite 8 要求 Node.js >= 20.0.0
- 使用 `node -v` 检查版本
- 使用 `nvm` 管理多版本
