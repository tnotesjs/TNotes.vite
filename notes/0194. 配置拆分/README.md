# [0194. 配置拆分](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0194.%20%E9%85%8D%E7%BD%AE%E6%8B%86%E5%88%86)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 基础配置](#3-基础配置)
- [4. 开发配置](#4-开发配置)
- [5. 生产配置](#5-生产配置)
- [6. 测试配置](#6-测试配置)
- [7. SSR 配置](#7-ssr-配置)

<!-- endregion:toc -->

## 1. 本节内容

- 了解如何将 Vite 配置拆分为多个文件
- 掌握基础配置、开发配置、生产配置、测试配置的组织方式

## 2. 评价

- 配置拆分可以让大型项目的配置更清晰
- 使用 `mergeConfig` 合并多个配置片段

## 3. 基础配置

- 提取公共配置为独立文件：

```ts
// config/base.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
})
```

## 4. 开发配置

```ts
// config/dev.ts
import { mergeConfig } from 'vite'
import base from './base'

export default mergeConfig(base, {
  server: {
    port: 3000,
    proxy: { '/api': 'http://localhost:8080' },
  },
})
```

## 5. 生产配置

```ts
// config/prod.ts
import { mergeConfig } from 'vite'
import base from './base'

export default mergeConfig(base, {
  build: {
    sourcemap: 'hidden',
    minify: 'oxc',
  },
})
```

## 6. 测试配置

```ts
// config/test.ts
import { defineConfig, mergeConfig } from 'vitest/config'
import base from './base'

export default mergeConfig(
  base,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
    },
  }),
)
```

## 7. SSR 配置

```ts
// config/ssr.ts
import { mergeConfig } from 'vite'
import base from './base'

export default mergeConfig(base, {
  build: {
    ssr: 'src/entry-server.ts',
    outDir: 'dist/server',
  },
})
```

- 也可以使用配置函数 + `mode` 参数实现单文件多配置：

```ts
export default defineConfig(({ mode }) => {
  const base = { plugins: [vue()] }
  if (mode === 'production')
    return mergeConfig(base, { build: { sourcemap: 'hidden' } })
  return base
})
```
