# [0025. 常用 npm scripts](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0025.%20%E5%B8%B8%E7%94%A8%20npm%20scripts)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `dev`](#3-dev)
- [4. `build`](#4-build)
- [5. `preview`](#5-preview)
- [6. `lint`](#6-lint)
- [7. `test`](#7-test)
- [8. `type-check`](#8-type-check)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 项目中常用的 npm scripts
- 理解每个脚本的作用和使用场景
- 掌握脚本之间的执行顺序和依赖关系

## 2. 评价

- Vite 项目的 scripts 非常简洁，通常只需 3-4 个即可覆盖日常开发需求
- 与 Webpack 项目动辄十几个 scripts 形成鲜明对比
- 建议了解 `build` 脚本中 `tsc && vite build` 的含义：先做类型检查，再构建

## 3. `dev`

- 启动开发服务器：`vite` 或 `npm run dev`
- 默认端口 5173，支持 HMR、模块热替换
- 常用参数：
  - `--port 3000`：指定端口
  - `--host`：暴露到局域网（移动端真机调试常用）
  - `--open`：自动打开浏览器
- 在 `package.json` 中的配置：`"dev": "vite"`
- 快捷启动方式：`npx vite` 也可以直接启动

## 4. `build`

- 执行生产构建：`vite build` 或 `npm run build`
- 常见配置：`"build": "vue-tsc --noEmit && vite build"` 或 `"build": "tsc -b && vite build"`
- 执行顺序说明：
  - `vue-tsc --noEmit` 或 `tsc -b`：先做 TypeScript 类型检查（只检查不输出）
  - `vite build`：再执行实际的生产构建
- 构建产物默认输出到 `dist/` 目录
- 常用参数：
  - `--outDir dist`：指定输出目录
  - `--sourcemap`：生成 source map
  - `--watch`：监听文件变化自动重新构建
  - `--minify false`：关闭压缩（调试时有用）
  - `--mode staging`：指定构建模式（读取 `.env.staging`）

## 5. `preview`

- 本地预览构建产物：`vite preview` 或 `npm run preview`
- 本质是一个轻量级静态文件服务器，服务于 `dist/` 目录
- **必须先执行 `vite build` 后才能使用**，否则 `dist/` 目录不存在会报错
- 默认端口 4173（避免与 dev server 的 5173 冲突）
- 典型工作流：`npm run build && npm run preview`
- 适用场景：
  - 验证生产构建是否正常
  - 检查路由配置、资源路径、SPA fallback 等
  - 本地测试 gzip/brotli 压缩效果

## 6. `lint`

- 代码规范检查，通常配合 ESLint 使用
- 典型配置：`"lint": "eslint . --ext .vue,.js,.jsx,.ts,.tsx"`
- 现代 ESLint（v9+ flat config）简化为：`"lint": "eslint ."`
- 常与 lint-staged + husky 配合，在 git commit 时自动检查变更文件
- 推荐搭配：
  - `eslint-plugin-vue`：Vue 文件的 ESLint 规则
  - `@typescript-eslint/parser`：TypeScript 的 ESLint 解析器
  - `eslint-config-prettier`：避免 ESLint 与 Prettier 规则冲突

## 7. `test`

- 单元测试脚本，常用的测试框架选择：
  - **Vitest**：推荐，由 Vite 团队开发，与 Vite 深度集成，共享相同的配置和插件系统
  - Jest：生态最成熟，但在 Vite 项目中需要额外配置
- Vitest 典型配置：`"test": "vitest"`（watch 模式）或 `"test:run": "vitest run"`（单次运行）
- Vitest 的优势：
  - 与 Vite 共享相同的模块解析和转换逻辑，无需额外配置
  - 原生支持 TypeScript、JSX、CSS Modules
  - 支持浏览器模式测试 DOM 相关代码
  - 兼容 Jest API，迁移成本低

## 8. `type-check`

- 单独的类型检查脚本，将类型检查与构建解耦
- 典型配置：
  - Vue 项目：`"type-check": "vue-tsc --noEmit"`
  - React / 通用项目：`"type-check": "tsc -b --noEmit"` 或 `"type-check": "tsc --noEmit"`
- 适用场景：
  - CI/CD 流水线中单独做类型检查
  - 开发时快速验证类型是否正确（不需要完整构建）
  - 与 `build` 脚本分离，类型检查失败不影响其他步骤
- 注意：`vite build` **不做类型检查**，类型安全需要通过此脚本或 IDE 保障
