# [0058. Vite 中的 TypeScript](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0058.%20Vite%20%E4%B8%AD%E7%9A%84%20TypeScript)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 开箱即用的 TS 转换](#3-开箱即用的-ts-转换)
- [4. Vite 不做完整类型检查](#4-vite-不做完整类型检查)
- [5. 类型检查与构建分离](#5-类型检查与构建分离)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 对 TypeScript 的支持方式
- 理解 Vite "只转译不检查"的设计决策
- 掌握类型检查与构建分离的最佳实践

## 2. 评价

- "只转译不检查"是 Vite 的核心设计之一，理解这一点对正确使用 Vite 至关重要
- 类型检查交给 IDE 和 CI，不影响开发和构建速度

## 3. 开箱即用的 TS 转换

- Vite 原生支持 TypeScript，无需安装额外的 loader 或插件
- 使用 Oxc 转换器转译 TypeScript，速度比原生 tsc 更快
- 支持的 TypeScript 特性：
  - `.ts`、`.tsx`、`.mts`（ESM TypeScript）文件
  - 类型注解、接口、泛型、枚举等语法
  - `tsconfig.json` 中的 `paths` 别名
  - JSX/TSX 语法（配合框架插件）
- 转译过程只剥离类型注解，不执行类型检查

## 4. Vite 不做完整类型检查

- Vite 使用 Oxc 转换器转译 TypeScript，只做语法转译，不执行类型检查
- 这意味着：
  - 类型错误不会阻止开发服务器启动
  - 类型错误不会阻止生产构建（除非单独运行 tsc）
  - 某些需要类型信息的 TypeScript 特性可能有兼容问题
    - `const enum`：在 `isolatedModules: true` 下行为不同
    - 命名空间（namespace）：需要 `isolatedModules: true` 配置
    - Decorator：需要 `experimentalDecorators` 配置
- 为什么这样设计？
  - 类型检查是 CPU 密集型操作，会显著降低开发和构建速度
  - 类型检查更适合交给 IDE（实时反馈）和 CI（质量门禁）

## 5. 类型检查与构建分离

- 推荐的工作流：
  - 开发时：IDE（VS Code）提供实时类型检查和错误提示
  - 构建时：在 `vite build` 之前单独运行类型检查
  - CI 中：作为流水线的一个独立步骤
- `package.json` 配置：

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "type-check": "vue-tsc --noEmit"
  }
}
```

- Vue 项目使用 `vue-tsc`，React / 通用项目使用 `tsc --noEmit` 或 `tsc -b`
- 分离的好处：
  - 开发时不受类型检查影响，保持极速体验
  - 类型检查失败可以单独重试，不影响其他步骤
  - 可以在 CI 中并行运行类型检查和构建
