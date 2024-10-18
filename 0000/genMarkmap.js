const { Transformer } = require('markmap-lib');
const { fillTemplate } = require('markmap-render');
const nodeHtmlToImage = require('node-html-to-image');
const { writeFile, readFile } = require('node:fs/promises');
const { launch: puppeteerLaunch } = require('puppeteer-core');
const { readdirSync, lstatSync, readFileSync, writeFileSync, mkdirSync } = require('fs');
const { join, resolve } = require('path');

const IGNORE_DIRS = ['.git', '.vscode', '0000', '9999. template'];
const BASE_DIR = resolve(__dirname, '..');
const DIR_MAP = {};

// 获取目录列表
function getDirList(base_path) {
  const dir_name_list = readdirSync(base_path);
  for (let dir_name of dir_name_list) {
    if (IGNORE_DIRS.includes(dir_name)) continue;
    const file_path = join(base_path, dir_name);
    const stats = lstatSync(file_path);

    if (stats.isDirectory()) {
      const dir_num = dir_name.slice(0, 4);
      const dir_path = resolve(base_path, dir_name);
      DIR_MAP[dir_num] = dir_path;
    }
  }
}

// 确保每个目录下都有一个 md-imgs 子目录
function ensureMdImgsDirExists(dirMap) {
  for (const dirPath of Object.values(dirMap)) {
    const mdImgsPath = join(dirPath, 'md-imgs');
    try {
      if (!lstatSync(mdImgsPath).isDirectory()) {
        // 如果 md-imgs 目录不存在，则创建它
        mkdirSync(mdImgsPath, { recursive: true });
        console.log(`Created directory: ${mdImgsPath}`);
      } else {
        console.log(`Directory already exists: ${mdImgsPath}`);
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        // 如果父目录不存在，递归创建
        mkdirSync(mdImgsPath, { recursive: true });
        console.log(`Created directory: ${mdImgsPath}`);
      } else {
        console.error(`Failed to create directory: ${mdImgsPath}`, err);
      }
    }
  }
}

// 获取目录列表
getDirList(BASE_DIR);

// 确保每个目录下都有一个 md-imgs 子目录
ensureMdImgsDirExists(DIR_MAP);

// 输出 DIR_MAP
console.log(DIR_MAP);

async function renderMarkmap(markdown, outFile) {
  const transformer = new Transformer();
  const { root, features } = transformer.transform(markdown);
  const assets = transformer.getUsedAssets(features);
  const html =
    fillTemplate(root, assets, {
      jsonOptions: {
        maxWidth: 400,
        colorFreezeLevel: 2,
        duration: 0,
        spacingVertical: 20,
      },
    }) +
    `
<style>
body,
#mindmap {
  width: 1920px;
  height: 1080px;
}
</style>
`;

  // 配置 puppeteer 启动选项
  const puppeteerLaunchOptions = {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // 替换为你的 Chrome 或 Chromium 的路径
    headless: true,  // 明确指定无头模式
  };

  const image = await nodeHtmlToImage({
    html,
    puppeteer: {
      launch: (opts) => puppeteerLaunch({ ...opts, ...puppeteerLaunchOptions })
    },
  });

  await writeFile(outFile, image);
  await writeFile('markmap.html', html);
}

async function processDirectories(dirMap) {
  for (const [dirNum, dirPath] of Object.entries(dirMap)) {
    const readmePath = join(dirPath, 'README.md');
    const mdImgsPath = join(dirPath, 'md-imgs');
    const outputPath = join(mdImgsPath, 'markmap.png');

    try {
      const markdown = await readFile(readmePath, 'utf-8');
      await renderMarkmap(markdown, outputPath);
      console.log(`Generated markmap for: ${dirPath}`);
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log(`README.md not found in: ${dirPath}`);
      } else {
        console.error(`Failed to process directory: ${dirPath}`, err);
      }
    }
  }
}

// 处理所有目录
processDirectories(DIR_MAP);