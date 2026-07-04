# [0148. 端到端测试](https://github.com/tnotesjs/TNotes.vite/tree/main/notes/0148.%20%E7%AB%AF%E5%88%B0%E7%AB%AF%E6%B5%8B%E8%AF%95)

<!-- region:toc -->

- [1. 本节内容](#1-本节内容)
- [2. 评价](#2-评价)
- [3. Playwright](#3-playwright)
- [4. Cypress](#4-cypress)
- [5. 测试环境启动](#5-测试环境启动)
- [6. CI 集成](#6-ci-集成)

<!-- endregion:toc -->

## 1. 本节内容

- 了解端到端（E2E）测试的概念和工具选择
- 掌握 Playwright 和 Cypress 的基本使用
- 了解 E2E 测试的 CI 集成方式

## 2. 评价

- E2E 测试模拟真实用户操作，是最接近生产环境的测试方式
- 推荐 Playwright（跨浏览器支持更好、API 更现代）

## 3. Playwright

- Microsoft 开发的 E2E 测试框架，支持 Chromium、Firefox、WebKit

```bash
npm install -D @playwright/test
npx playwright install
```

```ts
// tests/home.spec.ts
import { test, expect } from '@playwright/test'

test('homepage loads correctly', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await expect(page.locator('h1')).toContainText('Welcome')
  await page.click('button:text("Get Started")')
  await expect(page).toHaveURL('/getting-started')
})
```

## 4. Cypress

- 另一款流行的 E2E 测试框架，开发者体验好

```bash
npm install -D cypress
npx cypress open
```

```ts
// cypress/e2e/home.cy.ts
describe('Home Page', () => {
  it('loads correctly', () => {
    cy.visit('http://localhost:5173/')
    cy.get('h1').should('contain', 'Welcome')
    cy.contains('Get Started').click()
    cy.url().should('include', '/getting-started')
  })
})
```

## 5. 测试环境启动

- E2E 测试需要先启动开发服务器：

```ts
// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})
```

## 6. CI 集成

- 在 CI 中运行 E2E 测试：

```yaml
# GitHub Actions
- name: Install Playwright
  run: npx playwright install --with-deps

- name: Run E2E Tests
  run: npx playwright test

- uses: actions/upload-artifact@v4
  if: failure()
  with:
    name: playwright-report
    path: playwright-report/
```
