# [0166. 包体积优化](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0166.%20%E5%8C%85%E4%BD%93%E7%A7%AF%E4%BC%98%E5%8C%96)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 替换大型依赖](#3-替换大型依赖)
- [4. 按需导入](#4-按需导入)
- [5. Tree Shaking](#5-tree-shaking)
- [6. 图片压缩](#6-图片压缩)
- [7. 字体优化](#7-字体优化)

<!-- endregion:toc -->

## 1. 本节内容

- 了解减小 Vite 构建产物体积的优化策略
- 掌握替换大型依赖、按需导入、Tree Shaking 等技巧

## 2. 评价

- 包体积优化对首屏加载速度影响最大
- 替换大型依赖和按需导入是最有效的优化手段

## 3. 替换大型依赖

- 常见的大型依赖替换方案：

| 大型依赖 | 体积   | 替代方案     | 体积              |
| -------- | ------ | ------------ | ----------------- |
| moment   | ~300KB | dayjs        | ~2KB              |
| lodash   | ~500KB | lodash-es    | 支持 Tree Shaking |
| axios    | ~14KB  | ofetch / ky  | ~3KB              |
| jQuery   | ~87KB  | 原生 DOM API | 0                 |

## 4. 按需导入

- UI 组件库按需导入：

```ts
// ❌ 全量导入
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// ✅ 按需导入（自动）
import { ElButton, ElInput } from 'element-plus'
```

- 使用 `unplugin-vue-components` 实现自动按需导入
- 图标库按需导入：使用 `unplugin-icons`

## 5. Tree Shaking

- 确保 Tree Shaking 生效：
  - 使用 ESM 格式的库
  - 设置 `"sideEffects": false`
  - 避免副作用导入
  - 使用 `rollup-plugin-visualizer` 分析未被 Tree Shaking 的代码

## 6. 图片压缩

- 使用 `vite-plugin-imagemin` 压缩图片
- 使用现代图片格式（WebP、AVIF）替代 JPEG/PNG
- 响应式图片：根据设备加载不同尺寸的图片

## 7. 字体优化

- 字体子集化：只包含项目中使用的字符
- 使用 `font-display: swap` 避免字体加载阻塞
- 使用系统字体栈作为 fallback
