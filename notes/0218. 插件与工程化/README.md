# [0218. 插件与工程化](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0218.%20%E6%8F%92%E4%BB%B6%E4%B8%8E%E5%B7%A5%E7%A8%8B%E5%8C%96)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 使用常见插件](#3-使用常见插件)
- [4. 编写简单插件](#4-编写简单插件)
- [5. ESLint / Prettier](#5-eslint--prettier)
- [6. Vitest](#6-vitest)
- [7. CI/CD](#7-cicd)

<!-- endregion:toc -->

## 1. 本节内容

- Vite 插件与工程化的速查清单
- 覆盖常用插件、自定义插件、ESLint/Prettier、Vitest、CI/CD

## 2. 评价

- 工程化是保障团队协作效率和代码质量的基石

## 3. 使用常见插件

- `@vitejs/plugin-vue` / `@vitejs/plugin-react-swc`：框架支持
- `unplugin-auto-import`：API 自动导入
- `unplugin-vue-components`：组件自动注册
- `vite-plugin-mock`：Mock 数据

## 4. 编写简单插件

```ts
function myPlugin() {
  return {
    name: 'my-plugin',
    transform(code, id) {
      /* 修改代码 */
    },
    transformIndexHtml(html) {
      /* 修改 HTML */
    },
  }
}
```

## 5. ESLint / Prettier

- ESLint v9+ 使用 Flat Config（`eslint.config.js`）
- Prettier 配置 `.prettierrc`
- `eslint-config-prettier` 关闭冲突规则

## 6. Vitest

- `npm install -D vitest`
- 与 Vite 共享配置，支持 TypeScript、Vue、React
- `vitest run --coverage` 统计覆盖率

## 7. CI/CD

- GitHub Actions / GitLab CI 自动化构建和部署
- Husky + lint-staged 在提交前检查代码
- Changesets 管理版本和发布
