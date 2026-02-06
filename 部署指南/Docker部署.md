---
title: Docker 部署指南
description: PowerWiki 的 Docker 部署完整指南
author: PowerWiki Team
date: 2026-02-07
tags: [Docker, 部署]
---

# Docker 部署指南

Docker 是部署 PowerWiki 的推荐方式，提供隔离、可靠和易于扩展的部署环境。

## 🐳 Docker 镜像信息

### 镜像来源

PowerWiki 的 Docker 镜像由 PowerWiki 的贡献者 **[@sayunchuan](https://github.com/sayunchuan)** 发布。

**镜像详情：**

| 项目 | 详情 |
|------|------|
| **镜像名称** | `sayunchuan/powerwiki` |
| **Docker Hub** | [sayunchuan/powerwiki](https://hub.docker.com/r/sayunchuan/powerwiki) |
| **GitHub 仓库** | [sayunchuan/PowerWiki](https://github.com/sayunchuan/PowerWiki) |
| **维护者** | [@sayunchuan](https://github.com/sayunchuan) |
| **许可证** | MIT License |
| **源项目** | [steven-ld/PowerWiki](https://github.com/steven-ld/PowerWiki) |

### 镜像版本说明

| 版本标签 | 说明 |
|---------|------|
| `latest` | 最新版本（推荐使用） |
| `1.4.5` | 特定版本号 |
| `1.4.5-f1` | Fork 版本（包含本地修改和增强） |
| `20260207` | 日期标签（YYYYMMDD 格式） |

### 致谢

感谢 [@sayunchuan](https://github.com/sayunchuan) 为 PowerWiki 提供 Docker 镜像，使得用户可以更便捷地部署 PowerWiki。

---

## 前置要求

- Docker >= 20.10
- Docker Compose >= 1.29（可选）

## 快速启动

### 最简单的方式

```bash
docker run -d -p 3150:3150 sayunchuan/powerwiki
```

访问 `http://localhost:3150`

## 配置文件

### 创建 config.json

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

## Docker 命令部署

### 基础部署

```bash
docker run -d \
  --name powerwiki \
  -p 3150:3150 \
  sayunchuan/powerwiki
```

### 挂载配置文件

```bash
docker run -d \
  --name powerwiki \
  -p 3150:3150 \
  -v /path/to/config.json:/app/config.json \
  sayunchuan/powerwiki
```

### 持久化数据

```bash
docker run -d \
  --name powerwiki \
  -p 3150:3150 \
  -v /path/to/config.json:/app/config.json \
  -v powerwiki_data:/app/data \
  -v powerwiki_cache:/app/cache \
  sayunchuan/powerwiki
```

### 自定义环境变量

```bash
docker run -d \
  --name powerwiki \
  -p 3150:3150 \
  -e NODE_ENV=production \
  -e DATA_DIR=/app/data \
  -e GIT_CACHE_DIR=/app/cache \
  -e LANG=zh-CN \
  -v /path/to/config.json:/app/config.json \
  -v powerwiki_data:/app/data \
  -v powerwiki_cache:/app/cache \
  sayunchuan/powerwiki
```

## Docker Compose 部署

### 创建 docker-compose.yml

```yaml
version: '3.8'

services:
  powerwiki:
    image: sayunchuan/powerwiki:latest
    container_name: powerwiki
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
    networks:
      - powerwiki-net

volumes:
  powerwiki_data:
  powerwiki_cache:

networks:
  powerwiki-net:
    driver: bridge
```

### 启动服务

```bash
# 启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止
docker-compose down

# 重启
docker-compose restart
```

## 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `CONFIG_PATH` | `/app/config.json` | 配置文件路径 |
| `DATA_DIR` | `/app/data` | 统计数据和日志目录 |
| `GIT_CACHE_DIR` | `/app/cache` | Git 仓库缓存目录 |
| `LANG` | `zh-CN` | 控制台语言（zh-CN 或 en） |
| `NODE_ENV` | `production` | 运行环境 |

## 容器管理

### 查看容器

```bash
# 列出所有容器
docker ps -a

# 查看容器日志
docker logs powerwiki

# 实时查看日志
docker logs -f powerwiki

# 查看最后 100 行日志
docker logs --tail 100 powerwiki
```

### 进入容器

```bash
# 进入容器 shell
docker exec -it powerwiki /bin/sh

# 查看容器内文件
docker exec powerwiki ls -la /app
```

### 停止和删除

```bash
# 停止容器
docker stop powerwiki

# 启动容器
docker start powerwiki

# 删除容器
docker rm powerwiki

# 删除镜像
docker rmi sayunchuan/powerwiki
```

## 数据持久化

### 创建数据卷

```bash
# 创建数据卷
docker volume create powerwiki_data
docker volume create powerwiki_cache

# 查看数据卷
docker volume ls

# 查看数据卷详情
docker volume inspect powerwiki_data
```

### 备份数据

```bash
# 备份数据卷
docker run --rm \
  -v powerwiki_data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/powerwiki_data.tar.gz -C /data .

# 恢复数据卷
docker run --rm \
  -v powerwiki_data:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/powerwiki_data.tar.gz -C /data
```

## 网络配置

### 端口映射

```bash
# 映射到不同的主机端口
docker run -d -p 8080:3150 sayunchuan/powerwiki

# 映射到特定 IP
docker run -d -p 127.0.0.1:3150:3150 sayunchuan/powerwiki
```

### 自定义网络

```yaml
version: '3.8'

services:
  powerwiki:
    image: sayunchuan/powerwiki:latest
    networks:
      - custom-network

networks:
  custom-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

## 反向代理配置

### Nginx 反向代理

```nginx
server {
    listen 80;
    server_name wiki.example.com;

    location / {
        proxy_pass http://localhost:3150;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Apache 反向代理

```apache
<VirtualHost *:80>
    ServerName wiki.example.com
    
    ProxyPreserveHost On
    ProxyPass / http://localhost:3150/
    ProxyPassReverse / http://localhost:3150/
</VirtualHost>
```

## 监控和日志

### 查看容器资源使用

```bash
# 实时监控
docker stats powerwiki

# 查看容器详情
docker inspect powerwiki
```

### 日志管理

```bash
# 查看日志驱动
docker inspect -f '{{.HostConfig.LogConfig}}' powerwiki

# 配置日志驱动
docker run -d \
  --log-driver json-file \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  sayunchuan/powerwiki
```

## 更新和升级

### 更新镜像

```bash
# 拉取最新镜像
docker pull sayunchuan/powerwiki:latest

# 停止旧容器
docker stop powerwiki
docker rm powerwiki

# 启动新容器
docker run -d \
  --name powerwiki \
  -p 3150:3150 \
  -v /path/to/config.json:/app/config.json \
  -v powerwiki_data:/app/data \
  sayunchuan/powerwiki:latest
```

### 使用 Docker Compose 更新

```bash
# 拉取最新镜像
docker-compose pull

# 重启服务
docker-compose up -d
```

## 故障排查

### 容器无法启动

```bash
# 查看错误日志
docker logs powerwiki

# 检查配置文件
docker exec powerwiki cat /app/config.json

# 检查权限
docker exec powerwiki ls -la /app
```

### 端口被占用

```bash
# 查看端口占用
lsof -i :3150

# 使用不同的端口
docker run -d -p 8080:3150 sayunchuan/powerwiki
```

### 数据丢失

```bash
# 检查数据卷
docker volume ls

# 检查数据卷内容
docker run --rm -v powerwiki_data:/data alpine ls -la /data
```

## 安全建议

1. **使用只读配置** - 配置文件使用 `:ro` 标志
2. **限制资源** - 使用 `--memory` 和 `--cpus` 限制资源
3. **使用非 root 用户** - 配置容器运行用户
4. **定期更新** - 定期更新镜像和依赖
5. **备份数据** - 定期备份重要数据

## 性能优化

### 资源限制

```bash
docker run -d \
  --name powerwiki \
  --memory=512m \
  --cpus=1 \
  -p 3150:3150 \
  sayunchuan/powerwiki
```

### 缓存优化

```yaml
environment:
  - GIT_CACHE_DIR=/app/cache
  - NODE_ENV=production
volumes:
  - powerwiki_cache:/app/cache
```

---

**提示**: Docker 部署是最推荐的方式，提供最好的隔离性和可维护性。
