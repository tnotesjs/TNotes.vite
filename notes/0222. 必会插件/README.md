# [0222. 必会插件](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0222.%20%E5%BF%85%E4%BC%9A%E6%8F%92%E4%BB%B6)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 官方框架插件](#3-官方框架插件)
- [4. 自动导入插件](#4-自动导入插件)
- [5. Mock 插件](#5-mock-插件)
- [6. PWA 插件](#6-pwa-插件)
- [7. Inspect 插件](#7-inspect-插件)
- [8. 自定义插件基础](#8-自定义插件基础)

<!-- endregion:toc -->

## 1. 本节内容

- Vite 必会插件速查
- 覆盖官方框架插件、自动导入、Mock、PWA、Inspect、自定义插件

## 2. 评价

- 掌握常用插件可以大幅提升开发效率

## 3. 官方框架插件

- Vue：`@vitejs/plugin-vue` + `@vitejs/plugin-vue-jsx`
- React：`@vitejs/plugin-react-swc`（推荐）
- Legacy：`@vitejs/plugin-legacy`（旧浏览器兼容）

## 4. 自动导入插件

- `unplugin-auto-import`：API 自动导入（Vue/React Hooks 等）
- `unplugin-vue-components`：组件自动注册
- `unplugin-icons`：图标自动导入

## 5. Mock 插件

- `vite-plugin-mock`：基于 Mock.js 的数据 Mock
- MSW：Service Worker 拦截请求

## 6. PWA 插件

- `vite-plugin-pwa`：自动生成 Service Worker 和 Manifest

## 7. Inspect 插件

- `vite-plugin-inspect`：检查插件转换结果
- 访问 `http://localhost:5173/__inspect/`

## 8. 自定义插件基础

```ts
function myPlugin() {
  return {
    name: 'my-plugin',
    transform(code, id) {
      return code
    },
    transformIndexHtml(html) {
      return html
    },
  }
}
```
