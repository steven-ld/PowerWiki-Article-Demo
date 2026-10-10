---
title: PowerWiki 用户指南
description: PowerWiki v1.5.2 功能体验、部署与使用指南
author: PowerWiki Team
date: 2026-02-07
updated: 2026-10-10
tags: [PowerWiki, 教程]
---

# PowerWiki 用户指南

将 Git 仓库里的 Markdown 变成可浏览、可分享的知识库：左侧查找文档，右侧定位章节，中间阅读正文。

> 本站本身就是 PowerWiki 的演示。当前文档对应 **v1.5.2**，查看 [版本历史](/post/版本历史.md) 或 [GitHub Release](https://github.com/steven-ld/PowerWiki/releases/tag/v1.5.2)。

![PowerWiki 首页与双侧导航](./images/home.jpg)

## 三分钟体验

| 想体验什么 | 打开哪一页 | 试一试 |
| --- | --- | --- |
| 阅读与复用 | [阅读与分享](/post/01-功能演示/阅读与分享.md) | 复制原文、切换原始视图、生成分享短链 |
| 技术文档 | [代码高亮](/post/01-功能演示/代码高亮演示.md) | 复制代码，通过右侧目录跳到不同语言 |
| 图表 | [时序图](/post/01-功能演示/图表演示/时序图演示.md) | 查看用户、浏览器与服务的交互 |
| 图片 | [本地图片](/post/01-功能演示/本地图片演示.md) | 点击图片查看大图，再切换暗夜模式 |
| 缓存机制 | [性能与缓存](/post/02-核心功能/性能与缓存.md) | 了解更新何时生效、重复阅读如何复用缓存 |

## v1.5.2 更新了什么

- 启动同步完成后预热菜单，重复访问复用菜单和文章缓存。
- 文档或配置变化后刷新内容；没有变化时避免重复下载。
- PDF 只渲染可见及附近页面，离开文章时释放渲染资源。
- 保留原文复制、原始视图和短链分享，支持浅色与暗夜阅读。

## 快速开始

### 前置要求

- 建议使用 Node.js 22 LTS；当前 PDF.js 依赖要求 Node.js >= 20.16 或 >= 22.3
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
| `CONFIG_PATH` | 项目根目录 `config.json` | 配置文件路径（Docker 中为 `/app/config.json`） |
| `DATA_DIR` | 项目根目录 | 统计和日志目录（Docker 中为 `/app/data`） |
| `GIT_CACHE_DIR` | 项目根目录 `.git-cache` | Git 缓存目录（Docker 中为 `/app/cache`） |
| `LANG` | `zh-CN` | 控制台语言 |

## 功能演示

PowerWiki 支持丰富的 Markdown 扩展功能，点击以下链接查看演示：

- [Markdown 语法演示](/post/01-功能演示/Markdown语法演示.md) - 完整的 Markdown 语法支持
- [代码高亮演示](/post/01-功能演示/代码高亮演示.md) - 100+ 种编程语言语法高亮
- [图表演示](/post/01-功能演示/图表演示/README.md) - Mermaid 流程图、时序图、甘特图等
- [SEO 优化演示](/post/01-功能演示/SEO优化演示.md) - 元数据和 SEO 最佳实践
- [响应式设计演示](/post/01-功能演示/响应式设计演示.md) - 多设备适配展示

### Mermaid 图表类型

| 类型 | 说明 | 演示文件 |
|------|------|----------|
| 流程图 | 业务流程、工作流 | [流程图演示](/post/01-功能演示/图表演示/流程图演示.md) |
| 时序图 | 交互时序 | [时序图演示](/post/01-功能演示/图表演示/时序图演示.md) |
| 甘特图 | 项目进度 | [甘特图演示](/post/01-功能演示/图表演示/甘特图演示.md) |
| 类图 | 面向对象设计 | [类图演示](/post/01-功能演示/图表演示/类图演示.md) |
| 状态图 | 状态机 | [状态图演示](/post/01-功能演示/图表演示/状态图演示.md) |
| ER 图 | 数据库设计 | [实体关系图演示](/post/01-功能演示/图表演示/实体关系图演示.md) |

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
updated: 2026-10-10
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

详细指南请查看：[Docker 部署](/post/03-部署指南/Docker部署.md)

### Node.js 部署

详细指南请查看：[Node.js 部署](/post/03-部署指南/Node.js部署.md)

### 生产环境部署

详细指南请查看：[生产环境部署](/post/03-部署指南/生产环境部署.md)

### 常见问题

详细指南请查看：[常见问题](/post/03-部署指南/常见问题.md)

## 使用案例

- [个人博客](/post/05-使用案例/个人博客.md) - 记录学习笔记、技术心得
- [团队文档](/post/05-使用案例/团队文档.md) - 团队内部技术文档
- [项目文档](/post/05-使用案例/项目文档.md) - 软件项目文档管理
- [技术笔记](/post/05-使用案例/技术笔记.md) - 个人学习笔记
- [知识库](/post/05-使用案例/知识库.md) - 企业知识管理

## 相关链接

- [GitHub 仓库](https://github.com/steven-ld/PowerWiki)
- [Docker Hub](https://hub.docker.com/r/sayunchuan/powerwiki)
- [在线演示](https://powerwiki.ga666666.cn/)
- [版本历史](/post/版本历史.md) - 各版本更新记录

---

**如果 PowerWiki 对您有帮助，请给项目一个 Star！**
