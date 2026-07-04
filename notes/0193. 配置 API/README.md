# [0193. 配置 API](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0193.%20%E9%85%8D%E7%BD%AE%20API)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 读取配置](#3-读取配置)
- [4. 合并配置](#4-合并配置)
- [5. 动态生成配置](#5-动态生成配置)
- [6. 插件中访问配置](#6-插件中访问配置)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 的配置相关 API
- 掌握读取配置、合并配置、动态生成配置的方式

## 2. 评价

- 配置 API 用于编写自定义工具和插件
- `mergeConfig` 是最常用的配置 API

## 3. 读取配置

- 使用 `resolveConfig` 解析配置：

```ts
import { resolveConfig } from 'vite'

// 解析 build 模式的配置
const config = await resolveConfig({}, 'build')
console.log(config.build.outDir)

// 解析 serve 模式的配置
const devConfig = await resolveConfig({}, 'serve')
console.log(devConfig.server.port)
```

## 4. 合并配置

- 使用 `mergeConfig` 深度合并配置：

```ts
import { mergeConfig } from 'vite'

const config1 = {
  server: { port: 3000 },
  plugins: [vue()],
}

const config2 = {
  server: { host: true },
  plugins: [react()],
}

const merged = mergeConfig(config1, config2)
// { server: { port: 3000, host: true }, plugins: [vue(), react()] }
```

- 注意：数组会合并（而非替换），对象会深度合并

## 5. 动态生成配置

- 使用配置函数动态生成配置：

```ts
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: command === 'serve' ? '/' : env.VITE_BASE_PATH,
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
  }
})
```

## 6. 插件中访问配置

- 在插件的 `config` 钩子中读取和修改配置：

```ts
function myPlugin() {
  return {
    name: 'my-plugin',
    config(config, { command, mode }) {
      // 返回部分配置，会与现有配置合并
      return {
        define: { __MODE__: JSON.stringify(mode) },
      }
    },
    configResolved(config) {
      // 读取最终配置
      console.log('Build target:', config.build.target)
    },
  }
}
```
