# [0221. 必会构建](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0221.%20%E5%BF%85%E4%BC%9A%E6%9E%84%E5%BB%BA)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `vite build`](#3-vite-build)
- [4. `build.outDir`](#4-buildoutdir)
- [5. `build.sourcemap`](#5-buildsourcemap)
- [6. `build.rolldownOptions`](#6-buildrolldownoptions)
- [7. `manualChunks`](#7-manualchunks)
- [8. `base`](#8-base)
- [9. 代码分割](#9-代码分割)
- [10. 资源 Hash](#10-资源-hash)

<!-- endregion:toc -->

## 1. 本节内容

- Vite 必会构建知识速查
- 覆盖构建命令、输出目录、Source Map、Rollup 配置、chunk 拆分、base 配置、代码分割、资源 Hash

## 2. 评价

- 构建配置决定了生产产物的质量，必须掌握核心配置项

## 3. `vite build`

- 生产构建命令，输出到 `dist/` 目录
- 支持 `--mode`、`--outDir`、`--sourcemap` 等参数

## 4. `build.outDir`

- 输出目录，默认 `'dist'`

## 5. `build.sourcemap`

- Source Map 生成策略：`true`、`false`、`'hidden'`

## 6. `build.rolldownOptions`

- 传递给 Rolldown 的高级配置（多入口、外部依赖等）

## 7. `manualChunks`

- 手动拆分 chunk：将大型依赖（Vue、Element Plus）单独拆分

## 8. `base`

- 公共基础路径，影响所有资源的引用路径

## 9. 代码分割

- 路由懒加载自动触发代码分割
- 共享模块自动提取为共享 chunk

## 10. 资源 Hash

- 文件内容哈希：内容变化时文件名变化，利于长期缓存

- todo
