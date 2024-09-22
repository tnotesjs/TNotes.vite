import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig({
  server: {
    port: 3000, // 端口号改为 3000（默认端口是 5173，若端口号冲突了，可以在这里自定义端口）
    open: true, // 自动打开浏览器
  },
  plugins: [
    viteMockServe({
      mockPath: 'mock', // 指定存放 mock 文件的文件夹
      enable: process.env.NODE_ENV === 'development', // 在开发环境启用 mock 功能
    }),
  ],
})
