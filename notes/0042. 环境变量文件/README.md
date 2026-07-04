# [0042. 环境变量文件](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0042.%20%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F%E6%96%87%E4%BB%B6)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `.env`](#3-env)
- [4. `.env.local`](#4-envlocal)
- [5. `.env.development`](#5-envdevelopment)
- [6. `.env.production`](#6-envproduction)
- [7. `.env.[mode]`](#7-envmode)
- [8. `.env.[mode].local`](#8-envmodelocal)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 的环境变量文件命名规则和加载优先级
- 理解 `.env`、`.env.local`、`.env.[mode]`、`.env.[mode].local` 的区别
- 掌握多环境配置的文件组织方式

## 2. 评价

- Vite 的环境变量文件体系设计合理，兼顾了多环境和本地覆盖的需求
- `.local` 文件应加入 `.gitignore`，用于存放个人或机器特定的配置

## 3. `.env`

- 所有模式下都会加载的环境变量文件
- 适合存放跨环境共享的配置（如应用名称、公共路径等）
- 优先级最低，会被其他 `.env.[mode]` 文件覆盖

## 4. `.env.local`

- 所有模式下都会加载的本地覆盖文件
- **只在本地生效，不应提交到 Git**（加入 `.gitignore`）
- 典型用途：个人的 API Key、本地开发服务器地址等

## 5. `.env.development`

- 仅在 `development` 模式下加载（`vite` 命令）
- 存放开发环境专用的变量

```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_TITLE=My App (Dev)
```

## 6. `.env.production`

- 仅在 `production` 模式下加载（`vite build` 命令）
- 存放生产环境专用的变量

```
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE=My App
```

## 7. `.env.[mode]`

- 通用命名规则：`.env.[mode]` 在 `--mode [mode]` 时加载
- 例如 `vite build --mode staging` 会加载 `.env.staging`
- 适合为不同的部署环境（staging、预发布、灰度等）维护独立配置

## 8. `.env.[mode].local`

- 某个模式下的本地覆盖文件，**不应提交到 Git**
- 优先级最高，会覆盖同模式下的 `.env.[mode]` 中的同名变量
- 典型用途：在 staging 环境中使用个人的 API Key 进行调试

- **完整加载优先级**（从低到高）：
  1. `.env` — 所有模式共享
  2. `.env.local` — 所有模式的本地覆盖
  3. `.env.[mode]` — 特定模式
  4. `.env.[mode].local` — 特定模式的本地覆盖（最高优先级）
