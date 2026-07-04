# [0180. Monorepo 工程实践](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0180.%20Monorepo%20%E5%B7%A5%E7%A8%8B%E5%AE%9E%E8%B7%B5)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 共享组件库](#3-共享组件库)
- [4. 共享工具库](#4-共享工具库)
- [5. 共享 ESLint 配置](#5-共享-eslint-配置)
- [6. 共享 TSConfig](#6-共享-tsconfig)
- [7. 统一发布](#7-统一发布)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Monorepo 的工程化最佳实践
- 掌握共享组件库、工具库、ESLint 配置、TSConfig 的组织方式

## 2. 评价

- Monorepo 的核心价值在于代码和配置的共享
- 良好的工程实践可以最大化 Monorepo 的收益

## 3. 共享组件库

- 将通用组件抽取为独立的包：

```
packages/
└── ui/
    ├── src/
    │   ├── Button.vue
    │   ├── Input.vue
    │   └── index.ts
    ├── package.json
    └── vite.config.ts
```

- 在应用中引用：`import { Button } from '@my/ui'`
- 使用 Vite 库模式构建组件库

## 4. 共享工具库

- 将通用工具函数抽取为独立的包：

```
packages/
└── utils/
    ├── src/
    │   ├── format.ts
    │   ├── request.ts
    │   └── index.ts
    ├── package.json
    └── tsconfig.json
```

## 5. 共享 ESLint 配置

- 创建共享的 ESLint 配置包：

```ts
// packages/eslint-config/index.js
export default {
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
}
```

- 在各应用中继承：`extends: ['@my/eslint-config']`

## 6. 共享 TSConfig

- 创建共享的 TypeScript 配置：

```json
// packages/tsconfig/base.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

- 在各应用中继承：`"extends": "@my/tsconfig/base.json"`

## 7. 统一发布

- 使用 Changesets 管理版本和发布：

```bash
npx changeset        # 创建变更集
npx changeset version # 更新版本号
npx changeset publish # 发布到 npm
```

- Changesets 的优势：
  - 自动根据变更集生成 CHANGELOG
  - 支持语义化版本
  - 支持批量发布多个包
