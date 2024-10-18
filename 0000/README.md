# 0000

## ❌ errors - 提示找不到 chrome 的错误

```shell
> node genMarkmap.js
[Running] node "c:\Users\Tdahuyou\Desktop\notes\vite\0000\genMarkmap.js"
C:\Users\Tdahuyou\Desktop\notes\vite\0000\node_modules\.pnpm\puppeteer-cluster@0.24.0_puppeteer@23.2.2\node_modules\puppeteer-cluster\dist\Cluster.js:119
                throw new Error(`Unable to launch browser, error message: ${err.message}`);
                      ^

Error: Unable to launch browser, error message: Could not find Chrome (ver. 128.0.6613.119). This can occur if either
 1. you did not perform an installation before running the script (e.g. `npx puppeteer browsers install ${browserType}`) or
 2. your cache path is incorrectly configured (which is: C:\Users\Tdahuyou\.cache\puppeteer).
For (2), check out our guide on configuring puppeteer at https://pptr.dev/guides/configuration.
    at Cluster.<anonymous> (C:\Users\Tdahuyou\Desktop\notes\vite\0000\node_modules\.pnpm\puppeteer-cluster@0.24.0_puppeteer@23.2.2\node_modules\puppeteer-cluster\dist\Cluster.js:119:23)
    at Generator.throw (<anonymous>)
    at rejected (C:\Users\Tdahuyou\Desktop\notes\vite\0000\node_modules\.pnpm\puppeteer-cluster@0.24.0_puppeteer@23.2.2\node_modules\puppeteer-cluster\dist\Cluster.js:6:65)

Node.js v20.15.0

[Done] exited with code=1 in 0.693 seconds
```