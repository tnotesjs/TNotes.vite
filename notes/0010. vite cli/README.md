# [0010. vite cli](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0010.%20vite%20cli)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. vite cli 是什么？](#3-vite-cli-是什么)
- [4. vite 有几个内置命令？](#4-vite-有几个内置命令)
- [5. vite 的内置命令都有哪些？作用是什么？](#5-vite-的内置命令都有哪些作用是什么)
- [6. vite 内置命令都有哪些配置选项？](#6-vite-内置命令都有哪些配置选项)
- [7. 引用](#7-引用)

<!-- endregion:toc -->

## 1. 本节内容

- Vite 命令行接口
  - `vite`
  - `vite build`
  - ~~`vite optimize`~~
  - `vite preview`

## 2. 评价

- vite-cli 就 3 个命令 👉 `vite`、`vite build`、`vite preview`，非常简单。
- 具体命令参数，直接查阅 [官方文档 guide/cli][3] 即可。

## 3. vite cli 是什么？

- vite cli 表示 Vite 的命令行接口，也就是 vite 内置的命令。

## 4. vite 有几个内置命令？

- 3 个
  - `vite`
  - `vite build`
  - ~~`vite optimize`~~
  - `vite preview`

::: warning 注意

- 有些文章会说 vite 有 4 个内置命令，包含 `vite optimize`，但实际上 `vite optimize` 已经被标记为 Deprecated 弃用了。
- `vite optimize` 命令曾经用于手动触发对 node_modules 中第三方依赖的预构建（使用 esbuild 将其打包成浏览器可识别的 ESM 格式），但现在这个过程在你运行 `vite dev` 时会自动、智能地完成，因此你不再需要（也不应该）手动调用它。

:::

## 5. vite 的内置命令都有哪些？作用是什么？

| 命令 | 作用 | 常用场景 |
| --- | --- | --- |
| `vite` / `vite dev` / `vite serve` | 启动开发服务器，支持 HMR、ESM、按需编译 | 日常开发 |
| `vite build` | 执行生产构建，输出到 `dist/`（基于 Rollup） | 部署前打包 |
| `vite preview` | 启动本地静态服务器，预览 `dist/` 中的生产构建结果（用于测试部署效果） | 构建后本地验证、测试 PWA/路由等 |

::: warning 注意

- `vite dev` / `vite serve` 命令是 `vite` 命令的别名，它们仨是一样的。

:::

## 6. vite 内置命令都有哪些配置选项？

- 见官方文档 -> [guide/cli][3]

## 7. 引用

- 中文文档仓库：
  - [vitejs/docs-cn][1]
- 官方文档：
  - [guide/cli][3]

[1]: https://github.com/vitejs/docs-cn
[3]: https://cn.vite.dev/guide/cli.html
