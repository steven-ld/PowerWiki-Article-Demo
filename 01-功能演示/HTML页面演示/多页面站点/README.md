# 多页面站点演示

一个由多个 HTML 页面、共享 CSS/JS 和 `static/` 数据模块组成的小站点，用来验证 `/full/` 补齐后的多文件能力：目录索引、页面间相对跳转、无扩展名路径、共享资源与数据模块。

## 打开方式

| 入口 | 地址 | 说明 |
| --- | --- | --- |
| 文章视图 | [/post/01-功能演示/HTML页面演示/多页面站点/index.html](/post/01-功能演示/HTML页面演示/多页面站点/index.html) | PowerWiki 文章外壳 + 沙箱 iframe |
| 独立页面 | [/full/01-功能演示/HTML页面演示/多页面站点/](/full/01-功能演示/HTML页面演示/多页面站点/) | 目录索引直接返回 `index.html` |
| 指南（目录索引） | [/full/01-功能演示/HTML页面演示/多页面站点/guide/](/full/01-功能演示/HTML页面演示/多页面站点/guide/) | 访问 `guide/` → `guide/index.html` |
| 模块（无扩展名） | [/full/01-功能演示/HTML页面演示/多页面站点/modules](/full/01-功能演示/HTML页面演示/多页面站点/modules) | 访问 `modules` → `modules.html` |

在文章视图里，正文位置是一个 `sandbox` iframe，页面内的相对链接（`guide/`、`modules`、`about.html`）会继续在 `/full/` 路径下解析，因此站点内的跳转全部可用。

## 文件结构

```text
多页面站点/
├── index.html          首页：能力总览、目录结构、页面清单
├── guide/index.html    指南：目录索引与四步搭建说明
├── modules.html        模块页：无扩展名路径 + 客户端搜索
├── about.html          关于：沙箱边界与技术组成
├── assets/
│   ├── site.css        共享样式与深浅色变量
│   └── site.js         主题切换、导航高亮、数据渲染、搜索
└── static/
    └── data.js         共享数据模块（页面清单与模块清单）
```

## 演示到的能力

- **目录索引**：`guide/` 自动解析到 `guide/index.html`。
- **相对跳转**：所有页面只用相对路径互相链接，子目录页面用 `../` 回到站点根目录。
- **无扩展名路径**：`modules` 按顺序尝试 `modules.html`、`modules/index.html`。
- **共享资源**：每个页面引用同一份 `assets/site.css` 与 `assets/site.js`。
- **数据模块**：页面读取 `static/data.js` 渲染卡片，并在前端过滤。

## 为什么不是 `static/data.json`

`/full/` 只放行 HTML 与精选静态资源（图片、CSS/JS、字体、音视频、WASM）。JSON、YAML、TXT 等数据文件不在允许列表里，避免把仓库里的配置或私密内容变成可直接下载的文件；数据类文件只在显式的 `static/` 目录里通过文章资源路由提供，不会从 `/full/` 暴露。需要给页面共享数据时，使用像 `static/data.js` 这样的 JS 数据模块。

## 沙箱说明

每个页面头部都声明了：

```html
<meta name="powerwiki-render" content="sandbox">
```

因此页面以完整 HTML 运行（脚本、样式、交互都保留），但 iframe 不含 `allow-same-origin`：页面处于不透明源，读不到 Wiki 的 Cookie、localStorage 或 IndexedDB，也不能调用同源 API。演示里的主题切换对 Web Storage 做了 `try / catch`，写入被拒绝时页面照常工作，只是跳转后主题回到系统默认值。

## 主题同步

沙箱页面读不到 Wiki 的 `data-theme`，父页面会通过 `postMessage` 把界面偏好传进来：

```js
// 父页面 → 沙箱 iframe
{ type: 'powerwiki:context', version: 1, theme: 'dark', lang: 'zh-CN' }

// 沙箱也可以先索取一次，减少首屏闪烁
parent.postMessage({ type: 'powerwiki:request-context' }, '*');
```

`assets/site.js` 监听 `powerwiki:context` 并调用 `applyTheme()`，因此在文章视图里切换站点主题时，沙箱页面会立即跟着切换；直接打开 `guide/` 等 `/full/` 页面时没有父页面，则使用系统主题。消息只包含主题和语言，不含 Cookie、统计数据或仓库内容。
