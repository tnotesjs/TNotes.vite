# [0094. 代码压缩](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0094.%20%E4%BB%A3%E7%A0%81%E5%8E%8B%E7%BC%A9)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Oxc 压缩](#3-oxc-压缩)
- [4. Terser 压缩](#4-terser-压缩)
- [5. 删除 console](#5-删除-console)
- [6. 删除 debugger](#6-删除-debugger)
- [7. 注释处理](#7-注释处理)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 生产构建的代码压缩方式
- 掌握 Esbuild 和 Terser 两种压缩器的选择和配置
- 了解删除 `console`、`debugger` 和注释处理的方式

## 2. 评价

- Oxc 压缩是默认选择，速度极快且压缩率足够好
- 只有在对产物体积有极致要求时才考虑 Terser

## 3. Oxc 压缩

- Vite 默认使用 Oxc 进行 JavaScript 压缩
- 速度比 Terser 快 20-100 倍
- 配置：

```ts
export default defineConfig({
  build: {
    minify: 'oxc', // 默认值
  },
})
```

- Oxc 压缩的特点：
  - 速度极快
  - 压缩率略低于 Terser（通常差距在 1-3%）
  - 不支持某些高级压缩优化（如变量名混淆的精细控制）

## 4. Terser 压缩

- Terser 是传统的 JavaScript 压缩工具，压缩率更高但速度较慢

```ts
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 删除 console
        drop_debugger: true, // 删除 debugger
        pure_funcs: ['console.log'], // 删除指定函数调用
      },
      format: {
        comments: false, // 删除所有注释
      },
    },
  },
})
```

- 需要安装：`npm install -D terser`
- 选择建议：大部分项目使用 Oxc 即可，Terser 仅在需要更小产物时使用

## 5. 删除 console

- 使用 Esbuild（推荐，无需额外配置）：

```ts
export default defineConfig({
  esbuild: {
    drop: ['console', 'debugger'],
  },
})
```

- 使用 Terser：

```ts
terserOptions: {
  compress: {
    pure_funcs: ['console.log', 'console.warn'],
  },
}
```

- 条件性删除（只在生产环境删除）：

```ts
export default defineConfig(({ mode }) => ({
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}))
```

## 6. 删除 debugger

- 使用 Esbuild：`drop: ['debugger']`（通常与 `console` 一起删除）
- 使用 Terser：`compress: { drop_debugger: true }`

## 7. 注释处理

- 默认行为：保留法律注释（license comments），删除其他注释
- Esbuild 配置：

```ts
export default defineConfig({
  esbuild: {
    legalComments: 'none', // 删除所有注释
    // 'eof': 移到文件末尾
    // 'inline': 保留原位
  },
})
```

- Terser 配置：

```ts
terserOptions: {
  format: {
    comments: false,      // 删除所有注释
    // /^!/ : 保留以 ! 开头的注释（如 license）
  },
}
```

- 注意：某些开源许可证要求保留版权声明，删除前请确认合规性
