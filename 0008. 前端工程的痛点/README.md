# 0008. 前端工程的痛点


<body style="margin: 0;padding: 0;max-width: 800px;max-height: 600px;margin: 0 auto;">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.8.0/styles/default.min.css">
<svg id="mindmap" style="display: block;max-width: 800px;max-height: 600px;margin: 0 auto;"></svg>
<script src="https://cdn.jsdelivr.net/npm/d3@7.8.5/dist/d3.min.js"></script><script src="https://cdn.jsdelivr.net/npm/markmap-view@0.17.2/dist/browser/index.js"></script><script>((getMarkmap, getOptions, root2, jsonOptions) => {
              const markmap = getMarkmap();
              window.mm = markmap.Markmap.create(
                "svg#mindmap",
                (getOptions || markmap.deriveOptions)(jsonOptions),
                root2
              );
            })(() => window.markmap,null,{"content":"0008. 前端工程的痛点","children":[{"content":"markmap","children":[{"content":"<img src=\"md-imgs/markmap.png\" alt=\"\">","children":[]}],"payload":{"lines":"2,3"}},{"content":"📝 summary","children":[],"payload":{"lines":"7,8"}},{"content":"🔗 links","children":[],"payload":{"lines":"11,12"}},{"content":"📒 notes","children":[],"payload":{"lines":"15,16"}},{"content":"💻 demo","children":[{"content":"<pre><code data-lines=\"21,24\">\n</code></pre>","children":[],"payload":{"lines":"21,24"}}],"payload":{"lines":"19,20"}}],"payload":{"lines":"0,1"}},{"maxWidth":400,"colorFreezeLevel":2,"duration":0,"spacingVertical":20})</script>
</body>

## 📝 summary


## 🔗 links

- https://rawgit.com/

## 📒 notes



## 💻 demo

```

```

## 🤖 ai - github 仓库中的 html 如何预览呢？可以在 markdown 中预览吗？

在 GitHub 仓库中，直接预览 HTML 文件并不是非常直观，因为 GitHub 默认不会渲染和显示 HTML 文件的内容。不过，有几种方法可以让你在 GitHub 上预览 HTML 文件或在 Markdown 中嵌入 HTML 内容。

### 方法一：使用 GitHub Pages
GitHub Pages 是一种将静态网站托管在 GitHub 上的方法。你可以通过以下步骤来设置：

1. **创建一个分支**：
   - 通常，GitHub Pages 使用 `gh-pages` 分支或 `docs` 目录来托管网站。
   - 你可以在你的仓库中创建一个新的 `gh-pages` 分支，或者在 `main` 或 `master` 分支的根目录下创建一个 `docs` 文件夹。

2. **上传 HTML 文件**：
   - 将你的 HTML 文件上传到 `gh-pages` 分支或 `docs` 文件夹中。

3. **启用 GitHub Pages**：
   - 进入你的仓库设置页面。
   - 找到 "Pages" 部分。
   - 选择 `gh-pages` 分支或 `docs` 文件夹作为源。
   - 保存设置后，GitHub 会为你生成一个 URL，例如 `https://<username>.github.io/<repository-name>`。

4. **访问你的网站**：
   - 通过生成的 URL 访问你的网站，即可预览 HTML 文件。

### 方法二：使用 RawGit 或其他 CDN 服务
你可以使用 RawGit 或其他类似的 CDN 服务来预览 HTML 文件。这些服务会提供一个可以直接访问的 URL。

1. **获取 Raw URL**：
   - 在 GitHub 上找到你的 HTML 文件，点击 "Raw" 按钮获取原始文件的 URL。

2. **使用 RawGit**：
   - 将 Raw URL 转换为 RawGit URL。例如，如果你的 Raw URL 是 `https://raw.githubusercontent.com/username/repo/main/path/to/file.html`，那么 RawGit URL 将是 `https://rawgit.com/username/repo/main/path/to/file.html`。

3. **访问 RawGit URL**：
   - 通过 RawGit URL 访问你的 HTML 文件。

### 方法三：在 Markdown 中嵌入 HTML
虽然 GitHub 不会在 Markdown 文件中直接渲染 HTML 文件，但你可以在 Markdown 文件中嵌入一些简单的 HTML 代码。例如：

```markdown
# My Markdown File

Here is some embedded HTML:

<div style="background-color: lightblue; padding: 10px;">
  <h2>This is an embedded HTML block</h2>
  <p>It will be rendered as part of the Markdown file.</p>
</div>

You can also use iframes to embed external content, but note that GitHub may not render them for security reasons.

<iframe src="https://example.com" width="600" height="400"></iframe>
```

### 方法四：使用 GitHub Gist
如果你只需要预览一小段 HTML 代码，可以使用 GitHub Gist。

1. **创建 Gist**：
   - 前往 `https://gist.github.com/` 并登录你的 GitHub 账户。
   - 创建一个新的 Gist，并将你的 HTML 代码粘贴进去。

2. **查看 Gist**：
   - Gist 会自动渲染 HTML 代码，你可以直接在 Gist 页面上预览。

### 总结
- **GitHub Pages**：适合托管完整的静态网站。
- **RawGit 或其他 CDN 服务**：适合快速预览单个 HTML 文件。
- **Markdown 中嵌入 HTML**：适合简单的小段 HTML 代码。
- **GitHub Gist**：适合预览小段 HTML 代码。

希望这些方法能帮助你在 GitHub 上预览 HTML 文件！如果有其他问题或需要进一步的帮助，请告诉我。