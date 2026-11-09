---
title: HTML 页面演示
description: 把 Git 仓库里的 HTML 文件当作文章渲染：目录、图片、静态资源与安全清洗
author: PowerWiki Team
date: 2026-11-09
updated: 2026-11-09
tags: [功能演示, HTML, 安全]
---

# HTML 页面演示

PowerWiki 不只读取 Markdown。仓库里的 `.html` / `.htm` 文件会和 `.md` 一起收录为文章，共用同一套阅读界面：左侧导航、右侧目录、复制、原始视图、分享短链、SEO 标签和阅读数。

> 下面每个示例都是仓库里真实的 HTML 文件。打开文章后点击工具栏的「原始」按钮，可以看到未经清洗的源文件。

## 演示列表

| 演示 | 打开 | 看点 |
| --- | --- | --- |
| 基础示例 | [基础示例.html](/post/01-功能演示/HTML页面演示/基础示例.html) | 多级标题与自动目录、表格、折叠块、图片 |
| 相对路径与静态资源 | [相对路径与静态资源.html](/post/01-功能演示/HTML页面演示/相对路径与静态资源.html) | 相对图片与链接改写、同级 `static/` |
| 安全清洗演示 | [安全清洗演示.html](/post/01-功能演示/HTML页面演示/安全清洗演示.html) | `script`、`onclick`、`style`、`javascript:` 被移除 |
| 自定义 404 页面 | [自定义404页面.html](/post/01-功能演示/HTML页面演示/自定义404页面.html) | 未命中页面时的兜底配置 |

## 完整交互页面（沙箱模式）

上面四个示例使用默认的**安全清洗**：只保留正文结构，脚本和样式会被移除。如果页面本身就是一个完整的应用——需要脚本、Canvas、WebGL、音频或表单——可以在 `<head>` 里声明沙箱模式：

```html
<meta name="powerwiki-render" content="sandbox">
```

声明后，文章正文会嵌入一个 `sandbox` iframe 来运行原始页面，样式与脚本都能生效；同时页面不带 `allow-same-origin`，拿不到 Wiki 的 Cookie、localStorage 与同源接口。原始文件也会在 `/full/<仓库路径>` 下独立提供。

| 演示 | 打开 | 看点 |
| --- | --- | --- |
| 交互式落地页 | [交互式落地页.html](/post/01-功能演示/HTML页面演示/交互式落地页.html) | 渐变光晕与鼠标视差、滚动渐入、数字滚动、表单校验 |
| 数据可视化看板 | [数据看板.html](/post/01-功能演示/HTML页面演示/数据看板.html) | Canvas 折线 / 柱状 / 环形图、悬停提示、每 3 秒实时刷新 |
| WebGL 与富媒体 | [WebGL与富媒体.html](/post/01-功能演示/HTML页面演示/WebGL与富媒体.html) | 原生 WebGL 着色器立方体、粒子星群、CSS 3D、WebAudio 频谱、SVG 描边 |
| 文档站风格 | [文档站.html](/post/01-功能演示/HTML页面演示/文档站.html) | 固定侧边栏、滚动目录、主题切换、搜索过滤、标签页、代码复制 |
| 多页面站点 | [多页面站点](/post/01-功能演示/HTML页面演示/多页面站点/index.html) | 目录索引 `guide/`、无扩展名 `modules`、页面间相对跳转、共享 CSS/JS、`static/data.js` 数据模块 |

> 沙箱内是不透明源，`localStorage` 等 Web Storage 会抛异常。上面这些页面只用内存状态，或对存储访问做了 `try / catch`。

沙箱页面可以感知站点主题：父页面会在 iframe 加载完成后、以及站点切换明暗主题时发送 `{ type: 'powerwiki:context', theme, lang }`；页面也可以先 `parent.postMessage({ type: 'powerwiki:request-context' }, '*')` 索取一次。多页面站点和文档站演示都通过这条消息跟随站点主题。

多页面站点演示把多个页面放在同一目录树里：`guide/` 由目录索引解析到 `guide/index.html`，`modules` 由无扩展名规则解析到 `modules.html`，页面之间只用相对路径互相跳转。独立入口是 [`/full/01-功能演示/HTML页面演示/多页面站点/`](/full/01-功能演示/HTML页面演示/多页面站点/)。`/full/` 只放行 HTML 与静态资源，JSON 等数据文件不会暴露，因此共享数据放在 `static/data.js`。

## 收录规则

- 扫描仓库时把 `.html` / `.htm` 视为文章，和 Markdown 并列。
- 旧地址会 301 跳到统一的文章地址：
  - `/01-功能演示/HTML页面演示/基础示例` → `/post/01-功能演示/HTML页面演示/基础示例.html`
  - `/01-功能演示/HTML页面演示/基础示例.html` → 同上
- 名为 `static` 的目录只用来放资源，不会被当作文章目录扫描。
- 渲染时只取 `<body>`；`<title>`、`<meta name="description">`、`<meta name="keywords">` 成为文章元信息。

## 安全策略

正文默认按白名单清洗（`html.sanitize: true`）。下面这些内容不会出现在渲染视图里：

- `<script>`、`<style>`、`<iframe>`、表单控件
- `onclick` 等内联事件处理器
- `style` 属性与 `javascript:` 链接
- 非位图的 `data:` 图片

只有完全可信的内容才建议关闭清洗：

```json
{
  "html": {
    "sanitize": false
  }
}
```

旧的 `"sandbox": false` 仍然兼容，等价于可信模式。

## 静态资源

正文里的相对地址在服务端改写：

| 页面里写的 | 文章里变成 |
| --- | --- |
| `../../images/home.jpg` | `/api/image/images/home.jpg` |
| `基础示例.html` | `/post/01-功能演示/HTML页面演示/基础示例.html` |
| `../代码高亮演示.md` | `/post/01-功能演示/代码高亮演示.md` |
| `static/demo.txt` | `/01-功能演示/HTML页面演示/static/demo.txt` |

根绝对地址（`/static/...`、`/api/image/...`）保持原样；命中同级 `static/` 时借助文章页面的 `Referer`。

## 自定义 404

1. 把示例文件复制到仓库根目录并命名为 `404.html`。
2. 在 `config.json` 中设置：

```json
{
  "pages": {
    "notFound": "404.html"
  }
}
```

未配置或文件不存在时，PowerWiki 使用内置 404 页面。
