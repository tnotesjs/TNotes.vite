# [0198. 企业级配置](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0198.%20%E4%BC%81%E4%B8%9A%E7%BA%A7%E9%85%8D%E7%BD%AE)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 统一路径别名](#3-统一路径别名)
- [4. 统一环境变量](#4-统一环境变量)
- [5. 统一代理](#5-统一代理)
- [6. 统一构建产物](#6-统一构建产物)
- [7. 统一部署规范](#7-统一部署规范)

<!-- endregion:toc -->

## 1. 本节内容

- 了解企业级 Vite 项目的配置规范
- 掌握路径别名、环境变量、代理、构建产物、部署的统一配置方式

## 2. 评价

- 企业级项目需要统一的配置规范，确保团队一致性

## 3. 统一路径别名

- 团队统一使用 `@/` 指向 `src/`：

```ts
// vite.config.ts
resolve: { alias: { '@': resolve(__dirname, 'src') } }

// tsconfig.json
{ "paths": { "@/*": ["src/*"] } }
```

## 4. 统一环境变量

- 统一的 `.env` 文件命名和变量前缀：

```
.env                  # 所有环境共享
.env.development      # 开发环境
.env.staging          # 预发布环境
.env.production       # 生产环境
```

- 所有自定义变量使用 `VITE_` 前缀

## 5. 统一代理

- 统一的 API 代理配置：

```ts
server: {
  proxy: {
    '/api': { target: env.VITE_API_BASE_URL, changeOrigin: true },
  },
}
```

## 6. 统一构建产物

- 统一的构建输出规范：

```ts
build: {
  outDir: 'dist',
  assetsDir: 'assets',
  sourcemap: 'hidden',
  chunkSizeWarningLimit: 500,
}
```

## 7. 统一部署规范

- 统一的部署流程：
  1. 本地构建验证
  2. CI 自动构建和测试
  3. 预发布环境验证
  4. 生产环境发布
- 使用 Docker 或平台部署确保环境一致性
