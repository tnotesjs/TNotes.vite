# [0185. 依赖问题排查](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0185.%20%E4%BE%9D%E8%B5%96%E9%97%AE%E9%A2%98%E6%8E%92%E6%9F%A5)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 清理缓存](#3-清理缓存)
- [4. 删除 `node_modules`](#4-删除-node_modules)
- [5. 锁文件问题](#5-锁文件问题)
- [6. 依赖版本冲突](#6-依赖版本冲突)
- [7. 包管理器差异](#7-包管理器差异)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 项目中常见的依赖问题
- 掌握清理缓存、删除 node_modules、锁文件问题等排查方法

## 2. 评价

- 依赖问题是最常见的开发问题，大部分可以通过清理缓存解决

## 3. 清理缓存

- 清理 Vite 依赖预构建缓存：

```bash
rm -rf node_modules/.vite
# 或
npx vite --force
```

- 清理包管理器缓存：

```bash
npm cache clean --force
pnpm store prune
```

## 4. 删除 `node_modules`

- 万能解决方案：删除 `node_modules` 和锁文件后重新安装

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 5. 锁文件问题

- 锁文件（`pnpm-lock.yaml`、`package-lock.json`）与 `package.json` 不一致
- 解决：删除锁文件后重新安装
- 建议：将锁文件提交到 Git，确保团队使用相同的依赖版本

## 6. 依赖版本冲突

- 多个包依赖同一个库的不同版本
- 排查：`pnpm why <package>` 查看依赖来源
- 解决：
  - 使用 `resolutions`（yarn）或 `pnpm.overrides`（pnpm）强制统一版本
  - 使用 `resolve.dedupe` 配置

## 7. 包管理器差异

- 不同包管理器的依赖解析策略不同
- 团队应统一使用同一个包管理器
- 使用 `packageManager` 字段锁定包管理器版本：

```json
{
  "packageManager": "pnpm@9.0.0"
}
```
