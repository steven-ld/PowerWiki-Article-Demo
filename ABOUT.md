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
- **暗夜模式** - 智能主题切换，支持自动深色/浅色模式
- **多语言** - 支持中文、英文、日文、韩文等 8 种语言

## 设计理念

PowerWiki 基于以下核心理念设计：

1. **简洁即力量** - Markdown + Git 是最简单且经过验证的知识管理方案
2. **为开发者而生** - 语法高亮、本地图片支持、Git 工作流
3. **开箱即用** - 零学习成本，克隆即可使用
4. **数据永久性** - 纯文本存储，随时可迁移到任何平台
5. **隐私安全** - 无需注册，无云依赖，完全自主控制

## 技术栈

- **后端**: Express.js
- **前端**: Vanilla JavaScript (模块化)
- **版本控制**: simple-git
- **Markdown 解析**: marked + highlight.js
- **PDF 处理**: pdfjs-dist
- **容器化**: Docker

## 项目链接

- **GitHub 仓库**: [steven-ld/PowerWiki](https://github.com/steven-ld/PowerWiki)
- **Docker Hub**: [sayunchuan/powerwiki](https://hub.docker.com/r/sayunchuan/powerwiki)
- **在线演示**: [https://powerwiki.ga666666.cn/](https://powerwiki.ga666666.cn/)

## 许可证

PowerWiki 采用 MIT License，完全开源。

## 贡献者

感谢所有为 PowerWiki 做出贡献的开发者：

- [@steven-ld](https://github.com/steven-ld) - 项目创始人
- [@sayunchuan](https://github.com/sayunchuan) - Docker 镜像、多语言支持、Mermaid 支持
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

## 更新日志

### v1.4.7 (2025-02-24)

- 前端模块化重构：拆分为 9 个 JS 模块和 7 个 CSS 模块
- 修复主题切换按钮初始化时机问题
- 修复移动端菜单 CSS 加载顺序问题
- 更新所有 README 目录结构说明（支持 8 种语言）

### v1.4.6 (2025-02-09)

- Mermaid 图表支持：流程图、时序图、甘特图等
- 暗黑模式下使用纯白背景提升可读性
- 零配置启动：无配置文件自动降级使用示例配置
- 修复国际化非首页加载丢失问题

### v1.4.5 (2025-02-06)

- 暗夜模式(Dark Mode)：智能主题切换，根据时间自动切换深色/浅色
- 手动主题设置仅当天有效
- 暗黑模式纯黑背景优化
- 国际化(i18n)支持：日志打印国际化
- 侧边栏布局优化
- 修复 Windows 反斜杠路径解析问题

### v1.4.0 (2025-02-05)

- Markdown 图片相对路径支持（`./images/`、`../images/`、`/images/`）
- 支持 PNG、JPG、GIF、WEBP、SVG、ICO 格式
- 项目结构模块化重构：服务器代码迁移到 `src/` 目录
- 多语言日志全面覆盖优化
- 文章不存在时自动跳转首页

### v1.2.0 (2025-02-04)

- 完整国际化支持：8 种语言
- 高级数据分析仪表板：回访用户追踪、用户留存率、访问深度
- 本地图片支持：`images` 文件夹渲染
- 可视化图表：设备类型分布、访问来源分析

### v1.0.0 (2024-12-24)

- 自动同步：从 Git 仓库自动拉取更新文档
- 代码高亮：支持多种编程语言
- 响应式设计：完美适配各种设备
- 自动目录：自动生成文章目录
- 飞书风格：简约现代界面设计
- PDF 支持：高清渲染 PDF 文件
- 访问统计：自动统计文章查看量

---

**感谢您使用 PowerWiki！**

如有任何问题或建议，欢迎通过 GitHub 联系我们。
