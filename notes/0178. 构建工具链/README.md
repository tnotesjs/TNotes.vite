# [0178. 构建工具链](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0178.%20%E6%9E%84%E5%BB%BA%E5%B7%A5%E5%85%B7%E9%93%BE)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Turborepo](#3-turborepo)
- [4. Nx](#4-nx)
- [5. Lage](#5-lage)
- [6. Moon](#6-moon)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Monorepo 的构建工具链
- 掌握 Turborepo、Nx、Lage 等工具的特点和选择

## 2. 评价

- Turborepo 是目前最流行的 Monorepo 构建工具
- 小型 Monorepo 只用 pnpm workspace 即可，不需要额外工具

## 3. Turborepo

- Vercel 开发的 Monorepo 构建工具
- 核心特性：
  - **任务编排**：自动分析包之间的依赖关系，并行执行任务
  - **缓存**：基于文件哈希的增量构建，跳过未变化的任务
  - **远程缓存**：团队共享构建缓存（Vercel 或自建）
- 配置示例：

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false
    },
    "lint": {}
  }
}
```

## 4. Nx

- 功能更全面的 Monorepo 工具（构建、测试、Lint、代码生成）
- 核心特性：
  - 依赖图分析
  - 增量构建
  - 受影响分析（只构建/测试变更的包）
  - 代码生成器
- 适合大型团队和复杂项目

## 5. Lage

- Microsoft 开发的轻量级 Monorepo 构建工具
- 核心特性：
  - 任务编排
  - 本地缓存
  - 简单配置
- 比 Turborepo 更轻量，但功能也更少

## 6. Moon

- Rust 编写的 Monorepo 管理工具
- 核心特性：
  - 极快的执行速度
  - 任务编排和缓存
  - 内置工具链管理
- 适合对性能有极致要求的大型 Monorepo
