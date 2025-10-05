# [0018. vite 配置文件 - vite.config.js](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0018.%20vite%20%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%20-%20vite.config.js)

<!-- region:toc -->

- [1. 🎯 本节内容](#1--本节内容)
- [2. 🫧 评价](#2--评价)
- [3. 🤔 vite 配置文件是？](#3--vite-配置文件是)
- [4. 🤔 配置文件可以不用 `vite.config.js/.ts` 吗？](#4--配置文件可以不用-viteconfigjsts-吗)
- [5. 🤔 vite 可以直接导出一个对象吗？比如：`export default { ... }`](#5--vite-可以直接导出一个对象吗比如export-default---)
- [6. 🤔 书写 vite 配置文件如何获得智能提示呢？](#6--书写-vite-配置文件如何获得智能提示呢)
- [7. 🤔 配置文件导出的内容是什么？](#7--配置文件导出的内容是什么)
- [8. 🤔 配置文件导出 `UserConfig` 都有哪些写法？](#8--配置文件导出-userconfig-都有哪些写法)
- [9. 🤔 配置文件的函数式写法支持异步操作吗？](#9--配置文件的函数式写法支持异步操作吗)
- [10. 🤔 情景配置是什么？](#10--情景配置是什么)
- [11. 🤔 在配置文件中可以读取到环境变量吗？](#11--在配置文件中可以读取到环境变量吗)
- [12. 🤔 如何在 VS Code 中调试配置文件？](#12--如何在-vs-code-中调试配置文件)
- [13. 🔗 引用](#13--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- todo

## 2. 🫧 评价

- todo

## 3. 🤔 vite 配置文件是？

- JS 版：`vite.config.js`
- TS 版：`vite.config.ts`
- 这两种格式都 ok，具体得看你的项目是否是基于 ts 的，如果是，则使用 `.ts` 后缀，否则使用 `.js` 后缀。

## 4. 🤔 配置文件可以不用 `vite.config.js/.ts` 吗？

- 可以的。
- `vite --config my-config.js` 命令可以指定使用特定的配置文件。
- 你可以指定一个自定义的配置文件，而不是使用默认的 `vite.config.js` 或 `vite.config.ts`

```bash
# 用法
vite --config my-config.js
vite --config path/to/my-config.js
```

- **适用场景**：
  - 多环境配置（如开发、测试、生产环境使用不同配置）
  - 项目中有多个配置文件需要切换
  - 临时使用特定配置进行构建或开发（临时测试）
- 这种方式可以让你灵活地使用不同的配置文件，而不需要重命名或替换默认的配置文件。
  - 比如，你可以在执行某个 `package.json` 文件中的 `scripts` 字段中的 `vite` 命令的时候，加上 `--config xxx` 选项参数，表示此时你想要以 `xxx` 作为本次 `vite` 命令执行的配置文件。

::: warning 注意

- 上述这种修改配置文件的方式，是 **临时** 的。

```bash
# 使用自定义配置文件启动开发服务器
vite --config my-config.js

# 下次直接运行 vite，仍然使用默认的 vite.config.js/.ts
vite
```

:::

## 5. 🤔 vite 可以直接导出一个对象吗？比如：`export default { ... }`

- 可以。

::: code-group

```ts [vite.config.ts]
// 可以直接导出一个对象
// 这是配置文件最基础的写法
// 虽然简洁，但是无法获取智能提示
export default {
  // 配置选项
}
```

:::

## 6. 🤔 书写 vite 配置文件如何获得智能提示呢？

- 官方提供了 3 种方式：
  - 方法 1. 使用 `JSDoc`
  - 方法 2. 使用 `defineConfig`
  - 方法 3. 使用 TS 强类型约束

::: code-group

```js [1]
// 因为 Vite 本身附带 TypeScript 类型，
// 所以你可以通过 IDE 和 jsdoc 的配合来实现智能提示：
/** @type {import('vite').UserConfig} */
export default {
  // ...
}
```

```js [2]
// 可以使用 defineConfig 工具函数，
// 这样不用 jsdoc 注解也可以获取类型提示：
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
})
```

```js [3]
// Vite 也直接支持 TypeScript 配置文件。
// 可以在 vite.config.ts 中使用上述的 defineConfig 工具函数，或者 satisfies 运算符
import type { UserConfig } from 'vite'

export default {
  // ...
} satisfies UserConfig
```

:::

## 7. 🤔 配置文件导出的内容是什么？

- 导出的是一个 `UserConfig` 配置对象，你可以在 vite 仓库中的 [vite/packages/vite/src/node/config.ts][2] 文件中找到 `UserConfig` 的定义。
- 这个对象包含了一系列 key，这些 key 就是 vite 的配置项。
- 有关配置选项的详细介绍，可查阅官方文档 [Vite 配置][3]。
  - ![图 2](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-10-05-14-56-23.png)
  - 这一章节下的文章，主要就是在介绍 vite 的配置。

::: code-group

<<< ./assets/1.ts [UserConfig 对象]

:::

## 8. 🤔 配置文件导出 `UserConfig` 都有哪些写法？

- 配置文件导出 `UserConfig` 有两种写法：
- 1️⃣ 直接导出一个对象
- 2️⃣ 导出一个函数 `defineConfig`（更灵活、更常见）

## 9. 🤔 配置文件的函数式写法支持异步操作吗？

- ✅ 支持。
- 如果配置需要调用一个异步函数，也可以转而导出一个异步函数。这个异步函数也可以通过 defineConfig 传递，以便获得更好的智能提示：

```js {1,2}
export default defineConfig(async ({ command, mode }) => {
  const data = await asyncFunction()
  return {
    // vite 配置
  }
})
```

## 10. 🤔 情景配置是什么？

- 当你在阅读 vite 中文版的文档时，会看到这样的标题“情景配置”，在阅读内容之前，单是看标题好像不太好理解这个词。
- 这时候瞅一瞅情景配置的英文：`conditional-config` 会更加直观，顾名思义，情景配置就是 **条件配置**。
  - **情景 = 条件 = 不同的运行环境**
  - “情景配置” 就是 **根据不同的场景来区分导出的配置内容**。
- 官方文档截图：
  - ![doc - 情景配置](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-10-04-23-20-21.png)

## 11. 🤔 在配置文件中可以读取到环境变量吗？

## 12. 🤔 如何在 VS Code 中调试配置文件？

## 13. 🔗 引用

- [config][1]
- [vite/packages/vite/src/node/config.ts][2]
- [vite 配置][3]

[1]: https://cn.vite.dev/config/
[2]: https://github.com/vitejs/vite/blob/main/packages/vite/src/node/config.ts
[3]: https://cn.vite.dev/config/
