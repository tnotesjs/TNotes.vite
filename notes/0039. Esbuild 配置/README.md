# [0039. Esbuild 配置](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0039.%20Esbuild%20%E9%85%8D%E7%BD%AE)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `esbuild`](#3-esbuild)
- [4. JSX 转换](#4-jsx-转换)
- [5. TS 转换](#5-ts-转换)
- [6. `drop`](#6-drop)
- [7. `pure`](#7-pure)
- [8. `legalComments`](#8-legalcomments)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 中 Esbuild 的配置选项
- 掌握 JSX 转换和 TypeScript 转换的配置方式
- 了解 `drop`、`pure`、`legalComments` 等高级选项

## 2. 评价

- Esbuild 配置主要影响开发阶段的代码转译
- 大部分项目不需要修改 Esbuild 配置，除非有特殊的 JSX 需求或需要移除调试代码
- `esbuild.drop` 是生产环境中移除 `console.log` 和 `debugger` 的推荐方式

## 3. `esbuild`

- 顶层 `esbuild` 配置项，传递给 Esbuild 的转译选项
- 与 Rollup 构建的 `build.rollupOptions` 不同，`esbuild` 配置主要影响开发阶段
- 也会在生产构建中生效（Esbuild 负责代码压缩时）

```ts
export default defineConfig({
  esbuild: {
    target: 'es2020',
    // 其他 Esbuild 转译选项
  },
})
```

## 4. JSX 转换

- Vite 默认支持 JSX，由 Esbuild 处理
- 配置 JSX 的转换方式：

```ts
export default defineConfig({
  esbuild: {
    jsxFactory: 'h', // 自定义 JSX 工厂函数
    jsxFragment: 'Fragment', // 自定义 JSX Fragment
    jsxInject: `import { h } from 'vue'`, // 自动注入 JSX 所需的导入
  },
})
```

- React 项目通常不需要配置（使用 `@vitejs/plugin-react` 自动处理）
- Vue 项目使用 JSX 时可能需要配置 `jsxInject`
- `jsxInject` 会在每个包含 JSX 的文件顶部自动插入导入语句，避免手动重复导入

## 5. TS 转换

- Esbuild 转译 TypeScript 的配置选项：

```ts
export default defineConfig({
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
        useDefineForClassFields: false,
      },
    },
  },
})
```

- `tsconfigRaw`：直接传递 TypeScript 编译选项给 Esbuild（无需依赖 tsconfig.json）
- 常用场景：
  - 启用 Decorator 语法：`experimentalDecorators: true`
  - 控制 class fields 的行为：`useDefineForClassFields`

## 6. `drop`

- 在转译阶段移除指定的语法结构
- 可选值：`['console', 'debugger']`

```ts
export default defineConfig({
  esbuild: {
    drop: ['console', 'debugger'], // 移除所有 console.log 和 debugger 语句
  },
})
```

- 生产环境常用的优化手段，比 terser 的 `drop_console` 快得多
- 也可以通过配置函数只在生产构建时启用：

```ts
export default defineConfig(({ mode }) => ({
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}))
```

## 7. `pure`

- 标记指定的函数调用为"无副作用"，允许 Tree Shaking 移除它们的返回值

```ts
export default defineConfig({
  esbuild: {
    pure: ['console.log', 'Math.floor'],
  },
})
```

- 与 `drop` 的区别：
  - `drop`：直接移除整个语句（包括调用和参数）
  - `pure`：标记函数为纯函数，Tree Shaking 可以在返回值未使用时移除调用
- `pure` 更安全，不会影响函数参数中的副作用代码

## 8. `legalComments`

- 控制构建产物中法律注释的处理方式
- 可选值：
  - `'eof'`：将所有法律注释移到文件末尾（默认）
  - `'inline'`：保留原位
  - `'none'`：完全移除

```ts
export default defineConfig({
  esbuild: {
    legalComments: 'none', // 移除所有法律注释，减小产物体积
  },
})
```

- 注意：某些开源许可证要求保留版权声明，移除前请确认合规性

- todo
