---
title: PowerWiki 用户演示文档
description: PowerWiki - 现代化的基于Git的Markdown知识库系统
author: PowerWiki Team
date: 2026-02-07
keywords: PowerWiki, Wiki, Markdown, Git, 知识管理
tags: [PowerWiki, Wiki, 知识库]
---

# PowerWiki 用户演示文档

欢迎来到 PowerWiki 的完整演示指南！本文档将为您介绍 PowerWiki 的核心功能和使用方法。

## 📖 目录

- [PowerWiki 介绍](#powerwiki-介绍)
- [核心功能](#核心功能)
- [快速开始](#快速开始)
- [功能演示](#功能演示)
- [部署指南](#部署指南)
- [最佳实践](#最佳实践)
- [使用案例](#使用案例)

## PowerWiki 介绍

### 什么是 PowerWiki？

PowerWiki 是一个现代化的、基于 Git 的 Markdown 知识库系统，具有以下特点：

- **Git 驱动** - 所有内容存储在 Git 仓库中，版本控制天然支持
- **Markdown 格式** - 使用简洁的 Markdown 语法编写文档
- **自动同步** - 自动从 Git 仓库同步最新内容
- **零数据库** - 无需数据库，纯文件系统存储
- **开箱即用** - 克隆即用，无需复杂配置
- **隐私优先** - 所有数据存储在您控制的环境中

### 设计理念

PowerWiki 基于以下核心理念设计：

1. **简洁即力量** - Markdown + Git 是最简单且经过验证的知识管理方案
2. **为开发者而生** - 语法高亮、本地图片支持、Git 工作流
3. **开箱即用** - 零学习成本，克隆即可使用
4. **数据永久性** - 纯文本存储，随时可迁移到任何平台
5. **隐私安全** - 无需注册，无云依赖，完全自主控制

## 核心功能

### 1. 自动同步 (Auto Sync)

PowerWiki 会定期自动从 Git 仓库同步最新内容，无需手动刷新。

**配置示例：**
```json
{
  "autoSyncInterval": 180000
}
```

### 2. 语法高亮 (Syntax Highlighting)

支持 100+ 种编程语言的代码高亮，由 highlight.js 提供支持。

**示例代码块：**
```javascript
function helloWorld() {
  console.log('Hello, PowerWiki!');
}
```

### 3. 响应式设计 (Responsive Design)

完美适配所有设备 - 桌面、平板、手机。

### 4. 自动目录生成 (Auto TOC)

自动生成文章目录，方便快速导航。

### 5. 现代化 UI

采用飞书风格的简洁现代界面，提供优秀的用户体验。

### 6. PDF 支持

支持 PDF 文件渲染为图片显示。

### 7. 浏览统计 (View Statistics)

自动追踪文章浏览次数。

### 8. SEO 优化

完整的 SEO 优化支持，包括元标签、结构化数据等。

### 9. Frontmatter 支持

支持 YAML Frontmatter 元数据：

```yaml
---
title: 文章标题
description: 文章描述
author: 作者名称
date: 2026-02-07
updated: 2026-02-07
keywords: 关键词1, 关键词2
tags: [标签1, 标签2]
---
```

### 10. 本地图片支持

支持相对路径引用本地图片，自动转换为可访问的 API URL。

### 11. 多语言支持

支持中文、英文等多种语言，可自定义语言包。

### 12. Docker 支持

完整的 Docker 支持，一键部署。

## 快速开始

### 前置要求

- Node.js >= 14.0.0
- Git

### 方式一：Docker（推荐）

```bash
# 克隆仓库
git clone https://github.com/steven-ld/PowerWiki.git
cd PowerWiki

# 创建配置文件
cp config.example.json config.json
# 编辑 config.json，填入您的 Git 仓库地址

# 使用 Docker Compose 启动
docker-compose up -d
```

### 方式二：Node.js

```bash
# 克隆仓库
git clone https://github.com/steven-ld/PowerWiki.git
cd PowerWiki

# 安装依赖
npm install

# 创建配置文件
cp config.example.json config.json
# 编辑 config.json

# 启动服务
npm start
```

访问 `http://localhost:3150` 即可使用。

## 功能演示

### 文件组织结构

PowerWiki 支持分层文件夹结构组织文章：

```
your-wiki-repo/
├── README.md              # 首页
├── ABOUT.md               # 关于页面
├── images/                # 全局图片目录
├── 架构设计/              # 分类文件夹
│   ├── images/            # 分类图片
│   ├── IoT设备标准化.md
│   ├── TLS加密算法.md
│   └── README.md          # 分类索引
├── 项目实践/              # 另一个分类
│   ├── images/
│   ├── 短链接服务.md
│   └── README.md
└── 音视频/
    ├── images/
    ├── WebRTC信令.md
    └── README.md
```

### 图片引用方式

PowerWiki 支持多种图片引用方式：

```markdown
# 方式1：使用当前目录的 images 文件夹（推荐）
![图片描述](./images/pic.png)

# 方式2：使用父目录的 images 文件夹
![图片描述](../images/pic.png)

# 方式3：使用绝对路径（相对于仓库根目录）
![图片描述](/images/pic.png)

# 方式4：直接引用（无需 ./ 或 ../ 前缀）
![图片描述](images/pic.png)
```

支持的图片格式：PNG、JPG/JPEG、GIF、WEBP、SVG、ICO

### 配置选项

编辑 `config.json` 自定义您的 Wiki：

```json
{
  "gitRepo": "https://github.com/your-username/your-wiki-repo.git",
  "repoBranch": "main",
  "mdPath": "",
  "port": 3150,
  "siteTitle": "My Wiki",
  "siteDescription": "Knowledge Base",
  "autoSyncInterval": 180000,
  "pages": {
    "home": "README.md",
    "about": "ABOUT.md"
  }
}
```

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `gitRepo` | Git 仓库 URL | - |
| `repoBranch` | 分支名称 | `main` |
| `mdPath` | Markdown 文件子目录 | `""` |
| `port` | 服务端口 | `3150` |
| `siteTitle` | 网站标题 | `PowerWiki` |
| `siteDescription` | 网站描述 | `Wiki` |
| `autoSyncInterval` | 自动同步间隔（毫秒） | `180000` |
| `pages.home` | 首页文件 | `""` |
| `pages.about` | 关于页面文件 | `""` |

## 部署指南

### Docker 部署

#### 快速启动

```bash
docker run -d -p 3150:3150 sayunchuan/powerwiki
```

访问 `http://localhost:3150`

#### 挂载配置文件

```bash
docker run -d -p 3150:3150 \
  -v /path/to/config.json:/app/config.json \
  sayunchuan/powerwiki
```

#### 持久化数据

```bash
docker run -d -p 3150:3150 \
  -v /path/to/config.json:/app/config.json \
  -v /path/to/data:/app/data \
  sayunchuan/powerwiki
```

### Docker Compose 部署

创建 `docker-compose.yml`：

```yaml
version: '3.8'
services:
  powerwiki:
    image: sayunchuan/powerwiki:latest
    ports:
      - "3150:3150"
    environment:
      - NODE_ENV=production
      - DATA_DIR=/app/data
      - GIT_CACHE_DIR=/app/cache
      - LANG=zh-CN
    volumes:
      - ./config.json:/app/config.json:ro
      - powerwiki_data:/app/data
      - powerwiki_cache:/app/cache
    restart: unless-stopped

volumes:
  powerwiki_data:
  powerwiki_cache:
```

启动服务：

```bash
docker-compose up -d
```

### 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `CONFIG_PATH` | `/app/config.json` | 配置文件路径 |
| `DATA_DIR` | `/app/data` | 统计数据和日志目录 |
| `GIT_CACHE_DIR` | `/app/cache` | Git 仓库缓存目录 |
| `LANG` | `zh-CN` | 控制台语言（zh-CN 或 en） |

### 容器信息

- **端口**: 3150
- **运行用户**: root
- **数据目录**: /app/data
- **Git 缓存目录**: /app/cache

### 重要说明

- `config.json` 必须在启动容器前存在
- 使用环境变量自定义数据存储路径
- 建议使用 Docker Compose 进行生产部署

## 技术栈

- **后端**: Express.js
- **前端**: Vanilla JavaScript
- **版本控制**: simple-git
- **Markdown 解析**: marked + highlight.js
- **PDF 处理**: pdfjs-dist
- **容器化**: Docker

## 许可证

MIT License - 详见 [LICENSE](LICENSE)

## 相关链接

- [GitHub 仓库](https://github.com/steven-ld/PowerWiki)
- [Docker Hub](https://hub.docker.com/r/sayunchuan/powerwiki)
- [在线演示](https://ga666666.cn)

---

**如果 PowerWiki 对您有帮助，请给项目一个 ⭐ Star！**
