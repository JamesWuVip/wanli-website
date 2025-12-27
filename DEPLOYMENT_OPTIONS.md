# 其他部署方案

## 方案二：使用 Vercel CLI（命令行部署）

如果你已经安装了 Node.js 和 npm：

```bash
# 安装 Vercel CLI
npm install -g vercel

# 在项目目录登录
cd /Users/a111/Desktop/code/devWeb
vercel login

# 部署
vercel

# 按提示操作：
# - Set up and deploy? Yes
# - Which scope? 选择你的账户
# - Link to existing project? No
# - What's your project's name? zhili-tech
# - In which directory is your code located? ./
# - Auto-detected Project Settings (Next.js)
# - Want to override? No

# 部署到生产环境
vercel --prod
```

## 方案三：Docker 部署

### 创建 Dockerfile

```dockerfile
FROM node:18-alpine AS base

# 安装依赖
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# 构建应用
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# 生产镜像
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### 创建 .dockerignore

```
node_modules
.next
.git
.gitignore
README.md
*.md
.env*.local
```

### 构建和运行

```bash
# 构建镜像
docker build -t zhili-tech .

# 运行容器
docker run -p 3000:3000 zhili-tech
```

### 部署到云服务

**阿里云/腾讯云容器服务：**
1. 推送镜像到镜像仓库
2. 在容器服务创建应用
3. 配置域名和负载均衡

## 方案四：传统服务器部署

### 4.1 准备服务器
- 系统：Ubuntu 20.04+ / CentOS 7+
- 配置：2核4G 起步
- 安装 Node.js 18+

### 4.2 部署步骤

```bash
# 在服务器上
# 1. 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. 克隆代码
git clone https://github.com/你的用户名/zhili-tech-website.git
cd zhili-tech-website

# 3. 安装依赖
npm install

# 4. 构建
npm run build

# 5. 使用 PM2 运行
npm install -g pm2
pm2 start npm --name "zhili-tech" -- start
pm2 save
pm2 startup

# 6. 配置 Nginx 反向代理
sudo apt install nginx
```

### 4.3 Nginx 配置

创建 `/etc/nginx/sites-available/zhilitech.com`:

```nginx
server {
    listen 80;
    server_name zhilitech.com www.zhilitech.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# 启用配置
sudo ln -s /etc/nginx/sites-available/zhilitech.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 安装 SSL 证书
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d zhilitech.com -d www.zhilitech.com
```

## 方案五：国内云服务商

### 阿里云 Webx

1. 访问 https://webx.console.aliyun.com
2. 创建应用
3. 连接 GitHub 仓库
4. 自动部署

### 腾讯云 Webify

1. 访问 https://console.cloud.tencent.com/webify
2. 导入代码
3. 一键部署

## 部署后检查清单

### ✅ 功能测试
- [ ] 首页正常显示
- [ ] 三种语言切换正常
- [ ] 导航链接跳转正常
- [ ] 表单可以提交
- [ ] 电话链接可以拨打
- [ ] 邮件链接可以打开
- [ ] 移动端显示正常

### ✅ SEO 配置
- [ ] 申请百度站长验证
- [ ] 申请 Google Search Console
- [ ] 提交 sitemap
- [ ] 配置百度统计
- [ ] 配置 Google Analytics

### ✅ 性能优化
- [ ] 开启 Gzip 压缩
- [ ] 开启 CDN
- [ ] 配置缓存策略
- [ ] 图片压缩优化

### ✅ 安全配置
- [ ] 启用 HTTPS
- [ ] 配置安全响应头
- [ ] 设置 CORS 策略

## 推荐方案对比

| 方案 | 难度 | 成本 | 速度 | 推荐度 |
|------|------|------|------|--------|
| Vercel | ⭐ | 免费 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Vercel CLI | ⭐⭐ | 免费 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Docker | ⭐⭐⭐ | 中等 | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 传统服务器 | ⭐⭐⭐⭐ | 高 | ⭐⭐⭐ | ⭐⭐ |
| 阿里云/腾讯云 | ⭐⭐ | 低 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

## 🎯 推荐行动

**新手推荐：使用 Vercel 网页部署**
- 最简单
- 完全免费
- 性能最优
- 自动 HTTPS
- 全球 CDN

**进阶用户：使用 Vercel CLI**
- 命令行控制
- 更多配置选项

**企业级：使用阿里云/腾讯云**
- 国内访问更快
- 合规要求
- 技术支持

---

**开始部署吧！预计 10-15 分钟完成** 🚀
