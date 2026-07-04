# [0117. 外部依赖](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0117.%20%E5%A4%96%E9%83%A8%E4%BE%9D%E8%B5%96)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. `external`](#3-external)
- [4. `globals`](#4-globals)
- [5. peerDependencies](#5-peerdependencies)
- [6. dependencies](#6-dependencies)
- [7. devDependencies](#7-devdependencies)

<!-- endregion:toc -->

## 1. 本节内容

- 了解库模式中外部依赖的配置方式
- 掌握 `external` 和 `globals` 的使用
- 理解 `peerDependencies`、`dependencies`、`devDependencies` 的区别

## 2. 评价

- 外部依赖配置是库打包中最容易出错的环节
- 正确配置 `external` 可以避免库的产物体积膨胀

## 3. `external`

- 指定不打包到产物中的依赖，由消费者自行安装

```ts
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['vue', 'vue-router', 'react', 'react-dom'],
    },
  },
})
```

- 通常将 `peerDependencies` 和 `dependencies` 设为外部依赖
- 支持正则匹配：`external: [/^vue/, /^react/]`

## 4. `globals`

- 为 UMD/IIFE 格式指定外部依赖的全局变量名

```ts
rollupOptions: {
  external: ['vue', 'react'],
  output: {
    globals: {
      vue: 'Vue',
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
}
```

- 当通过 `<script>` 标签引入时，需要确保这些全局变量已存在

## 5. peerDependencies

- 声明库的对等依赖（宿主环境应提供的依赖）

```json
{
  "peerDependencies": {
    "vue": "^3.0.0"
  }
}
```

- peerDependencies 不会被打包到产物中
- 消费者需要自行安装对应版本

## 6. dependencies

- 声明库的运行时依赖

```json
{
  "dependencies": {
    "lodash-es": "^4.17.21"
  }
}
```

- 库模式下通常将 dependencies 设为外部依赖
- 如果不设为 external，依赖会被打包到产物中

## 7. devDependencies

- 开发依赖，不会被打包也不会被消费者安装

```json
{
  "devDependencies": {
    "vite": "^6.0.0",
    "typescript": "^5.0.0"
  }
}
```

- 构建工具、类型检查工具等属于 devDependencies
