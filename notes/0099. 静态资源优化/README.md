# [0099. 静态资源优化](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0099.%20%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90%E4%BC%98%E5%8C%96)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 图片压缩](#3-图片压缩)
- [4. WebP / AVIF](#4-webp--avif)
- [5. 字体子集化](#5-字体子集化)
- [6. Gzip / Brotli](#6-gzip--brotli)
- [7. CDN 加速](#7-cdn-加速)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 中静态资源的优化策略
- 掌握图片压缩、现代图片格式、字体优化和 CDN 加速

## 2. 评价

- 静态资源通常是网页体积的主要组成部分，优化效果显著
- 图片压缩和 CDN 加速是最容易见效的优化手段

## 3. 图片压缩

- Vite 不内置图片压缩，需要通过插件实现（如 `vite-plugin-imagemin`）：

```bash
npm install -D vite-plugin-imagemin
```

```ts
import imagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    imagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 20 },
      pngquant: { quality: [0.8, 0.9] },
      svgo: { plugins: [{ name: 'removeViewBox' }] },
    }),
  ],
})
```

- 替代方案：在 CI/CD 中使用独立的图片压缩工具（如 `sharp`、`squoosh`）

## 4. WebP / AVIF

- 现代图片格式的体积比 JPEG/PNG 小 25-50%
- WebP：Chrome、Firefox、Safari 14+ 支持
- AVIF：Chrome 85+、Firefox 93+ 支持，压缩率更高
- 使用 `vite-plugin-image-presets` 实现自动格式转换：

```ts
import { definePreset } from 'vite-plugin-image-presets'

const thumbnail = definePreset('thumbnail', {
  formats: {
    avif: {},
    webp: {},
    jpg: { quality: 80 },
  },
  widths: [400, 800],
})
```

- 也可以使用 `<picture>` 标签手动提供多种格式的 fallback

## 5. 字体子集化

- 中文字体文件通常很大（几 MB），子集化可以大幅减小体积
- 使用 `font-spider` 或 `cn-font-split` 提取项目中实际使用的字符：

```bash
npx cn-font-split --fonts ./src/fonts/font.ttf --text "实际使用的文字"
```

- Google Fonts 的中文字体自动提供子集化（按需加载 Unicode range）
- 推荐方案：
  - 使用 Google Fonts 的在线字体服务
  - 使用 `cn-font-split` 对自定义字体进行子集化
  - 使用 `font-display: swap` 避免字体加载阻塞渲染

## 6. Gzip / Brotli

- 使用 `vite-plugin-compression` 在构建时生成预压缩文件：

```ts
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    compression({ algorithm: 'gzip' }),
    compression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],
})
```

- 配合 Nginx 配置：

```nginx
gzip_static on;
brotli_static on;
```

- 预压缩比实时压缩更高效，Nginx 直接返回预压缩文件，无需运行时压缩

## 7. CDN 加速

- 将静态资源部署到 CDN，减少网络延迟：

```ts
export default defineConfig({
  base: 'https://cdn.example.com/assets/',
})
```

- CDN 配置建议：
  - JS、CSS、图片等带哈希的资源 → 长期缓存（`Cache-Control: max-age=31536000`）
  - `index.html` → 不缓存或短期缓存（`Cache-Control: no-cache`）
  - 使用 CDN 的 HTTP/2 或 HTTP/3 支持
  - 配置 CORS 头允许跨域加载
