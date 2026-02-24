---
title: PowerWiki 用户指南
description: PowerWiki - 现代化的基于Git的Markdown知识库系统
author: PowerWiki Team
date: 2026-02-07
keywords: PowerWiki, Wiki, Markdown, Git, 知识管理
tags: [PowerWiki, Wiki, 知识库, 教程]
---

# PowerWiki 用户指南

欢迎使用 PowerWiki！本指南将帮助您快速上手并充分利用 PowerWiki 的各项功能。

## 目录

- [快速开始](#快速开始)
- [配置说明](#配置说明)
- [功能演示](#功能演示)
- [文件组织](#文件组织)
- [部署指南](#部署指南)
- [使用案例](#使用案例)

## 快速开始

### 前置要求

- Node.js >= 14.0.0
- Git

### Docker 部署（推荐）

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

访问 `http://localhost:3150` 即可使用。

### Node.js 部署

```bash
# 克隆仓库
git clone https://github.com/steven-ld/PowerWiki.git
cd PowerWiki

# 安装依赖
npm install

# 创建配置文件
cp config.example.json config.json

# 启动服务
npm start
```

访问 `http://localhost:3150` 即可使用。

## 配置说明

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
| `language` | 界面语言 (zh-CN/en/ja/ko/es/fr/de/ru) | `zh-CN` |
| `autoSyncInterval` | 自动同步间隔（毫秒） | `180000` |

### 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `CONFIG_PATH` | `/app/config.json` | 配置文件路径 |
| `DATA_DIR` | `/app/data` | 统计数据和日志目录 |
| `GIT_CACHE_DIR` | `/app/cache` | Git 仓库缓存目录 |
| `LANG` | `zh-CN` | 控制台语言 |

## 功能演示

PowerWiki 支持丰富的 Markdown 扩展功能，点击以下链接查看演示：

- [Markdown 语法演示](./01-功能演示/Markdown语法演示.md) - 完整的 Markdown 语法支持
- [代码高亮演示](./01-功能演示/代码高亮演示.md) - 100+ 种编程语言语法高亮
- [图表演示](./01-功能演示/图表演示/) - Mermaid 流程图、时序图、甘特图等
- [SEO 优化演示](./01-功能演示/SEO优化演示.md) - 元数据和 SEO 最佳实践
- [响应式设计演示](./01-功能演示/响应式设计演示.md) - 多设备适配展示

### Mermaid 图表类型

| 类型 | 说明 | 演示文件 |
|------|------|----------|
| 流程图 | 业务流程、工作流 | [流程图演示](./01-功能演示/图表演示/流程图演示.md) |
| 时序图 | 交互时序 | [时序图演示](./01-功能演示/图表演示/时序图演示.md) |
| 甘特图 | 项目进度 | [甘特图演示](./01-功能演示/图表演示/甘特图演示.md) |
| 类图 | 面向对象设计 | [类图演示](./01-功能演示/图表演示/类图演示.md) |
| 状态图 | 状态机 | [状态图演示](./01-功能演示/图表演示/状态图演示.md) |
| ER 图 | 数据库设计 | [实体关系图演示](./01-功能演示/图表演示/实体关系图演示.md) |

### 支持的图片格式

PNG、JPG/JPEG、GIF、WEBP、SVG、ICO

## 文件组织

### 推荐结构

```
your-wiki-repo/
├── README.md              # 首页
├── ABOUT.md               # 关于页面
├── images/                # 全局图片目录
├── 架构设计/              # 分类文件夹
│   ├── images/            # 分类图片
│   ├── IoT设备标准化.md
│   └── README.md          # 分类索引
└── 项目实践/              # 另一个分类
    ├── images/
    └── 短链接服务.md
```

### 图片引用方式

```markdown
# 方式1：使用当前目录的 images 文件夹（推荐）
![图片描述](./images/pic.png)

# 方式2：使用父目录的 images 文件夹
![图片描述](../images/pic.png)

# 方式3：使用绝对路径（相对于仓库根目录）
![图片描述](/images/pic.png)
```

### Frontmatter 元数据

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

## 部署指南

### Docker 部署

```bash
# 快速启动
docker run -d -p 3150:3150 sayunchuan/powerwiki

# 挂载配置文件
docker run -d -p 3150:3150 \
  -v /path/to/config.json:/app/config.json \
  sayunchuan/powerwiki

# 持久化数据
docker run -d -p 3150:3150 \
  -v /path/to/config.json:/app/config.json \
  -v /path/to/data:/app/data \
  sayunchuan/powerwiki
```

详细指南请查看：[Docker 部署](./03-部署指南/Docker部署.md)

### Node.js 部署

详细指南请查看：[Node.js 部署](./03-部署指南/Node.js部署.md)

### 生产环境部署

详细指南请查看：[生产环境部署](./03-部署指南/生产环境部署.md)

### 常见问题

详细指南请查看：[常见问题](./03-部署指南/常见问题.md)

## 使用案例

- [个人博客](./05-使用案例/个人博客.md) - 记录学习笔记、技术心得
- [团队文档](./05-使用案例/团队文档.md) - 团队内部技术文档
- [项目文档](./05-使用案例/项目文档.md) - 软件项目文档管理
- [技术笔记](./05-使用案例/技术笔记.md) - 个人学习笔记
- [知识库](./05-使用案例/知识库.md) - 企业知识管理

## 相关链接

- [GitHub 仓库](https://github.com/steven-ld/PowerWiki)
- [Docker Hub](https://hub.docker.com/r/sayunchuan/powerwiki)
- [在线演示](https://ga666666.cn)

---

**如果 PowerWiki 对您有帮助，请给项目一个 Star！**
