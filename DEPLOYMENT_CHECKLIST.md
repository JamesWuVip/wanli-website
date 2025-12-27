# 🚀 部署前检查清单

## 第一步：本地测试（可选）

如果您想先在本地查看效果：

### 安装 Node.js
1. 访问 https://nodejs.org/
2. 下载并安装 LTS 版本
3. 验证安装：打开终端，运行 `node --version`

### 运行项目
```bash
cd /Users/a111/Desktop/code/devWeb
npm install
npm run dev
```
访问 http://localhost:3000

---

## 第二步：部署到 Vercel（推荐）

### ✅ 准备工作

- [ ] 注册 GitHub 账号（如果没有）
- [ ] 注册 Vercel 账号（使用 GitHub 登录）
- [ ] 确保有稳定的网络连接

### 📋 部署步骤

#### 1. 初始化 Git 仓库

在项目目录打开终端：

```bash
cd /Users/a111/Desktop/code/devWeb
git init
git add .
git commit -m "Initial commit: Zhili Tech website"
```

#### 2. 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 仓库名称：`zhili-tech-website`
3. 设置为 **Private**（私有）
4. 不要勾选任何初始化选项
5. 点击 "Create repository"

#### 3. 推送代码到 GitHub

复制 GitHub 提供的命令，或运行：

```bash
git remote add origin https://github.com/你的用户名/zhili-tech-website.git
git branch -M main
git push -u origin main
```

#### 4. 在 Vercel 部署

1. 访问 https://vercel.com
2. 点击 "Continue with GitHub" 登录
3. 授权 Vercel 访问你的 GitHub
4. 点击 "Add New..." → "Project"
5. 找到并选择 `zhili-tech-website`
6. 点击 "Import"
7. **无需任何配置**，直接点击 "Deploy"
8. 等待 2-3 分钟

#### 5. 部署完成！

Vercel 会提供：
- 🌐 临时域名：`https://zhili-tech-website.vercel.app`
- 🔒 自动 HTTPS 证书
- 🚀 全球 CDN 加速

---

## 第三步：验证部署

### ✅ 功能测试清单

访问你的网站，检查以下功能：

- [ ] 首页正常显示
- [ ] 导航栏功能正常
- [ ] 点击"免费咨询方案"跳转到表单
- [ ] 点击"立即致电"可以拨打电话
- [ ] 语言切换正常（简体/繁体/英文）
- [ ] 滚动到各个板块正常显示
- [ ] 表单可以填写（虽然暂时不会提交）
- [ ] 点击邮箱可以打开邮件客户端
- [ ] 移动端显示正常

### 📱 移动端测试

在手机浏览器打开网站：
- [ ] 页面适配正常
- [ ] 导航菜单可以展开/收起
- [ ] 按钮可以正常点击
- [ ] 电话号码可以直接拨打

---

## 第四步：SEO 配置

### 百度站长平台

1. 访问 https://ziyuan.baidu.com
2. 注册/登录账号
3. 添加网站
4. 获取验证码
5. 更新 `app/[locale]/layout.tsx` 第52行
6. 提交验证
7. 提交 sitemap：`https://你的域名.vercel.app/sitemap.xml`

### Google Search Console

1. 访问 https://search.google.com/search-console
2. 添加资源
3. 获取验证码
4. 更新 `app/[locale]/layout.tsx` 第53行
5. 提交验证
6. 提交 sitemap

### 网站统计

**百度统计：**
1. 访问 https://tongji.baidu.com
2. 获取统计代码
3. 添加到网站

**Google Analytics：**
1. 访问 https://analytics.google.com
2. 创建媒体资源
3. 获取跟踪代码
4. 添加到网站

---

## 第五步：内容完善

### 待更新内容

- [ ] 上传真实的公司 Logo
- [ ] 上传微信二维码图片
- [ ] 完善真实的成功案例
- [ ] 添加客户公司 Logo
- [ ] 申请 ICP 备案号并更新

### 文件位置

**微信二维码：**
- 文件：`components/CTA.tsx` 第31-33行

**ICP 备案号：**
- 文件：`components/Footer.tsx` 第92行

**百度/Google验证码：**
- 文件：`app/[locale]/layout.tsx` 第52-53行

---

## 第六步：绑定自定义域名（可选）

### 在 Vercel 绑定域名

1. 进入 Vercel 项目设置
2. 点击 "Domains"
3. 输入你的域名（如：`zhilitech.com`）
4. 点击 "Add"

### 配置 DNS

根据 Vercel 提供的说明，在域名注册商处添加：

**A 记录：**
```
类型: A
主机: @
值: 76.76.21.21
```

**CNAME 记录（www）：**
```
类型: CNAME
主机: www
值: cname.vercel-dns.com
```

等待 DNS 生效（通常 5分钟-24小时）

### SSL 证书

Vercel 会自动配置免费 SSL 证书（Let's Encrypt）

---

## 第七步：开始营销推广

### 立即执行

1. **测试所有联系方式**
   - 拨打电话确认可以接通
   - 发送测试邮件
   - 确认微信可以添加

2. **分享网站**
   - 朋友圈推广
   - 微信群推广
   - LinkedIn 发布

3. **准备推广素材**
   - 公司介绍 PPT
   - 案例展示文档
   - 报价方案模板

### 第一周

- [ ] 申请百度推广账户
- [ ] 注册猪八戒、一品威客等外包平台
- [ ] 准备 5 篇技术博客内容
- [ ] 开通微信公众号
- [ ] 设计宣传海报

### 第一个月

- [ ] 启动百度推广
- [ ] 发布技术博客（知乎、CSDN）
- [ ] 参加 1-2 场行业活动
- [ ] 建立客户跟进流程
- [ ] 完善案例库

---

## 🎯 关键指标监控

### 网站数据（每周查看）

- 访问量（UV/PV）
- 跳出率
- 平均停留时间
- 转化率

### 业务数据（每天记录）

- 咨询量
- 咨询渠道
- 有效线索
- 签约情况

### 目标设定

**第一个月：**
- 日访问量：50-100
- 周咨询量：5-10
- 月签约：1-2 个项目

**第三个月：**
- 日访问量：200-300
- 周咨询量：10-20
- 月签约：3-5 个项目

---

## 📞 技术支持

### 遇到问题？

**部署问题：**
- 查看 [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md)
- 查看 [DEPLOYMENT_OPTIONS.md](DEPLOYMENT_OPTIONS.md)

**获客问题：**
- 查看 [CUSTOMER_ACQUISITION.md](CUSTOMER_ACQUISITION.md)

**技术问题：**
- 查看 [README.md](README.md)
- 查看 Vercel 部署日志
- GitHub Issues

---

## ✅ 最终检查

部署完成前，确认：

- [x] 网站可以正常访问
- [x] 所有功能正常工作
- [x] 移动端显示正常
- [ ] 联系方式准确无误
- [ ] SEO 配置已完成
- [ ] 统计代码已添加
- [ ] 真实内容已更新

---

**🎉 恭喜！你的网站已经准备好吸引客户了！**

立即开始推广，获取第一批咨询吧！💪
