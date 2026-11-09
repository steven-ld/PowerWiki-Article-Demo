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
