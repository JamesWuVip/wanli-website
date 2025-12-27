# Vercel 部署指南

## 步骤 1: 初始化 Git 仓库

在项目目录执行：

```bash
cd /Users/a111/Desktop/code/devWeb
git init
git add .
git commit -m "Initial commit: Zhili Tech website"
```

## 步骤 2: 推送到 GitHub

### 2.1 在 GitHub 创建新仓库
1. 访问 https://github.com/new
2. 仓库名：`zhili-tech-website`
3. 设置为 Private（私有）
4. 不要勾选任何初始化选项
5. 点击 "Create repository"

### 2.2 推送代码
```bash
git remote add origin https://github.com/你的用户名/zhili-tech-website.git
git branch -M main
git push -u origin main
```

## 步骤 3: 部署到 Vercel

### 3.1 注册/登录 Vercel
1. 访问 https://vercel.com
2. 使用 GitHub 账号登录
3. 授权 Vercel 访问你的 GitHub

### 3.2 导入项目
1. 点击 "Add New..." → "Project"
2. 选择 `zhili-tech-website` 仓库
3. 点击 "Import"

### 3.3 配置项目
Vercel 会自动检测到 Next.js 项目，无需额外配置。

**环境变量设置：**
- 点击 "Environment Variables"
- 添加：
  - Name: `SITE_URL`
  - Value: `https://你的域名.vercel.app`（Vercel 会自动分配）
- 点击 "Add"

### 3.4 部署
1. 点击 "Deploy"
2. 等待 2-3 分钟
3. 部署成功！

## 步骤 4: 访问网站

部署完成后，Vercel 会提供：
- 临时域名：`https://zhili-tech-website.vercel.app`
- 可以绑定自定义域名

## 步骤 5: 绑定自定义域名（可选）

### 5.1 在 Vercel 添加域名
1. 进入项目 Settings → Domains
2. 输入你的域名：`zhilitech.com`
3. 点击 "Add"

### 5.2 配置 DNS
根据 Vercel 提供的说明，在域名注册商处添加：
- A 记录或 CNAME 记录
- 等待 DNS 生效（5分钟-24小时）

### 5.3 配置 SSL
Vercel 自动提供免费 SSL 证书（Let's Encrypt）

## 步骤 6: 自动部署

每次推送代码到 GitHub，Vercel 会自动重新部署：

```bash
# 修改代码后
git add .
git commit -m "Update content"
git push
```

## 优势

✅ **完全免费**
✅ **自动 HTTPS**
✅ **全球 CDN**
✅ **自动部署**
✅ **零配置**
✅ **性能优化**

## 性能优化

Vercel 自动提供：
- 图片优化
- 代码压缩
- CDN 加速
- 智能缓存

## 监控和分析

在 Vercel Dashboard 可以查看：
- 访问统计
- 性能指标
- 错误日志
- 部署历史

---

**预计部署时间：10-15 分钟** ⚡
