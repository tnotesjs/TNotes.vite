# [0001. 从 0 到 1 搭建一个原生的（vanilla） vite 工程](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0001.%20%E4%BB%8E%200%20%E5%88%B0%201%20%E6%90%AD%E5%BB%BA%E4%B8%80%E4%B8%AA%E5%8E%9F%E7%94%9F%E7%9A%84%EF%BC%88vanilla%EF%BC%89%20vite%20%E5%B7%A5%E7%A8%8B)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. “vanilla” 是什么意思？](#3-vanilla-是什么意思)
- [4. 查看官方提供的 vanilla-ts 模板](#4-查看官方提供的-vanilla-ts-模板)
- [5. Vite 支持 TS 吗？](#5-vite-支持-ts-吗)
- [6. demos.1 - 从 0 到 1 搭建一个 `vite-vanilla-ts` 工程](#6-demos1---从-0-到-1-搭建一个-vite-vanilla-ts-工程)
- [7. 引用](#7-引用)

<!-- endregion:toc -->

## 1. 本节内容

- 从 0 到 1 搭建一个 vite 的原生 demo

## 2. 评价

- 基于 vite 从 0 到 1 搭建一个 `vite-vanilla-ts` 工程，实现最基础的：
  - dev
  - build
  - preview
- vite 是比 webpack 更上层的工具链
  - vite 是一个上层的工具链，它帮我们预先配置好的很多东西，你只需要安装 vite 就可以实现 dev server、build 等操作。
  - build 出来的产物，也是自带文件指纹的。
  - 从开箱即用的角度来对比，vite 比 webpack 做得更加全面，你只需要 `1～2min`，就能搭建好一个纯粹的 vite-demo 了，并且还带有 TypeScript 支持。

## 3. “vanilla” 是什么意思？

- vanilla - “纯粹” -> 发音：`/vəˈnɪlə/`
- “Vanilla” 代表的是 **纯粹**、简单和直接的编程方式，强调不依赖额外的框架或库，而是直接使用 **原生** 的语言和技术。

## 4. 查看官方提供的 vanilla-ts 模板

- [vite -- vanilla-ts][2]
  - ![图 0](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-10-04-19-38-31.png)
  - 通过本节示例最终搭建出来的 demo 效果和官网提供的这个 `vanilla-ts` 示例是非常类似的，主要区别在于我们的 demo 缺少了一些 ts 配置信息。
  - 可以在写完之后去到官方文档中对比一下看看。
  - 可以点进去，通过 StackBlitz 在线查看 `vanilla-ts` 的模板源码。
  - ![图 1](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-10-04-19-38-44.png)
- 也可以通过以下命令在本地创建

```bash
$ npm create vite@latest my-vanilla-ts -- --template vanilla-ts
# https://github.com/vitejs/vite/tree/main/packages/create-vite/template-vanilla-ts
# 相当于直接从 vite 仓库中拉取这个模板中的内容
```

## 5. Vite 支持 TS 吗？

- Vite 天然支持引入 .ts 文件。
- 注意，Vite 仅执行 .ts 文件的转译工作，并 **不执行** 任何类型检查。如果有类型检查的需求，可以通过 `tsc` 来实现。

## 6. demos.1 - 从 0 到 1 搭建一个 `vite-vanilla-ts` 工程

::: code-group

```bash [核心流程]
# 创建 vite-demo 目录
$ mkdir vite-demo
# 进入 vite-demo
$ cd vite-demo
# 初始化包
$ pnpm init
# 安装 vite、TypeScript
$ pnpm add vite typescript -D

# 创建必要的文件
# index.html - doc：https://cn.vitejs.dev/guide/#index-html-and-project-root
# 编写测试脚本：src/index.ts、src/counter.ts

# 往 package.json 中插入以下 scripts 脚本：
# "dev": "vite",
# "build": "vite build",
# "preview": "vite preview"
```

<<< ./demos/1/vite-demo/index.html

<<< ./demos/1/vite-demo/src/index.ts

<<< ./demos/1/vite-demo/src/counter.ts

<<< ./demos/1/vite-demo/package.json

:::

- 无需任何其它的配置，现在已经可以正常完成以下操作：
- 【开发环境】启动开发服务器，执行命令 `pnpm dev`
- 【生产环境】出包，执行命令 `pnpm build`，预览构建产物，执行命令 `pnpm preview`

```bash
$ pnpm dev

# > vite-demo@1.0.0 dev .../demos/1/vite-demo
# > vite


#   VITE v7.1.9  ready in 410 ms

#   ➜  Local:   http://localhost:5173/
#   ➜  Network: use --host to expose
#   ➜  press h + enter to show help

$ pnpm build

# > vite-demo@1.0.0 build .../demos/1/vite-demo
# > vite build

# vite v7.1.9 building for production...
# ✓ 4 modules transformed.
# dist/index.html                0.32 kB │ gzip: 0.24 kB
# dist/assets/index-CgkQmZVT.js  0.97 kB │ gzip: 0.53 kB
# ✓ built in 51ms

$ pnpm preview

# > vite-demo@1.0.0 preview .../demos/1/vite-demo
# > vite preview

#   ➜  Local:   http://localhost:4173/
#   ➜  Network: use --host to expose
#   ➜  press h + enter to show help
```

::: swiper

![dev](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-10-04-19-51-01.png)

![open-dev](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-10-04-19-51-18.png)

![build](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-10-04-19-53-42.png)

![preview](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-10-04-19-52-21.png)

:::

- 至此，最基础的开发环境启动、生产环境的打包预览功能都已经完成了。

## 7. 引用

- vite -> vanilla-ts
  - [vanilla-ts 模板源码][1]
  - [官方提供的 vanilla-ts 模板][2]
- [Vite，指引 - 功能 - TypeScript][3]
  - 查看 Vite 对 TS 的支持的详情。

[1]: https://github.com/vitejs/vite/tree/main/packages/create-vite/template-vanilla-ts
[2]: https://cn.vitejs.dev/guide/#trying-vite-online
[3]: https://cn.vitejs.dev/guide/features.html#typescript
