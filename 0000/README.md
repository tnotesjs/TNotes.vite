# 0000

## 📒 notes - markmap 暂且不使用

- markmap 暂且不使用
  - 如果用来生成图片的话，生成的图片质量很差，完全没法看。
  - 虽然是根据解析 markdown 的内容来生成思维导图（svg），但是内容解析并不全面，有很多重要的节点被忽略了。
  - 有时间的话可以研究研究 markmap 的源码，看看相关痛点问题是否能够解决。
  - 可以关注一下 markmap 的相关动态，说不定后续迭代的某个版本就把这些问题都处理了。

## ❌ errors - markmap - 提示找不到 chrome 的错误

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