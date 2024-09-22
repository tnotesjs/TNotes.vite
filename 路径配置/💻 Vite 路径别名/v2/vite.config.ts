import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

const pathResolve = (dir: string) => resolve(process.cwd(), '.', dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: /@\//, replacement: pathResolve('src') + '/' }, // @/xxxx => src/xxxx
      { find: /#\//, replacement: pathResolve('types') + '/' }, // #/xxxx => types/xxxx
    ],
  },
})