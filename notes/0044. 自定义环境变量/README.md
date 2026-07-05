# [0044. 自定义环境变量](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0044.%20%E8%87%AA%E5%AE%9A%E4%B9%89%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `VITE_` 前缀](#3-vite_-前缀)
- [4. 环境变量暴露规则](#4-环境变量暴露规则)
- [5. 修改 `envPrefix`](#5-修改-envprefix)
- [6. 安全注意事项](#6-安全注意事项)

<!-- endregion:toc -->

## 1. 本节内容

- 了解如何定义和使用自定义环境变量
- 理解 `VITE_` 前缀的作用和安全意义
- 掌握 `envPrefix` 配置的使用方式

## 2. 评价

- `VITE_` 前缀是 Vite 安全模型的重要组成部分，防止意外泄露服务器端密钥
- 只有带前缀的变量才会暴露给客户端代码，这是一个很好的设计

## 3. `VITE_` 前缀

- 自定义环境变量必须以 `VITE_` 开头才会暴露给客户端代码
- 定义方式（在 `.env` 文件中）：

```
VITE_API_BASE_URL=https://api.example.com
VITE_APP_TITLE=My App
SECRET_KEY=should-not-be-exposed
```

- 在客户端代码中访问：

```ts
console.log(import.meta.env.VITE_API_BASE_URL) // 'https://api.example.com'
console.log(import.meta.env.VITE_APP_TITLE) // 'My App'
console.log(import.meta.env.SECRET_KEY) // undefined（未暴露）
```

- 为什么需要前缀？
  - 防止将服务器端的密钥（如数据库密码、API Secret）意外打包到客户端代码中
  - 明确区分哪些变量是"设计给客户端使用的"

## 4. 环境变量暴露规则

- 只有以 `VITE_` 开头的变量会被 `import.meta.env` 暴露
- Vite 内置的 5 个变量不受此规则限制（`MODE`、`BASE_URL`、`DEV`、`PROD`、`SSR`）
- 暴露发生在构建时：Vite 使用字符串替换将 `import.meta.env.VITE_XXX` 替换为实际值
- 非 `VITE_` 前缀的变量在 `import.meta.env` 中为 `undefined`
- 但非前缀变量仍然可以在 `vite.config.ts` 中通过 `loadEnv` 读取（见下一节）

## 5. 修改 `envPrefix`

- 默认前缀为 `'VITE_'`，可以通过 `envPrefix` 配置修改

```ts
export default defineConfig({
  envPrefix: 'MY_APP_', // 使用 MY_APP_ 替代 VITE_
})
```

- 也可以传入数组，支持多个前缀：

```ts
export default defineConfig({
  envPrefix: ['VITE_', 'CUSTOM_'],
})
```

- 注意：修改前缀后，原有的 `VITE_` 变量将不再暴露（除非也加入前缀列表）
- 设为 `''` 可以暴露所有环境变量（不推荐，有安全风险）

## 6. 安全注意事项

- 环境变量会打包到客户端代码中：任何以 `VITE_` 开头的变量都会出现在构建产物的 JS 文件中
- 不要在环境变量中存放敏感信息：
  - ❌ `VITE_API_SECRET=sk-xxxxx`（会暴露到浏览器）
  - ✅ API Key 应通过后端代理转发，不暴露给前端
  - ✅ 只存放公开的配置信息（API 基础路径、功能开关等）
- `.env` 文件应提交到 Git（存放公共配置），`.env.local` 应加入 `.gitignore`
- CI/CD 环境中的变量通常通过平台的环境变量注入，无需写入 `.env` 文件
