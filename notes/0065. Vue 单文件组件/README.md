# [0065. Vue 单文件组件](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0065.%20Vue%20%E5%8D%95%E6%96%87%E4%BB%B6%E7%BB%84%E4%BB%B6)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `.vue` 编译](#3-vue-编译)
- [4. `<script setup>`](#4-script-setup)
- [5. `<style scoped>`](#5-style-scoped)
- [6. CSS Modules](#6-css-modules)
- [7. HMR](#7-hmr)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vue 单文件组件（SFC）在 Vite 中的编译流程
- 掌握 `<script setup>`、`<style scoped>`、CSS Modules 的使用方式
- 理解 Vue SFC 的 HMR 机制

## 2. 评价

- Vue SFC 是 Vue 项目的主要开发方式，Vite 对其支持非常完善
- `<script setup>` + `<style scoped>` 是当前 Vue 3 的标准写法

## 3. `.vue` 编译

- Vite 通过 `@vitejs/plugin-vue` 编译 `.vue` 文件
- 编译流程：
  1. Vue Compiler 解析 SFC，拆分为 `<template>`、`<script>`、`<style>` 三部分
  2. `<template>` 编译为渲染函数（`render` 函数）
  3. `<script>` / `<script setup>` 转换为 ES 模块
  4. `<style>` / `<style scoped>` 提取为 CSS
- 编译结果：一个 `.vue` 文件被拆分为 JS 模块 + CSS 模块
- 开发阶段使用 Vue Compiler 的运行时版本（支持模板编译）
- 生产构建时使用完整版编译器或预编译模板

## 4. `<script setup>`

- Vue 3.2+ 引入的语法糖，简化 Composition API 的使用
- 特点：
  - 顶层变量和函数自动暴露给模板
  - 无需手动 `return` 和 `setup()` 函数
  - 支持 `defineProps`、`defineEmits`、`defineExpose` 等编译宏
  - 天然支持 TypeScript 类型推导

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const increment = () => count.value++
</script>

<template>
  <button @click="increment">Count: {{ count }}</button>
</template>
```

- Vite 中的处理：`@vitejs/plugin-vue` 使用 Vue Compiler 将 `<script setup>` 编译为标准的 `setup()` 函数

## 5. `<style scoped>`

- 为组件样式添加作用域，避免样式污染
- 实现原理：Vue 为每个组件的 DOM 元素添加唯一的 `data-v-xxx` 属性，CSS 选择器自动追加该属性

```vue
<style scoped>
.title {
  color: red;
}
</style>

<!-- 编译后 -->
<!-- DOM: <div data-v-abc123>...</div> -->
<!-- CSS: .title[data-v-abc123] { color: red; } -->
```

- 注意：scoped 样式中使用 `:deep()` 可以穿透子组件的作用域

```vue
<style scoped>
:deep(.child-component .title) {
  color: blue;
}
</style>
```

## 6. CSS Modules

- Vue SFC 也支持 CSS Modules，使用 `<style module>`：

```vue
<template>
  <div :class="$style.container">
    <h1 :class="$style.title">Hello</h1>
  </div>
</template>

<style module>
.container {
  max-width: 1200px;
}
.title {
  color: red;
}
</style>
```

- 也可以使用自定义名称：`<style module="classes">`，然后通过 `classes.xxx` 访问
- CSS Modules 与 Scoped CSS 的选择：
  - Scoped CSS：更简单，适合大部分场景
  - CSS Modules：更灵活，支持动态类名，性能略好

## 7. HMR

- Vue SFC 的 HMR 由 `@vitejs/plugin-vue` 提供，实现了组件级热替换
- 不同部分的 HMR 行为：
  - `<template>` 修改：重新渲染组件，保留组件状态
  - `<script setup>` 修改：重新执行 setup，组件状态重置
  - `<style>` 修改：即时替换样式，不影响 DOM 和状态
  - `<style scoped>` 修改：同上，只替换样式
- HMR 是 Vue 开发体验的核心优势之一，修改代码后无需手动刷新页面
