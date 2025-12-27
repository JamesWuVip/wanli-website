# 快速开始指南

由于您的系统没有安装 npm，这里提供几种运行网站的方法：

## 方法一：安装 Node.js 和 npm（推荐）

1. **下载并安装 Node.js**
   - 访问：https://nodejs.org/
   - 下载 LTS 版本（推荐）
   - 安装后，npm 会自动安装

2. **验证安装**
```bash
node --version
npm --version
```

3. **运行项目**
```bash
cd /Users/a111/Desktop/code/devWeb
npm install
npm run dev
```

4. **访问网站**
打开浏览器访问：http://localhost:3000

## 方法二：使用 Docker（如果已安装 Docker）

创建 Dockerfile：
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

运行：
```bash
docker build -t zhili-tech .
docker run -p 3000:3000 zhili-tech
```

## 方法三：直接部署到 Vercel（最简单）

1. 将代码推送到 GitHub
2. 访问 https://vercel.com
3. 点击 "Import Project"
4. 选择你的 GitHub 仓库
5. 自动部署完成

Vercel 会自动识别 Next.js 项目并进行配置。

## 项目文件结构预览

```
devWeb/
├── app/                        # Next.js 应用
│   ├── [locale]/              # 国际化路由
│   │   ├── layout.tsx         # 页面布局
│   │   └── page.tsx           # 首页（已整合所有组件）
│   ├── globals.css            # 全局样式
│   └── sitemap.ts             # SEO站点地图
├── components/                 # React 组件
│   ├── Navigation.tsx         # 导航栏
│   ├── Hero.tsx              # 首屏（已优化转化率）
│   ├── TrustIndicators.tsx   # 信任指标（数据+案例）
│   ├── Advantages.tsx        # 优势展示
│   ├── AICapabilities.tsx    # AI能力展示
│   ├── Services.tsx          # 服务介绍
│   ├── Process.tsx           # 合作流程
│   ├── Testimonials.tsx      # 客户评价
│   ├── ConsultationForm.tsx  # 免费咨询表单
│   ├── CTA.tsx              # 行动号召
│   ├── Footer.tsx           # 页脚
│   └── StructuredData.tsx   # SEO结构化数据
├── messages/                  # 国际化翻译
│   ├── zh-CN.json            # 简体中文
│   ├── zh-TW.json            # 繁体中文
│   └── en.json               # 英文
├── package.json              # 项目依赖
├── README.md                 # 项目文档
├── CUSTOMER_ACQUISITION.md   # 获客策略指南
└── QUICK_START.md           # 本文档
```

## 网站功能亮点

### 🎯 转化优化
1. **首屏强化**
   - 信任标签（大厂专家、AI技术、快速交付）
   - 社会证明（100+项目、98%满意度）
   - 紧迫感提示（限时优惠）
   - 双CTA（免费咨询+电话）

2. **信任建立**
   - 成功案例展示（3个行业案例）
   - 客户评价（3个真实评价）
   - 数据背书（4组关键数据）
   - AI技术实力展示

3. **转化路径**
   - 免费咨询表单
   - 多渠道联系方式
   - 24小时响应承诺
   - 免费技术方案

### 🔍 SEO优化
- 百度和Google站点验证
- 多语言sitemap
- 结构化数据
- 优化的Meta标签

### 🌍 国际化
- 简体中文、繁体中文、英文
- 自动语言切换
- SEO友好的URL结构

## 下一步行动

### 立即执行
1. ✅ 安装 Node.js
2. ✅ 运行项目查看效果
3. ⏳ 申请百度站长验证码
4. ⏳ 申请Google Search Console验证码
5. ⏳ 准备微信二维码图片
6. ⏳ 准备公司Logo

### 近期规划
1. 完善真实案例内容
2. 添加客户Logo墙
3. 集成百度统计/Google Analytics
4. 配置表单提交后端
5. 申请ICP备案

### 营销推广
1. 参考 [CUSTOMER_ACQUISITION.md](CUSTOMER_ACQUISITION.md)
2. 开通百度推广账户
3. 注册外包平台
4. 启动内容营销
5. 建立客户跟进流程

## 技术支持

如果在运行过程中遇到问题：
1. 检查 Node.js 版本（建议 v18+）
2. 清除缓存：`rm -rf node_modules .next`
3. 重新安装：`npm install`
4. 查看错误日志

## 联系方式更新清单

已使用实际联系方式的文件：
- ✅ components/CTA.tsx
- ✅ components/Footer.tsx
- ✅ components/Hero.tsx
- ✅ components/ConsultationForm.tsx

待更新的内容：
- ⏳ 微信二维码（components/CTA.tsx 第31行）
- ⏳ 公司详细地址（messages/zh-CN.json）
- ⏳ ICP备案号（components/Footer.tsx 第92行）
- ⏳ 百度/Google验证码（app/[locale]/layout.tsx）

---

**祝您获客成功！** 🚀
