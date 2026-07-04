# [0045. 在配置文件中读取环境变量](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0045.%20%E5%9C%A8%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E4%B8%AD%E8%AF%BB%E5%8F%96%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `loadEnv`](#3-loadenv)
- [4. 根据 mode 动态配置](#4-根据-mode-动态配置)
- [5. 多环境构建](#5-多环境构建)

<!-- endregion:toc -->

## 1. 本节内容

- 了解如何在 `vite.config.ts` 中读取环境变量
- 掌握 `loadEnv` 工具函数的使用方式
- 理解配置文件中环境变量与客户端代码中的区别

## 2. 评价

- 配置文件中不能直接使用 `import.meta.env`，需要通过 `loadEnv` 手动加载
- `loadEnv` 配合配置函数形式使用，可以实现灵活的多环境配置

## 3. `loadEnv`

- Vite 提供的工具函数，用于在配置文件中加载环境变量
- 导入方式：`import { loadEnv } from 'vite'`
- 函数签名：`loadEnv(mode: string, envDir: string, prefixes?: string | string[]): Record<string, string>`
- 使用示例：

```ts
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    server: {
      proxy: {
        '/api': env.VITE_API_BASE_URL,
      },
    },
  }
})
```

- 参数说明：
  - `mode`：当前模式（`'development'`、`'production'` 或自定义值）
  - `envDir`：环境变量文件所在目录（通常是项目根目录）
  - `prefixes`：过滤前缀，传 `''` 加载所有变量（默认只加载 `VITE_` 前缀的）

## 4. 根据 mode 动态配置

- 利用配置函数 + `loadEnv` 实现按环境差异化配置：

```ts
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: env.VITE_BASE_PATH || '/',
    server: {
      port: Number(env.VITE_PORT) || 3000,
      proxy: env.VITE_API_BASE_URL
        ? { '/api': env.VITE_API_BASE_URL }
        : undefined,
    },
    build: {
      outDir: env.VITE_OUT_DIR || 'dist',
    },
  }
})
```

## 5. 多环境构建

- 通过不同的 `.env.[mode]` 文件实现多环境构建：

```
.env.development
.env.staging
.env.production
```

- 构建命令：

```bash
# 开发环境
vite

# staging 环境
vite build --mode staging

# 生产环境
vite build --mode production
```

- 在 CI/CD 中的典型用法：

```yaml
# GitHub Actions 示例
- run: pnpm build --mode ${{ env.DEPLOY_ENV }}
```

- 注意：`loadEnv` 加载的变量都是字符串类型，数字和布尔值需要手动转换
