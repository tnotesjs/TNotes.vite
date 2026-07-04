# [0176. Monorepo 基础](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0176.%20Monorepo%20%E5%9F%BA%E7%A1%80)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Monorepo 是什么](#3-monorepo-是什么)
- [4. 优势与问题](#4-优势与问题)
- [5. 适用场景](#5-适用场景)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Monorepo 的基本概念
- 理解 Monorepo 的优势和挑战
- 掌握 Monorepo 的适用场景

## 2. 评价

- Monorepo 是大型项目的推荐架构模式
- pnpm workspace + Turborepo 是当前最流行的 Monorepo 技术栈

## 3. Monorepo 是什么

- Monorepo（单一仓库）：将多个项目/包放在同一个 Git 仓库中管理
- 与 Multirepo（多仓库）的对比：
  - Monorepo：一个仓库，多个包
  - Multirepo：多个仓库，每个仓库一个包
- 典型结构：

```
my-project/
├── packages/
│   ├── shared/          # 共享工具库
│   ├── ui/              # UI 组件库
│   └── utils/           # 工具函数
├── apps/
│   ├── web/             # Web 应用
│   └── admin/           # 管理后台
├── package.json
└── pnpm-workspace.yaml
```

## 4. 优势与问题

- 优势：
  - 代码共享方便，避免重复造轮子
  - 统一的版本管理和发布流程
  - 原子提交，跨包修改在一个 PR 中完成
  - 统一的工具链（ESLint、Prettier、TypeScript）
- 问题：
  - 仓库体积大，Git 操作变慢
  - 权限管理困难
  - CI/CD 配置复杂
  - 需要专门的构建工具支持

## 5. 适用场景

- 适合使用 Monorepo 的场景：
  - 多个应用共享组件库和工具库
  - 前后端在同一仓库中开发
  - 微前端的多个子应用
  - UI 组件库的开发和维护
- 不适合的场景：
  - 小型项目（单仓库更简单）
  - 团队分布在不同的组织（权限管理困难）
