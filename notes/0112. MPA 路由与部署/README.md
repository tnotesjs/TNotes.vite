# [0112. MPA 路由与部署](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0112.%20MPA%20%E8%B7%AF%E7%94%B1%E4%B8%8E%E9%83%A8%E7%BD%B2)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 页面路径](#3-页面路径)
- [4. Nginx 配置](#4-nginx-配置)
- [5. 静态服务器配置](#5-静态服务器配置)
- [6. 多页面缓存策略](#6-多页面缓存策略)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 MPA 的页面路径和路由方式
- 掌握 Nginx 和静态服务器的 MPA 部署配置

## 2. 评价

- MPA 不需要前端路由（如 Vue Router），每个页面是独立的 HTML
- 部署时需要确保每个 HTML 文件都能被正确访问

## 3. 页面路径

- MPA 的每个页面有独立的 URL 路径：
  - `https://example.com/` → `index.html`
  - `https://example.com/admin/` → `admin/index.html`
  - `https://example.com/login.html` → `login.html`
- 开发时通过 Vite Dev Server 直接访问各个页面

## 4. Nginx 配置

- MPA 不需要 SPA fallback，每个页面有独立的 HTML 文件：

```nginx
server {
  listen 80;
  server_name example.com;
  root /var/www/dist;

  # 每个 HTML 文件直接返回
  location / {
    try_files $uri $uri/ $uri.html =404;
  }

  # 静态资源缓存
  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

## 5. 静态服务器配置

- Vercel、Netlify 等平台自动支持 MPA 部署
- 每个 HTML 文件自动成为独立的路由
- 不需要额外的重写规则

## 6. 多页面缓存策略

- HTML 文件：不缓存或短期缓存（`Cache-Control: no-cache`）
- JS/CSS 资源：长期缓存（`Cache-Control: max-age=31536000, immutable`）
- 图片/字体：长期缓存
- 确保 HTML 中引用的资源路径带内容哈希，避免缓存不一致
