---
title: Git 集成
description: PowerWiki 的 Git 集成功能
author: PowerWiki Team
date: 2026-02-07
---

# Git 集成

PowerWiki 的核心特性之一是与 Git 的深度集成，所有内容都存储在 Git 仓库中。

## 核心特性

- **自动同步** - 定期从 Git 仓库拉取最新内容
- **版本控制** - 天然支持文档版本管理
- **多仓库** - 支持配置多个 Git 仓库
- **分支管理** - 可以指定不同的分支

## 文档列表

- [自动同步机制](./自动同步机制.md)

## 配置示例

```json
{
  "gitRepo": "https://github.com/your-username/your-wiki.git",
  "repoBranch": "main",
  "autoSyncInterval": 180000
}
```

## 工作流程

1. 在本地编辑 Markdown 文件
2. 提交到 Git 仓库
3. PowerWiki 自动同步
4. 内容立即可见

---

**提示**: Git 集成让您的知识库具有完整的版本历史和协作能力。
