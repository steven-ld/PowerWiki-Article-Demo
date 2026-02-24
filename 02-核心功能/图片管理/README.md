---
title: 图片管理
description: PowerWiki 的图片管理和引用方式
author: PowerWiki Team
date: 2026-02-07
tags: [图片, 资源管理]
---

# 图片管理

PowerWiki 支持灵活的图片引用方式，让您轻松管理文档中的图片资源。

## 📁 推荐的目录结构

```
your-wiki-repo/
├── README.md
├── images/                    # 全局图片目录
│   ├── logo.png
│   └── banner.jpg
├── 架构设计/
│   ├── images/                # 分类图片目录
│   │   ├── architecture.png
│   │   └── diagram.svg
│   ├── 系统架构.md
│   └── README.md
└── 项目实践/
    ├── images/
    │   └── screenshot.png
    └── 项目介绍.md
```

## 🖼️ 图片引用方式

### 1. 相对路径引用（推荐）

**当前目录的 images 文件夹**:
```markdown
![架构图](./images/architecture.png)
```

**父目录的 images 文件夹**:
```markdown
![Logo](../images/logo.png)
```

**根目录的 images 文件夹**:
```markdown
![Banner](/images/banner.jpg)
```

### 2. 直接引用

```markdown
![图片](images/pic.png)
```

PowerWiki 会自动转换为正确的 API 路径。

### 3. 网络图片

```markdown
![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)
```

## 📋 支持的图片格式

| 格式 | 扩展名 | 说明 |
|------|--------|------|
| PNG | `.png` | 无损压缩，支持透明 |
| JPEG | `.jpg`, `.jpeg` | 有损压缩，适合照片 |
| GIF | `.gif` | 支持动画 |
| WebP | `.webp` | 现代格式，体积小 |
| SVG | `.svg` | 矢量图，可缩放 |
| ICO | `.ico` | 图标格式 |

## 🎨 图片优化建议

### 1. 选择合适的格式

- **PNG**: 图标、Logo、需要透明背景的图片
- **JPEG**: 照片、复杂图像
- **WebP**: 现代浏览器，体积更小
- **SVG**: 图标、简单图形，可无限缩放

### 2. 压缩图片

**在线工具**:
- [TinyPNG](https://tinypng.com/) - PNG/JPEG 压缩
- [Squoosh](https://squoosh.app/) - 多格式压缩
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG 优化

**命令行工具**:
```bash
# ImageMagick 压缩
convert input.png -quality 85 output.png

# 批量压缩
for img in *.png; do
  convert "$img" -quality 85 "compressed_$img"
done
```

### 3. 控制图片尺寸

```markdown
<!-- HTML 方式控制尺寸 -->
<img src="./images/large.png" width="600" alt="大图">

<!-- 响应式图片 -->
<img src="./images/pic.png" style="max-width: 100%; height: auto;" alt="响应式">
```

### 4. 使用 CDN

对于大量图片，建议使用 CDN：

```markdown
![CDN 图片](https://cdn.example.com/images/pic.png)
```

## 🔧 图片管理最佳实践

### 1. 统一命名规范

```
# 好的命名
architecture-diagram.png
user-flow-chart.svg
login-screenshot-2026.jpg

# 不好的命名
图片1.png
IMG_001.jpg
屏幕快照.png
```

### 2. 按分类组织

```
images/
├── architecture/      # 架构图
├── screenshots/       # 截图
├── diagrams/          # 图表
└── icons/             # 图标
```

### 3. 添加 Alt 文本

```markdown
<!-- 好的做法 -->
![PowerWiki 架构图](./images/architecture.png)

<!-- 不好的做法 -->
![](./images/architecture.png)
```

### 4. 版本控制

- 使用有意义的文件名
- 避免频繁修改图片文件名
- 删除不再使用的图片

## 📊 图片引用示例

### 基础引用

```markdown
# 文章标题

这是一段文字说明。

![架构图](./images/architecture.png)

上图展示了系统的整体架构。
```

### 带链接的图片

```markdown
[![PowerWiki](./images/logo.png)](https://github.com/steven-ld/PowerWiki)
```

### 并排显示

```markdown
<div style="display: flex; gap: 10px;">
  <img src="./images/before.png" width="45%" alt="优化前">
  <img src="./images/after.png" width="45%" alt="优化后">
</div>
```

### 图片说明

```markdown
![系统架构](./images/architecture.png)
*图 1: PowerWiki 系统架构图*
```

## 🚀 高级技巧

### 1. 懒加载

```html
<img src="./images/large.png" loading="lazy" alt="大图">
```

### 2. 响应式图片

```html
<picture>
  <source media="(min-width: 800px)" srcset="./images/large.png">
  <source media="(min-width: 400px)" srcset="./images/medium.png">
  <img src="./images/small.png" alt="响应式图片">
</picture>
```

### 3. 图片占位符

```markdown
![加载中...](./images/placeholder.png)
```

## ⚠️ 注意事项

1. **路径大小写敏感** - Linux 系统区分大小写
2. **避免中文路径** - 使用英文和数字
3. **检查文件存在** - 确保图片文件已提交到 Git
4. **控制文件大小** - 单个图片建议不超过 1MB
5. **使用相对路径** - 便于仓库迁移

## 🔗 相关文档

- [Markdown 语法演示](../../01-功能演示/Markdown语法演示.md)

---

**提示**: 良好的图片管理可以提升文档的可读性和维护性。
