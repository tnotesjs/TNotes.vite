# [0040. 依赖优化配置](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0040.%20%E4%BE%9D%E8%B5%96%E4%BC%98%E5%8C%96%E9%85%8D%E7%BD%AE)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `optimizeDeps.include`](#3-optimizedepsinclude)
- [4. `optimizeDeps.exclude`](#4-optimizedepsexclude)
- [5. `optimizeDeps.entries`](#5-optimizedepsentries)
- [6. `optimizeDeps.esbuildOptions`](#6-optimizedepsesbuildoptions)
- [7. `optimizeDeps.force`](#7-optimizedepsforce)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 依赖预构建的各项配置选项
- 掌握 `optimizeDeps.include` 和 `optimizeDeps.exclude` 的使用场景
- 理解 `optimizeDeps.force` 和 `optimizeDeps.esbuildOptions` 的作用

## 2. 评价

- 大部分项目不需要配置 `optimizeDeps`，Vite 会自动发现和预构建依赖
- 当遇到动态导入的依赖未被预构建、或 Monorepo 中本地包的导入问题时，才会用到这些配置

## 3. `optimizeDeps.include`

- 强制指定需要预构建的依赖包
- 默认情况下，Vite 只会在启动时扫描源码中的静态导入来发现依赖
- 以下场景需要手动 `include`：
  - 动态导入的依赖：`import('lodash-es')` 这种动态导入无法被静态扫描发现
  - 间接依赖：某些包的子模块不是 ESM 格式，需要预构建
  - CommonJS 依赖：某些 CJS 包无法被浏览器直接使用

```ts
export default defineConfig({
  optimizeDeps: {
    include: ['lodash-es', 'dayjs', 'axios'],
  },
})
```

- 使用 `include` 后，即使依赖未被扫描到也会被预构建
- 支持嵌套路径：`include: ['lodash-es/map', 'lodash-es/get']`

## 4. `optimizeDeps.exclude`

- 排除指定的依赖包不进行预构建
- 典型场景：
  - Monorepo 中的本地包：本地包已经是 ESM 格式，不需要预构建
  - 含有特殊文件类型的包：某些包包含 Worker、WASM 等非标准文件
  - Vite 插件处理的包：某些包需要由特定插件处理而非 Esbuild

```ts
export default defineConfig({
  optimizeDeps: {
    exclude: ['my-local-pkg', '@my-org/shared'],
  },
})
```

## 5. `optimizeDeps.entries`

- 指定依赖预构建的入口文件，默认会扫描 `index.html` 中的 `<script type="module">`
- 当入口文件不在默认位置，或需要额外的入口时使用

```ts
export default defineConfig({
  optimizeDeps: {
    entries: ['src/main.ts', 'src/admin/main.ts'],
  },
})
```

- 支持 glob 模式：`entries: ['src/**/*.ts']`
- 通常不需要配置，Vite 会自动从 `index.html` 和配置的入口推导

## 6. `optimizeDeps.esbuildOptions`

- 传递给 Esbuild 的预构建选项
- 常用配置：

```ts
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext', // 预构建的目标语法
      define: {
        // 全局变量替换
        global: 'globalThis',
      },
      plugins: [], // Esbuild 插件
      resolveExtensions: ['.ts', '.js'], // 解析的扩展名
    },
  },
})
```

- 典型场景：
  - 某些 CJS 包使用 `global` 变量，需要替换为 `globalThis`
  - 需要调整 Esbuild 的解析行为（如忽略某些扩展名）

## 7. `optimizeDeps.force`

- 默认为 `false`
- 设为 `true` 后，每次启动 Dev Server 都会强制重新预构建依赖，忽略缓存
- CLI 快捷方式：`vite --force`
- 适用场景：
  - 排查预构建缓存导致的问题
  - 修改了 `optimizeDeps` 配置后，缓存未自动失效
  - 本地开发中某个依赖行为异常，怀疑是缓存问题

```ts
export default defineConfig({
  optimizeDeps: {
    force: true, // 强制重新预构建（调试时使用，正常开发应关闭）
  },
})
```

- 注意：`force: true` 会显著增加启动时间，不应在正式开发中长期使用
