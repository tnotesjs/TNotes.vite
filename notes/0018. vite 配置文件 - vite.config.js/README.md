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
- [11. 🤔 在配置文件中可以读取到 `VITE_` 环境变量吗？](#11--在配置文件中可以读取到-vite_-环境变量吗)
- [12. 💻 demos.1 - 如何在 VS Code 中调试配置文件？](#12--demos1---如何在-vs-code-中调试配置文件)
- [13. 🔗 引用](#13--引用)

<!-- endregion:toc -->

## 1. 🎯 本节内容

- vite 配置文件是什么
- 临时指定 vite 配置文件
- 配置文件导出的多种写法
- 配置文件的智能提示问题
- 认识配置文件导出的内容
- 配置文件中的异步操作
- 情景配置
- 在配置文件中读取环境变量
- 配置文件的调试

## 2. 🫧 评价

- 基于官方文档 -> [vite 配置][3] 整理而来的笔记。

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

## 11. 🤔 在配置文件中可以读取到 `VITE_` 环境变量吗？

- 先说结论：有办法读到，需要通过 `loadEnv` 来读取，但是通过 `import.meta.env.*` 无法读取到。

---

- 🚫 在配置文件中，无法通过 `import.meta.env.*` 的形式来读取。
  - 注意，虽然 vite 会自动将我们配置的环境变量注入到 `import.meta.env` 对象中（为了方便我们在源码「通常指位于 src 目录下的哪些代码」中访问环境变量），但是在配置文件中，我们还无法通过 `import.meta.env.VITE_` 的形式来读取环境变量。
  - 因为执行时机不同：
    - 配置文件的执行时机：在 Vite 启动的最开始阶段执行，此时 Vite 还没有处理环境变量。
    - 源代码的执行时机：在构建/开发服务器运行时执行，此时 `import.meta.env` 已经被 Vite 注入。
  - 官方对此的解释：
    - Vite 有意推迟加载任何 `.env*` 文件，直到用户配置解析完成之后，因为要加载的文件集合依赖于配置选项如 `root` 和 `envDir`，以及最终的 `mode`。
    - 翻译翻译：vite 对环境变量的处理会受到配置文件导出内容的影响，因此需要先明确配置文件的导出结果，vite 才会将确定的环境变量注入到 `import.meta.env` 中。
    - 再直白一点儿：在配置函数内部，Vite 无法自动提供 `import.meta.env` —— 因为它自己都还没决定用哪个 `.env` 文件呢！

---

- 虽然无法通过 `import.meta.env.*` 的形式来读取环境变量，但是官方还是考虑到了可能需要在配置文件中加载环境变量的需求场景，因此给我们预留了一个 API `loadEnv`，它的主要作用就是用于在配置文件中加载环境变量的。

---

- ✅ 在配置文件中，可以通过 `loadEnv` 函数来加载环境变量。

```ts
// loadEnv 的类型声明：
// function loadEnv(mode: string, envDir: string | false, prefixes?: string | string[]): Record<string, string>
// mode 表示当前的运行模式，可以从 defineConfig 注入的参数中获取
// envDir 表示环境变量文件的目录，默认为项目根目录（即 process.cwd()）
// prefixes 表示要加载的环境变量的前缀，比如 Vite 默认支持的 VITE_ 前缀
// 如果不传 prefixes，loadEnv 默认只加载以 VITE_ 开头的变量（出于安全考虑，避免意外暴露敏感信息）

// 使用示例：
// vite.config.js
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // 加载对应 mode 的环境变量
  const env = loadEnv(mode, process.cwd())

  // 如果在环境变量配置文件中定义了端口 VITE_PORT，那么就可以通过 env.VITE_PORT 获取到端口号。
  // 需要注意的是，无论我们在环境变量中写的是什么值，最终都会被解析为字符串类型。
  // 在使用的时候需要注意做好类型转换。
  const port = parseInt(env.VITE_PORT)

  return {
    server: {
      port: port || 3000,
    },
  }
})
```

---

- **🤔 要那么麻烦吗？环境变量配置文件不就在本地吗？我写个 nodejs 脚本，用 `fs.read...` 读取这个文件数据，解析一下不就完事儿了吗？为啥还需要用 `loadEnv` 呢？**
- 从技术上讲完全可行，不过这么做不符合 vite 规范。

## 12. 💻 demos.1 - 如何在 VS Code 中调试配置文件？

- 可以调试，但是有点儿麻烦，以下是问题背景分析和解决方案的具体步骤。

---

::: code-group

```bash [快速初始化一个 vite 工程]
pnpm create vite
```

<<< ./demos/1/vite-project/vite.config.ts {4}

<<< ./demos/1/vite-project/package.json {7}

<<< ./demos/1/vite-project/.vscode/settings.json {1-999} [.vscode/settings.json]

:::

---

- 以下是在 vite 中调试的问题背景。
- Vite 的默认打包机制会导致 VS Code 断点失效，你需要手动配置 VS Code 的 source map 解析规则，才能让断点正确映射回你编辑的原始配置文件。
- 问题背景
  - 在 Vite 的默认行为下（即 `--configLoader bundle`）：
  - Vite 不会直接运行你的原始配置文件（如 `vite.config.js`）
  - 而是先用 esbuild 将其打包成一个**临时的、纯 JavaScript 文件**
  - 这个临时文件会被写入到：`node_modules/.vite-temp/` 目录中
- 导致的问题
  - 当你在 VS Code 中打开 `vite.config.js` 并设置断点时：
  - VS Code 实际上是在调试那个“临时文件”，而不是你看到的源码文件
  - 虽然有 source map 映射，但 VS Code 默认**忽略 `node_modules` 下的所有文件**（为了性能和避免调试第三方库）
  - 结果：VS Code 找不到对应的源码位置 → **断点显示为“未验证”或“文件未找到”**

---

- 解决方案：通过在 `.vscode/settings.json` 中添加以下配置：

```json
{
  "debug.javascript.terminalOptions": {
    "resolveSourceMapLocations": [
      "${workspaceFolder}/**",
      "!**/node_modules/**",
      "**/node_modules/.vite-temp/**"
    ]
  }
}
```

1. `"${workspaceFolder}/**"` -> 包含你项目中的所有文件（正常调试）
2. `"!**/node_modules/**"` -> **排除** 所有 `node_modules`（这是 VS Code 默认行为）
3. `"**/node_modules/.vite-temp/**"` -> **例外包含** `.vite-temp` 目录 —— 让 VS Code 知道这个目录下的文件需要被调试器识别

- 确保 node_modules 中只有 `.vite-temp` 被特殊对待。
- 算是 Vite + VS Code 调试场景中的一个 **经典痛点和标准解法**。

---

- 1️⃣ 完成 `.vscode/settings.json` 配置之后，在终端输入 `export NODE_OPTIONS='--inspect-brk'`
  - 作用是：为当前终端会话中后续启动的所有 Node.js 进程全局启用调试器，并在用户代码执行前自动断点暂停。
  - Node.js 启动后不会立刻运行你的脚本，会停下来等调试器连接。
- 2️⃣ 运行 `pnpm dev`
  - 本质是运行 `node ./node_modules/bin/vite.js`
  - 1️⃣ + 2️⃣ 等价于 `node --inspect-brk ./node_modules/vite/bin/vite.js`
  - 如果你经常有调试的需求，可以在 `package.json` 中的 `scripts` 字段中加一条专门用于调试的命令，比如：`"dev:debug": "node --inspect-brk ./node_modules/vite/bin/vite.js"`
- 3️⃣ `ctrl shift p` 打开 VSCode 命令面板输入 `Debug: Attach to Node Process`，连接上 Node.js Vite 进程，进行调试。
- ![图 3](https://cdn.jsdelivr.net/gh/tnotesjs/imgs@main/2025-10-05-19-31-53.png)

---

- 评价：如果是简单的调试需求，直接 `console.log` 更是在一些。

## 13. 🔗 引用

- [config][1]
- [vite/packages/vite/src/node/config.ts][2]
- [vite 配置][3]
- [Node.js 官方文档 - Debugging Node.js][4]

[1]: https://cn.vite.dev/config/
[2]: https://github.com/vitejs/vite/blob/main/packages/vite/src/node/config.ts
[3]: https://cn.vite.dev/config/
[4]: https://nodejs.org/en/learn/getting-started/debugging
