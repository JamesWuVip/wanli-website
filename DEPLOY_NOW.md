# 🚀 立即部署指南（最简单方法）

## 方法一：Vercel CLI（需要先安装 Node.js）

### 步骤 1：安装 Node.js
1. 访问 https://nodejs.org/
2. 下载并安装 LTS 版本
3. 验证安装：
   ```bash
   node --version
   npm --version
   ```

### 步骤 2：安装 Vercel CLI
```bash
npm install -g vercel
```

### 步骤 3：登录并部署
```bash
cd /Users/a111/Desktop/code/devWeb
vercel login
vercel
```

按照提示操作即可！

---

## 方法二：Vercel 网页版（推荐 - 无需安装）

### 步骤 1：准备 GitHub 仓库

#### 选项 A：使用 GitHub Desktop（图形界面）
1. 下载 GitHub Desktop：https://desktop.github.com/
2. 打开软件，登录 GitHub
3. 点击 "Add" → "Add Existing Repository"
4. 选择文件夹：`/Users/a111/Desktop/code/devWeb`
5. 点击 "Publish repository"
6. 仓库名称：`zhili-tech-website`
7. 设置为 Private（私有）
8. 点击 "Publish"

#### 选项 B：使用命令行（需要先安装 Xcode 命令行工具）

**安装 Xcode 命令行工具：**
```bash
xcode-select --install
```
等待安装完成后：

```bash
cd /Users/a111/Desktop/code/devWeb
git init
git add .
git commit -m "Initial commit: Zhili Tech website"

# 在 GitHub 创建仓库后，运行：
git remote add origin https://github.com/你的用户名/zhili-tech-website.git
git branch -M main
git push -u origin main
```

### 步骤 2：部署到 Vercel

1. **访问** https://vercel.com
2. **登录** 使用 GitHub 账号
3. **点击** "Add New..." → "Project"
4. **选择** 你的 `zhili-tech-website` 仓库
5. **点击** "Import"
6. **Vercel 自动检测** Next.js 项目
7. **点击** "Deploy"
8. **等待** 2-3 分钟
9. **完成！** 获得网址：`https://zhili-tech-website.vercel.app`

---

## 方法三：Vercel 拖拽上传（最快速）

**Vercel 目前不支持直接拖拽文件夹，必须通过 Git 仓库。**

建议使用**方法二 - 选项 A（GitHub Desktop）**，这是最简单的！

---

## 我现在该做什么？

### 如果你想最快上线（5分钟）：
→ 使用 **方法二 - 选项 A（GitHub Desktop）**

### 如果你熟悉命令行：
→ 使用 **方法二 - 选项 B（命令行）**

### 如果你想学习专业流程：
→ 使用 **方法一（Vercel CLI）**

---

## 遇到问题？

### Q1: GitHub Desktop 下载慢？
A: 使用命令行方法（方法二 - 选项 B）

### Q2: git 命令找不到？
A: 先运行 `xcode-select --install` 安装 Xcode 命令行工具

### Q3: 部署后网站打不开？
A:
- 检查 Vercel 部署日志是否有错误
- 等待 DNS 生效（最多几分钟）
- 清除浏览器缓存重试

### Q4: 想绑定自己的域名？
A:
1. 在 Vercel 项目设置中点击 "Domains"
2. 添加你的域名
3. 按照提示设置 DNS 记录

---

## 下一步：集成表单邮件

部署成功后，查看 [FORM_INTEGRATION.md](FORM_INTEGRATION.md) 集成邮件通知功能。

---

**准备好了吗？选择一个方法，立即开始部署！** 🚀
