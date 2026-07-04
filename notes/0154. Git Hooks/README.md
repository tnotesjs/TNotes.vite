# [0154. Git Hooks](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0154.%20Git%20Hooks)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Husky](#3-husky)
- [4. lint-staged](#4-lint-staged)
- [5. commitlint](#5-commitlint)
- [6. Commit Message 规范](#6-commit-message-规范)

<!-- endregion:toc -->

## 1. 本节内容

- 了解 Git Hooks 在前端项目中的应用
- 掌握 Husky、lint-staged、commitlint 的配置方式
- 了解 Commit Message 规范

## 2. 评价

- Git Hooks 是代码质量保障的最后一道防线
- 推荐所有团队项目配置 Husky + lint-staged

## 3. Husky

- Git Hooks 管理工具，在 `git commit` 时自动运行检查：

```bash
npm install -D husky
npx husky init
```

- 创建 Hook 脚本：

```bash
echo "npx lint-staged" > .husky/pre-commit
```

## 4. lint-staged

- 只对 Git 暂存区的文件运行 lint，速度快：

```bash
npm install -D lint-staged
```

```json
// package.json
{
  "lint-staged": {
    "*.{js,ts,vue,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,scss}": ["stylelint --fix", "prettier --write"]
  }
}
```

## 5. commitlint

- 校验 Commit Message 是否符合规范：

```bash
npm install -D @commitlint/cli @commitlint/config-conventional
```

```bash
echo "npx commitlint --edit $1" > .husky/commit-msg
```

```ts
// commitlint.config.ts
export default {
  extends: ['@commitlint/config-conventional'],
}
```

## 6. Commit Message 规范

- 遵循 Conventional Commits 规范：

```
<type>(<scope>): <description>

feat(auth): add login page
fix(api): handle timeout error
docs(readme): update installation guide
refactor(utils): extract helper functions
chore(deps): update dependencies
```

- 常用 type：
  - `feat`：新功能
  - `fix`：Bug 修复
  - `docs`：文档更新
  - `refactor`：重构
  - `chore`：构建/工具变更
  - `test`：测试相关
  - `style`：代码格式（不影响逻辑）
