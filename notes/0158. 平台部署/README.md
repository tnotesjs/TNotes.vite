# [0158. 平台部署](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0158.%20%E5%B9%B3%E5%8F%B0%E9%83%A8%E7%BD%B2)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Vercel](#3-vercel)
- [4. Netlify](#4-netlify)
- [5. GitHub Pages](#5-github-pages)
- [6. GitLab Pages](#6-gitlab-pages)
- [7. Cloudflare Pages](#7-cloudflare-pages)
- [8. Docker](#8-docker)

<!-- endregion:toc -->

## 1. 本节内容

- 了解主流前端部署平台的配置方式
- 掌握 Vercel、Netlify、GitHub Pages 等平台的部署方法

## 2. 评价

- 托管平台是前端项目最便捷的部署方式，推荐 Vercel 或 Netlify
- 每个平台都有免费额度，适合个人项目和小型团队

## 3. Vercel

- Vercel 是 Next.js 的母公司，对 Vite 项目支持很好
- 部署方式：连接 Git 仓库，自动构建和部署
- 特点：
  - 自动 HTTPS
  - 全球 CDN
  - 预览部署（每个 PR 自动生成预览链接）
  - Serverless Functions 支持

## 4. Netlify

- 与 Vercel 类似的前端托管平台
- 部署方式：连接 Git 仓库或拖拽 `dist/` 目录
- 特点：
  - 自动 HTTPS
  - 表单处理
  - 身份认证
  - 插件系统

## 5. GitHub Pages

- GitHub 仓库的免费静态托管：

```yaml
# .github/workflows/deploy.yml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
```

- 注意：需要设置 `base` 为仓库名（如 `/repo-name/`）

## 6. GitLab Pages

- GitLab 的静态托管服务：

```yaml
# .gitlab-ci.yml
pages:
  script:
    - npm run build
  artifacts:
    paths:
      - dist
  only:
    - main
```

## 7. Cloudflare Pages

- Cloudflare 提供的前端托管平台
- 特点：
  - 全球 CDN（Cloudflare 的网络）
  - 无限带宽
  - 支持 Edge Functions
  - 构建速度快

## 8. Docker

- 使用 Docker 容器部署静态文件：

```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

- 适合需要自定义服务器配置的场景
