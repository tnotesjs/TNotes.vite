# [0088. Dev Server 基础](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0088.%20Dev%20Server%20%E5%9F%BA%E7%A1%80)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 启动开发服务器](#3-启动开发服务器)
- [4. 局域网访问](#4-局域网访问)
- [5. 固定端口](#5-固定端口)
- [6. 自动打开浏览器](#6-自动打开浏览器)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 开发服务器的基本使用方式
- 掌握局域网访问、固定端口、自动打开浏览器等常用配置

## 2. 评价

- Dev Server 是日常开发中最常用的命令，掌握其配置能提升开发效率
- 大部分配置可以通过 CLI 参数快速设置

## 3. 启动开发服务器

- 基本启动方式：

```bash
# 直接启动
vite

# 通过 npm script（推荐）
npm run dev
```

- `package.json` 中的配置：

```json
{
  "scripts": {
    "dev": "vite",
    "dev:host": "vite --host",
    "dev:port": "vite --port 3000"
  }
}
```

- 启动后 Vite 会输出：
  - 本地访问地址：`http://localhost:5173/`
  - 网络访问地址：`http://192.168.x.x:5173/`（需要 `--host`）
  - 启动耗时

## 4. 局域网访问

- 默认只能通过 `localhost` 访问，局域网其他设备无法连接
- 开启局域网访问：

```bash
vite --host
# 或
vite --host 0.0.0.0
```

- 在 `vite.config.ts` 中配置：

```ts
export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
})
```

- 典型场景：移动端真机调试，需要手机和电脑在同一局域网内

## 5. 固定端口

- 默认端口 5173，如果被占用会自动尝试下一个端口
- 指定端口：

```bash
vite --port 3000
```

- 强制使用指定端口（端口被占用时直接报错）：

```ts
export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
  },
})
```

## 6. 自动打开浏览器

```bash
vite --open
```

- 在配置文件中：

```ts
export default defineConfig({
  server: {
    open: true,
    // 或指定打开的路径
    // open: '/index.html',
  },
})
```
