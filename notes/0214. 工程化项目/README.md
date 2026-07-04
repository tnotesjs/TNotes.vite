# [0214. 工程化项目](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0214.%20%E5%B7%A5%E7%A8%8B%E5%8C%96%E9%A1%B9%E7%9B%AE)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 自动化部署](#3-自动化部署)
- [4. ESLint + Prettier + Vitest](#4-eslint--prettier--vitest)
- [5. CI/CD](#5-cicd)
- [6. Docker 部署](#6-docker-部署)
- [7. 性能监控与错误监控](#7-性能监控与错误监控)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Vite 项目的工程化最佳实践
- 掌握自动化部署、代码质量工具、CI/CD、Docker、性能监控的集成

## 2. 评价

- 工程化是大型项目的基石，确保代码质量和交付效率

## 3. 自动化部署

- 使用 GitHub Actions / GitLab CI 实现自动化部署：

```yaml
# GitHub Actions 示例
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install && pnpm build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          publish_dir: ./dist
```

## 4. ESLint + Prettier + Vitest

- 完整的代码质量工具链：
  - ESLint：代码规范检查
  - Prettier：代码格式化
  - Vitest：单元测试和组件测试
  - Husky + lint-staged：Git Hooks 自动检查

## 5. CI/CD

- 完整的 CI/CD 流程：
  1. 代码提交触发 CI
  2. 安装依赖（使用缓存）
  3. 运行 ESLint 检查
  4. 运行 TypeScript 类型检查
  5. 运行单元测试
  6. 构建项目
  7. 部署到目标环境

## 6. Docker 部署

- 使用 Docker 容器化部署：

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

## 7. 性能监控与错误监控

- 性能监控：使用 Web Vitals 采集 FCP、LCP、CLS 等指标
- 错误监控：使用 Sentry 等平台捕获运行时错误
- 部署监控：使用 Lighthouse CI 持续检测性能分数
