# [0157. 静态部署](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0157.%20%E9%9D%99%E6%80%81%E9%83%A8%E7%BD%B2)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Nginx](#3-nginx)
- [4. Apache](#4-apache)
- [5. Caddy](#5-caddy)
- [6. Node 静态服务](#6-node-静态服务)
- [7. CDN](#7-cdn)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 构建产物的静态部署方式
- 掌握 Nginx、Apache、Caddy 等服务器的配置

## 2. 评价

- 静态部署是最简单的部署方式，将 `dist/` 目录放到服务器即可
- Nginx 是最常用的静态文件服务器

## 3. Nginx

- 最常用的静态文件服务器：

```nginx
server {
  listen 80;
  server_name example.com;
  root /var/www/dist;

  # SPA fallback
  location / {
    try_files $uri $uri/ /index.html;
  }

  # 静态资源长期缓存
  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # gzip 压缩
  gzip on;
  gzip_types text/css application/javascript application/json;
}
```

## 4. Apache

- 使用 `.htaccess` 配置：

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 5. Caddy

- 现代的 Web 服务器，配置简洁：

```
example.com {
  root * /var/www/dist
  file_server
  try_files {path} /index.html
  header /assets/* Cache-Control "public, max-age=31536000, immutable"
}
```

## 6. Node 静态服务

- 使用 `serve` 或 `http-server` 快速启动静态服务：

```bash
npx serve dist
npx http-server dist
```

- 适合本地预览和简单的部署场景

## 7. CDN

- 将静态资源部署到 CDN，减少网络延迟：

```ts
// vite.config.ts
export default defineConfig({
  base: 'https://cdn.example.com/assets/',
})
```

- HTML 文件部署在源站，JS/CSS/图片等资源从 CDN 加载
