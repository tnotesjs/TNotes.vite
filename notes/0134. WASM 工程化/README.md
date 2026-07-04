# [0134. WASM 工程化](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0134.%20WASM%20%E5%B7%A5%E7%A8%8B%E5%8C%96)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Rust + WASM](#3-rust--wasm)
- [4. AssemblyScript](#4-assemblyscript)
- [5. 性能优化](#5-性能优化)
- [6. 类型声明](#6-类型声明)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 WASM 的工程化方案
- 掌握 Rust + WASM 和 AssemblyScript 的开发流程
- 了解 WASM 的性能优化和类型声明

## 2. 评价

- Rust + WASM 是目前最成熟的 WASM 开发方案
- AssemblyScript 适合前端开发者快速上手 WASM

## 3. Rust + WASM

- Rust 是 WASM 开发的首选语言，工具链成熟：

```bash
# 安装 wasm-pack
cargo install wasm-pack

# 构建 WASM
wasm-pack build --target web
```

- Rust 代码示例：

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

- 在 Vite 中使用：

```ts
import init, { add } from './pkg/my_wasm'

await init()
const result = add(1, 2)
```

## 4. AssemblyScript

- AssemblyScript 是 TypeScript 的子集，专门用于编译为 WASM：

```bash
npm install assemblyscript
npx asc assembly/index.ts -o build/module.wasm
```

- 代码示例（类似 TypeScript）：

```ts
export function add(a: i32, b: i32): i32 {
  return a + b
}
```

- 优势：前端开发者无需学习 Rust，使用类 TypeScript 语法即可编写 WASM

## 5. 性能优化

- WASM 性能优化的关键：
  - 减少 JS 和 WASM 之间的通信次数（批量传递数据）
  - 使用共享内存（`WebAssembly.Memory`）避免数据复制
  - 将计算密集的逻辑完全放在 WASM 中
  - 使用 `wasm-opt` 工具优化 WASM 二进制体积

```bash
wasm-opt -O3 -o optimized.wasm input.wasm
```

## 6. 类型声明

- 为 WASM 模块添加 TypeScript 类型声明：

```ts
// src/wasm.d.ts
declare module '*.wasm' {
  const init: () => Promise<void>
  export default init
  export function add(a: number, b: number): number
}
```

- `wasm-pack` 会自动生成 `.d.ts` 文件，无需手动编写
