---
title: 关于 PowerWiki
description: PowerWiki 项目介绍和相关信息
author: PowerWiki Team
date: 2026-02-07
tags: [关于, PowerWiki]
---

# 关于 PowerWiki

## 项目简介

PowerWiki 是一个现代化的、基于 Git 的 Markdown 知识库系统。它将 Git 的版本控制能力与 Markdown 的简洁性结合，为开发者和知识工作者提供了一个强大而灵活的知识管理解决方案。

## 核心特性

- **Git 驱动** - 所有内容存储在 Git 仓库中，天然支持版本控制
- **Markdown 格式** - 使用简洁的 Markdown 语法编写文档
- **自动同步** - 自动从 Git 仓库同步最新内容
- **零数据库** - 无需数据库，纯文件系统存储
- **开箱即用** - 克隆即用，无需复杂配置
- **隐私优先** - 所有数据存储在您控制的环境中

## 设计理念

PowerWiki 基于以下核心理念设计：

1. **简洁即力量** - Markdown + Git 是最简单且经过验证的知识管理方案
2. **为开发者而生** - 语法高亮、本地图片支持、Git 工作流
3. **开箱即用** - 零学习成本，克隆即可使用
4. **数据永久性** - 纯文本存储，随时可迁移到任何平台
5. **隐私安全** - 无需注册，无云依赖，完全自主控制

## 技术栈

- **后端**: Express.js
- **前端**: Vanilla JavaScript
- **版本控制**: simple-git
- **Markdown 解析**: marked + highlight.js
- **PDF 处理**: pdfjs-dist
- **容器化**: Docker

## 项目链接

- **GitHub 仓库**: [steven-ld/PowerWiki](https://github.com/steven-ld/PowerWiki)
- **Docker Hub**: [sayunchuan/powerwiki](https://hub.docker.com/r/sayunchuan/powerwiki)
- **在线演示**: [https://ga666666.cn](https://ga666666.cn)

## 许可证

PowerWiki 采用 MIT License，完全开源。

## 贡献者

感谢所有为 PowerWiki 做出贡献的开发者：

- [@steven-ld](https://github.com/steven-ld) - 项目创始人
- [@sayunchuan](https://github.com/sayunchuan) - 多语言支持、Mermaid 支持等
- 以及所有提交 Issue 和 PR 的贡献者

## 致谢

PowerWiki 的开发离不开以下开源项目的支持：

- [Express.js](https://expressjs.com/) - Web 框架
- [marked](https://marked.js.org/) - Markdown 解析
- [highlight.js](https://highlightjs.org/) - 代码高亮
- [simple-git](https://github.com/steveukx/git-js) - Git 操作
- [PDF.js](https://mozilla.github.io/pdf.js/) - PDF 处理

## 联系方式

- **GitHub Issues**: 报告 Bug 或提出功能建议
- **GitHub Discussions**: 讨论和交流
- **Email**: 通过 GitHub 联系项目维护者

## 常见问题

### PowerWiki 适合什么场景？

PowerWiki 适合以下场景：

- 个人知识库
- 团队文档
- 项目文档
- 技术博客
- 学习笔记
- 企业知识库

### PowerWiki 与其他 Wiki 系统的区别？

| 特性 | PowerWiki | Notion | Confluence | MediaWiki |
|------|-----------|--------|-----------|-----------|
| 开源 | ✅ | ❌ | ❌ | ✅ |
| 自托管 | ✅ | ❌ | ✅ | ✅ |
| Git 集成 | ✅ | ❌ | ❌ | ❌ |
| Markdown | ✅ | ✅ | ❌ | ❌ |
| 无数据库 | ✅ | ❌ | ❌ | ❌ |
| 易部署 | ✅ | ❌ | ❌ | ❌ |

### 如何迁移现有内容到 PowerWiki？

1. 将现有文档转换为 Markdown 格式
2. 创建 Git 仓库并提交文档
3. 配置 PowerWiki 指向该仓库
4. 启动 PowerWiki 即可

### PowerWiki 支持哪些 Markdown 扩展？

PowerWiki 支持：

- 标准 Markdown 语法
- 代码块语法高亮
- 表格
- 脚注
- 任务列表
- Mermaid 图表
- HTML 嵌入
- 数学公式

### 如何自定义 PowerWiki 的外观？

PowerWiki 提供了以下自定义选项：

- 网站标题和描述
- 首页和关于页面
- 自定义 CSS（通过修改源代码）
- 自定义语言包

## 路线图

### 已完成

- ✅ 基础 Wiki 功能
- ✅ Git 自动同步
- ✅ 代码高亮
- ✅ 响应式设计
- ✅ SEO 优化
- ✅ 多语言支持
- ✅ Mermaid 图表支持

### 计划中

- 🔄 全文搜索
- 🔄 评论系统
- 🔄 用户认证
- 🔄 权限管理
- 🔄 插件系统
- 🔄 主题系统

## 支持 PowerWiki

如果 PowerWiki 对您有帮助，您可以：

1. **给项目一个 Star** ⭐ - 在 GitHub 上 Star 项目
2. **分享项目** - 将 PowerWiki 推荐给朋友
3. **提交 Issue** - 报告 Bug 或提出建议
4. **提交 PR** - 贡献代码
5. **赞助项目** - 通过 GitHub Sponsors 赞助

## 更新日志

### v1.4.5 (2026-02-06)

- 修复 Mermaid 图表渲染问题
- 优化自动同步性能
- 改进错误处理

### v1.4.0 (2026-01-15)

- 添加 Mermaid 图表支持
- 改进 SEO 优化
- 添加多语言支持

### v1.3.0 (2025-12-01)

- 添加 PDF 支持
- 改进响应式设计
- 优化代码高亮

---

**感谢您使用 PowerWiki！** 🎉

如有任何问题或建议，欢迎通过 GitHub 联系我们。
