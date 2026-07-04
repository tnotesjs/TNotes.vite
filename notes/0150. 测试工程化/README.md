# [0150. 测试工程化](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0150.%20%E6%B5%8B%E8%AF%95%E5%B7%A5%E7%A8%8B%E5%8C%96)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. 测试目录规范](#3-测试目录规范)
- [4. 测试命名规范](#4-测试命名规范)
- [5. 覆盖率门禁](#5-覆盖率门禁)
- [6. Git Hooks 中运行测试](#6-git-hooks-中运行测试)

<!-- endregion:toc -->

## 1. 本节内容

- 了解测试工程化的最佳实践
- 掌握测试目录规范、命名规范和覆盖率门禁

## 2. 评价

- 良好的测试工程化可以提升团队的测试效率和代码质量

## 3. 测试目录规范

- 推荐的测试文件组织方式：

```
src/
├── components/
│   ├── Button.vue
│   └── Button.test.ts      # 与源码同目录
├── utils/
│   ├── format.ts
│   └── format.test.ts
└── __tests__/               # 或集中存放
    ├── components/
    └── utils/
```

- 两种方式各有优劣：
  - 同目录：便于查找，修改源码时容易想到更新测试
  - 集中存放：目录结构更清晰，测试文件不混在源码中

## 4. 测试命名规范

- 测试文件：`*.test.ts` 或 `*.spec.ts`
- 测试套件（describe）：使用被测试模块的名称
- 测试用例（it/test）：使用"should + 行为"的格式

```ts
describe('formatDate', () => {
  it('should format date to YYYY-MM-DD', () => {
    /* ... */
  })
  it('should handle invalid date', () => {
    /* ... */
  })
  it('should use custom format', () => {
    /* ... */
  })
})
```

## 5. 覆盖率门禁

- 在 CI 中设置覆盖率最低阈值：

```ts
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
})
```

- 覆盖率不达标时 CI 构建失败，阻止合并

## 6. Git Hooks 中运行测试

- 使用 Husky + lint-staged 在提交前运行相关测试：

```json
{
  "lint-staged": {
    "*.{ts,vue,tsx}": ["vitest related --run"]
  }
}
```

- `vitest related --run` 只运行与变更文件相关的测试
- 不建议在 Git Hooks 中运行全部测试（太慢），全部测试应在 CI 中运行
