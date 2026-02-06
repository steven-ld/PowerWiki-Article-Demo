---
title: Node.js 部署指南
description: PowerWiki 的 Node.js 本地部署和开发指南
author: PowerWiki Team
date: 2026-02-07
tags: [Node.js, 部署, 开发]
---

# Node.js 部署指南

Node.js 部署适合开发者和小规模部署场景，提供更灵活的定制和调试能力。

## 前置要求

- Node.js >= 14.0.0
- npm >= 6.0.0
- Git

## 安装步骤

### 1. 克隆仓库

```bash
git clone https://github.com/steven-ld/PowerWiki.git
cd PowerWiki
```

### 2. 安装依赖

```bash
npm install
```

### 3. 创建配置文件

```bash
cp config.example.json config.json
```

### 4. 编辑配置文件

编辑 `config.json`，填入您的 Git 仓库地址：

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

### 5. 启动服务

```bash
npm start
```

访问 `http://localhost:3150`

## 开发模式

### 使用 Nodemon 自动重启

```bash
npm run dev
```

这会在文件变化时自动重启服务器，便于开发调试。

## 环境变量配置

### 创建 .env 文件

```bash
cp .env.example .env
```

### 编辑 .env

```env
CONFIG_PATH=./config.json
DATA_DIR=./data
GIT_CACHE_DIR=./cache
LANG=zh-CN
NODE_ENV=development
```

### 环境变量说明

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `CONFIG_PATH` | `./config.json` | 配置文件路径 |
| `DATA_DIR` | `./data` | 统计数据和日志目录 |
| `GIT_CACHE_DIR` | `./cache` | Git 仓库缓存目录 |
| `LANG` | `zh-CN` | 控制台语言（zh-CN 或 en） |
| `NODE_ENV` | `development` | 运行环境（development 或 production） |

## 项目结构

```
PowerWiki/
├── src/                     # 源代码
│   ├── index.js             # Express 服务器入口
│   ├── routes/              # 路由模块
│   │   ├── api.js           # API 路由
│   │   ├── feeds.js         # RSS/Sitemap 路由
│   │   └── static.js        # 静态文件路由
│   ├── config/              # 配置模块
│   │   ├── env.js           # 环境变量
│   │   └── i18n.js          # 国际化
│   └── utils/               # 工具模块
│       ├── cacheManager.js  # 缓存管理
│       ├── gitManager.js    # Git 操作
│       └── markdownParser.js# Markdown 解析
├── public/                  # 前端静态文件
│   ├── index.html           # 主页面
│   ├── css/                 # 样式文件
│   └── js/                  # 前端 JavaScript
├── locales/                 # 翻译文件
│   ├── zh-CN.json           # 中文翻译
│   └── en.json              # 英文翻译
├── config.example.json      # 配置模板
├── package.json             # 依赖配置
└── README.md                # 项目说明
```

## 常用 npm 命令

### 开发命令

```bash
# 启动开发服务器（自动重启）
npm run dev

# 启动生产服务器
npm start

# 测试环境变量
npm run test:env
```

### Docker 命令

```bash
# 构建 Docker 镜像
npm run docker:build

# 运行 Docker 容器
npm run docker:run

# 停止 Docker 容器
npm run docker:stop

# 查看 Docker 日志
npm run docker:logs
```

### 语言命令

```bash
# 使用英文启动
npm run start:en

# 使用中文启动
npm run start:zh
```

## 依赖管理

### 主要依赖

```json
{
  "express": "^4.18.0",
  "marked": "^4.0.0",
  "highlight.js": "^11.0.0",
  "simple-git": "^3.0.0",
  "pdfjs-dist": "^3.0.0"
}
```

### 更新依赖

```bash
# 检查过期依赖
npm outdated

# 更新所有依赖
npm update

# 更新特定依赖
npm install express@latest
```

## 性能优化

### 启用缓存

编辑 `config.json`：

```json
{
  "cacheEnabled": true,
  "cacheTTL": 3600000,
  "autoSyncInterval": 180000
}
```

### 调整自动同步间隔

```json
{
  "autoSyncInterval": 300000
}
```

单位为毫秒，上例表示 5 分钟同步一次。

## 日志管理

### 查看日志

```bash
# 查看最近的日志
tail -f data/logs/powerwiki.log

# 查看特定日期的日志
cat data/logs/powerwiki-2026-02-07.log
```

## 故障排查

### 端口被占用

```bash
# 查看占用端口的进程
lsof -i :3150

# 使用不同的端口
PORT=8080 npm start
```

### Git 仓库无法访问

```bash
# 检查 Git 配置
git config --list

# 测试 Git 连接
git clone <your-repo-url> test-repo
```

### 内存不足

```bash
# 增加 Node.js 内存限制
node --max-old-space-size=4096 src/index.js

# 或在 npm 脚本中配置
NODE_OPTIONS=--max-old-space-size=4096 npm start
```

## 生产环境配置

### 使用 PM2 进程管理

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start src/index.js --name powerwiki

# 查看进程
pm2 list

# 查看日志
pm2 logs powerwiki

# 停止应用
pm2 stop powerwiki

# 重启应用
pm2 restart powerwiki
```

### PM2 配置文件

创建 `ecosystem.config.js`：

```javascript
module.exports = {
  apps: [{
    name: 'powerwiki',
    script: './src/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3150
    }
  }]
};
```

启动：

```bash
pm2 start ecosystem.config.js
```

### 使用 Nginx 反向代理

```nginx
upstream powerwiki {
    server localhost:3150;
}

server {
    listen 80;
    server_name wiki.example.com;

    location / {
        proxy_pass http://powerwiki;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 更新和升级

### 更新源代码

```bash
# 拉取最新代码
git pull origin main

# 安装新依赖
npm install

# 重启服务
npm start
```

---

**提示**: Node.js 部署适合开发和小规模部署。生产环境建议使用 Docker 或 PM2 进程管理。
