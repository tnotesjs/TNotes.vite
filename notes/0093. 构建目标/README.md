# [0093. 构建目标](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0093.%20%E6%9E%84%E5%BB%BA%E7%9B%AE%E6%A0%87)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `build.target`](#3-buildtarget)
- [4. 浏览器兼容性](#4-浏览器兼容性)
- [5. ESNext](#5-esnext)
- [6. Modern Browser](#6-modern-browser)
- [7. Legacy Browser](#7-legacy-browser)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 `build.target` 配置的作用和可选值
- 理解不同构建目标对产物兼容性的影响
- 掌握现代浏览器和旧版浏览器的构建策略

## 2. 评价

- `build.target` 直接影响产物的语法兼容性和体积
- 大部分项目使用默认值即可，需要兼容旧浏览器时再调整

## 3. `build.target`

- 指定构建产物的 JavaScript 语法兼容目标
- 默认值为 Vite 的浏览器兼容目标（通常是支持 ESM 的现代浏览器）
- 常用值：
  - `'es2015'`（ES6）：兼容到 IE11 以上的浏览器
  - `'es2020'`：支持可选链（`?.`）、空值合并（`??`）等
  - `'esnext'`：不降级，使用最新语法
  - `'modules'`：根据浏览器对 ESM 的支持来决定
  - 具体浏览器版本：`'chrome87'`、`'safari14'` 等

```ts
export default defineConfig({
  build: {
    target: 'es2020',
  },
})
```

- CLI 快捷方式：`vite build --target es2018`

## 4. 浏览器兼容性

- `build.target` 决定了 Esbuild 和 Rollup 在转译时保留哪些语法特性
- 例如 `target: 'es2020'` 时：
  - ✅ 可选链 `?.`、空值合并 `??` 会被保留（es2020 支持）
  - ❌ 类的私有字段 `#field` 会被降级（es2022 特性）
- 不同 target 对产物体积的影响：
  - target 越旧，降级代码越多，产物体积越大
  - target 越新，保留原生语法，产物更小

## 5. ESNext

- `target: 'esnext'` 表示不做任何语法降级
- 产物使用最新的 JavaScript 语法
- 优势：产物最小、性能最好
- 风险：不兼容旧版浏览器
- 适用场景：
  - 内部系统（已知用户使用现代浏览器）
  - Electron 应用
  - 微信小程序（已知 JS 引擎版本）

## 6. Modern Browser

- 推荐的现代浏览器目标：

```ts
export default defineConfig({
  build: {
    target: 'es2020', // 支持 Chrome 80+、Firefox 72+、Safari 14+
  },
})
```

- 覆盖了绝大部分用户的浏览器
- 支持现代语法特性，产物体积较小
- 配合 `browserslist` 可以更精确地控制目标范围

## 7. Legacy Browser

- 需要兼容旧版浏览器时，使用 `@vitejs/plugin-legacy`：

```ts
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
})
```

- Legacy 插件的工作方式：
  1. 生成现代浏览器的 ESM 产物
  2. 同时生成旧版浏览器的 ES5 产物
  3. 通过 `<script type="module">` 和 `<script nomodule>` 实现渐进式加载
  4. 自动注入 Polyfill（core-js）
- 代价：构建产物体积会显著增加（ES5 代码 + Polyfill）
