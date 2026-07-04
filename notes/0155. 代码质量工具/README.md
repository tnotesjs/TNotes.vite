# [0155. 代码质量工具](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0155.%20%E4%BB%A3%E7%A0%81%E8%B4%A8%E9%87%8F%E5%B7%A5%E5%85%B7)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. SonarQube](#3-sonarqube)
- [4. Knip](#4-knip)
- [5. Depcheck](#5-depcheck)
- [6. Type Coverage](#6-type-coverage)

<!-- endregion:toc -->

## 1. 本节内容

- 了解除了 ESLint/Prettier 之外的代码质量工具
- 掌握 SonarQube、Knip、Depcheck 等工具的用途

## 2. 评价

- 这些工具是代码质量的进阶保障，大型项目推荐使用
- Knip 和 Depcheck 可以帮助清理项目中的无用代码和依赖

## 3. SonarQube

- 企业级代码质量平台，支持多语言的静态代码分析
- 检测内容：
  - 代码异味（Code Smells）
  - Bug 潜在风险
  - 安全漏洞
  - 代码重复率
  - 测试覆盖率
- 可以集成到 CI/CD 流水线中，设置质量门禁

## 4. Knip

- 检测项目中未使用的文件、导出和依赖：

```bash
npx knip
```

- 输出示例：
  - 未使用的文件
  - 未使用的导出
  - 未使用的依赖（package.json 中声明但未使用）
- 可以自动清理无用代码，减小项目体积

## 5. Depcheck

- 检测 `package.json` 中未使用的依赖：

```bash
npx depcheck
```

- 输出：
  - `unused dependencies`：未使用的 dependencies
  - `unused devDependencies`：未使用的 devDependencies
  - `missing dependencies`：代码中使用但未声明的依赖
- 定期运行可以保持 `package.json` 的整洁

## 6. Type Coverage

- 检测 TypeScript 项目的类型覆盖率：

```bash
npx type-coverage
```

- 输出项目中有多少变量、函数有完整的类型注解
- 可以设置最低覆盖率阈值，逐步提升项目的类型安全
