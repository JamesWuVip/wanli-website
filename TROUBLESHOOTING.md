# 🔧 本地运行故障排查指南

## 问题诊断步骤

### 步骤 1: 检查 Node.js 是否已安装

打开终端，运行：

```bash
node --version
npm --version
```

**期望结果：**
```
v18.x.x（或 v20.x.x）
9.x.x（或 10.x.x）
```

**如果显示 "command not found"：**
→ 需要先安装 Node.js：https://nodejs.org/

---

### 步骤 2: 进入项目目录

```bash
cd /Users/a111/Desktop/code/devWeb
pwd  # 确认当前目录
```

**期望结果：**
```
/Users/a111/Desktop/code/devWeb
```

---

### 步骤 3: 安装依赖（首次必须）

```bash
npm install
```

**期望结果：**
- 看到进度条下载依赖
- 大约需要 1-2 分钟
- 最后显示 "added xxx packages"

**如果出现错误：**

**错误1: "npm ERR! code ENOENT"**
→ 确认在正确的目录：`pwd`

**错误2: "permission denied"**
→ 运行：`sudo npm install`（需要输入密码）

**错误3: "network timeout"**
→ 网络问题，重试或使用国内镜像：
```bash
npm config set registry https://registry.npmmirror.com
npm install
```

---

### 步骤 4: 启动开发服务器

```bash
npm run dev
```

**期望结果：**
```
  ▲ Next.js 14.1.0
  - Local:        http://localhost:3000
  - Environments: .env

 ✓ Ready in 2.3s
```

**如果出现错误：**

**错误1: "Error: Cannot find module 'next'"**
→ 依赖没装好，重新运行：`npm install`

**错误2: "Port 3000 is already in use"**
→ 端口被占用，两个解决方案：

方案A - 关闭占用端口的程序：
```bash
# 查找占用 3000 端口的进程
lsof -i :3000
# 杀掉该进程（PID 是上面命令显示的数字）
kill -9 <PID>
# 重新运行
npm run dev
```

方案B - 使用其他端口：
```bash
PORT=3001 npm run dev
# 然后访问 http://localhost:3001
```

**错误3: "Module not found: Can't resolve..."**
→ 缺少依赖，运行：
```bash
npm install next-intl react-icons
npm run dev
```

**错误4: TypeScript 错误**
→ 暂时忽略，直接访问网站

---

### 步骤 5: 访问网站

运行成功后，打开浏览器访问：

**主地址：** http://localhost:3000

**会自动跳转到：** http://localhost:3000/zh-CN

**如果浏览器显示：**

**错误1: "无法访问此网站" / "This site can't be reached"**

检查：
```bash
# 1. 确认服务器还在运行（终端应该显示 Ready）
# 2. 检查是否有错误信息
# 3. 尝试：
curl http://localhost:3000
```

如果 curl 有响应但浏览器打不开：
- 清除浏览器缓存
- 尝试隐私模式
- 换个浏览器试试

**错误2: "404 This page could not be found"**

→ 直接访问：http://localhost:3000/zh-CN

**错误3: 页面空白或报错**

→ 打开浏览器控制台（F12）查看错误
→ 把错误信息发给我

---

## 🆘 常见问题快速解决

### Q1: npm install 很慢怎么办？

**使用国内镜像：**
```bash
npm config set registry https://registry.npmmirror.com
npm install
```

### Q2: 修改代码后页面没变化？

**Next.js 支持热更新，但有时需要：**
- 刷新浏览器（Cmd+R）
- 或重启开发服务器（Ctrl+C 停止，然后 npm run dev）

### Q3: 出现奇怪的错误？

**清除缓存重新开始：**
```bash
# 停止服务器（Ctrl+C）
rm -rf node_modules .next
npm install
npm run dev
```

### Q4: 想停止服务器？

**在终端按：Ctrl + C**

### Q5: 电脑重启后怎么再次运行？

```bash
cd /Users/a111/Desktop/code/devWeb
npm run dev
```

---

## 📝 完整操作流程

**首次运行（完整版）：**

```bash
# 1. 进入目录
cd /Users/a111/Desktop/code/devWeb

# 2. 安装依赖（只需一次）
npm install

# 3. 启动服务器
npm run dev

# 4. 打开浏览器访问
# http://localhost:3000
```

**后续运行（每次开机后）：**

```bash
# 1. 进入目录
cd /Users/a111/Desktop/code/devWeb

# 2. 启动服务器
npm run dev

# 3. 打开浏览器访问
# http://localhost:3000
```

---

## 🎯 如果还是解决不了

**请告诉我：**

1. **执行的命令：**
   ```
   您运行了什么命令？
   ```

2. **终端输出：**
   ```
   终端显示了什么？（复制粘贴完整信息）
   ```

3. **浏览器显示：**
   ```
   浏览器显示什么错误？
   打开控制台（F12）有什么错误？
   ```

4. **系统信息：**
   ```
   node --version
   npm --version
   pwd
   ```

把这些信息发给我，我帮您具体分析！

---

## 🚀 替代方案：直接部署

如果本地运行遇到困难，可以直接部署到 Vercel：

**超快部署（5分钟）：**

1. 访问：https://vercel.com
2. 用 GitHub 登录
3. 导入项目
4. 点击 Deploy
5. 完成！

**详细步骤：** 查看 [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)

---

**需要帮助？告诉我具体的错误信息！** 📞
