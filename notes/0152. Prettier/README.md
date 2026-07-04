# [0152. Prettier](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0152.%20Prettier)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 格式化配置](#3-格式化配置)
- [4. 与 ESLint 配合](#4-与-eslint-配合)
- [5. 保存时格式化](#5-保存时格式化)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Prettier 的配置方式
- 掌握 Prettier 与 ESLint 的配合使用
- 了解保存时自动格式化的配置

## 2. 评价

- Prettier 负责代码格式化，ESLint 负责代码质量，两者互补
- 推荐所有项目使用 Prettier，统一代码风格

## 3. 格式化配置

- 安装：`npm install -D prettier`
- 配置文件 `.prettierrc`：

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

- 忽略文件 `.prettierignore`：

```
dist
node_modules
pnpm-lock.yaml
```

## 4. 与 ESLint 配合

- 使用 `eslint-config-prettier` 关闭 ESLint 中与 Prettier 冲突的规则：

```bash
npm install -D eslint-config-prettier
```

```ts
// eslint.config.js
import prettier from 'eslint-config-prettier'

export default [
  // ...其他配置
  prettier, // 放在最后，关闭冲突规则
]
```

- 不需要 `eslint-plugin-prettier`（在 ESLint 中运行 Prettier 会很慢）

## 5. 保存时格式化

- VS Code 配置（`.vscode/settings.json`）：

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

- 效果：保存文件时自动运行 Prettier 格式化 + ESLint 自动修复
