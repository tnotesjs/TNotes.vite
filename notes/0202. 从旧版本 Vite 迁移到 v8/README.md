# [0202. 从旧版本 Vite 迁移到 v8](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0202.%20%E4%BB%8E%E6%97%A7%E7%89%88%E6%9C%AC%20Vite%20%E8%BF%81%E7%A7%BB%E5%88%B0%20v8)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Breaking Changes](#3-breaking-changes)
- [4. 插件兼容性](#4-插件兼容性)
- [5. Node 版本要求](#5-node-版本要求)
- [6. 配置项变化](#6-配置项变化)
- [7. 依赖升级策略](#7-依赖升级策略)

<!-- endregion:toc -->

## 1. 本节内容

- 了解从旧版本 Vite 迁移到 v8 的关键变更
- 掌握 Breaking Changes、插件兼容性、Node 版本要求

## 2. 评价

- 版本升级应仔细阅读官方迁移指南
- 小步升级（v5 → v6 → v7 → v8）比跳跃升级更安全

## 3. Breaking Changes

- 每个大版本都可能有 Breaking Changes：
  - API 变更（配置项重命名、删除等）
  - 默认行为变更（如默认压缩器、构建目标等）
  - 废弃特性的移除
- 迁移前应阅读官方的 Migration Guide

## 4. 插件兼容性

- 升级 Vite 后需要检查插件的兼容性：
  - 官方插件（`@vitejs/`）通常同步更新
  - 社区插件可能需要等待更新
  - 使用 `npm ls vite` 检查插件依赖的 Vite 版本

## 5. Node 版本要求

- Vite 8 要求 Node.js >= 20.0.0
- 升级前确认 Node.js 版本满足要求
- 使用 `nvm` 管理多个 Node 版本

## 6. 配置项变化

- 某些配置项可能被重命名或移除：
  - 查看 Vite 的 changelog 和 migration guide
  - 使用 `vite --debug` 检查配置是否有警告
  - TypeScript 会在编译时报错（配置类型不匹配）

## 7. 依赖升级策略

- 推荐的升级流程：
  1. 创建新分支
  2. 升级 `vite` 和 `@vitejs/*` 插件
  3. 运行 `pnpm install` 更新依赖
  4. 运行 `vite build` 检查构建是否成功
  5. 运行测试确保功能正常
  6. 修复 Breaking Changes 导致的问题
