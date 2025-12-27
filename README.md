# 智理科技官网

北京智理科技有限公司官方网站 - 专业的AI应用开发和企业级技术解决方案提供商

## 🌟 特性

- ✅ **国际化支持**: 简体中文、繁体中文、英文三语言切换
- ✅ **SEO优化**: 完整的SEO配置，支持百度和Google搜索引擎优化
- ✅ **响应式设计**: 完美适配桌面、平板、移动设备
- ✅ **高性能**: 基于Next.js 14构建，服务端渲染，快速加载
- ✅ **现代化UI**: 使用Tailwind CSS，美观大方的界面设计
- ✅ **结构化数据**: 集成Schema.org结构化数据，提升搜索可见性

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **国际化**: next-intl
- **SEO**: next-sitemap + 结构化数据
- **部署**: Vercel / 其他Node.js托管平台

## 📦 安装

```bash
# 克隆项目
git clone <repository-url>
cd devWeb

# 安装依赖
npm install
```

## 🚀 开发

```bash
# 启动开发服务器
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

默认会重定向到中文简体版本 `/zh-CN`

## 🏗️ 构建

```bash
# 生产构建
npm run build

# 启动生产服务器
npm start
```

## 📁 项目结构

```
devWeb/
├── app/                    # Next.js App Router
│   ├── [locale]/          # 国际化路由
│   │   ├── layout.tsx     # 布局组件
│   │   └── page.tsx       # 首页
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   ├── robots.ts          # robots.txt配置
│   └── sitemap.ts         # 站点地图配置
├── components/            # React组件
│   ├── Navigation.tsx     # 导航栏
│   ├── Hero.tsx          # 首屏大图
│   ├── Advantages.tsx    # 优势展示
│   ├── Services.tsx      # 服务介绍
│   ├── Process.tsx       # 合作流程
│   ├── CTA.tsx           # 行动号召
│   ├── Footer.tsx        # 页脚
│   └── StructuredData.tsx # 结构化数据
├── messages/             # 国际化翻译文件
│   ├── zh-CN.json       # 简体中文
│   ├── zh-TW.json       # 繁体中文
│   └── en.json          # 英文
├── i18n.ts              # 国际化配置
├── next.config.js       # Next.js配置
├── next-sitemap.config.js # Sitemap配置
├── tailwind.config.ts   # Tailwind配置
└── package.json         # 项目依赖
```

## 🌍 国际化

网站支持三种语言：

- 简体中文: `/zh-CN`
- 繁体中文: `/zh-TW`
- 英文: `/en`

要修改翻译，编辑 `messages/` 目录下的对应JSON文件。

## 🔍 SEO配置

### 百度和Google验证

在 `app/[locale]/layout.tsx` 中配置站点验证：

```tsx
<meta name="baidu-site-verification" content="你的验证码" />
<meta name="google-site-verification" content="你的验证码" />
```

### 修改网站URL

在以下文件中修改网站域名：

1. `next-sitemap.config.js`
2. `app/sitemap.ts`
3. `components/StructuredData.tsx`

### 关键词优化

在 `app/[locale]/layout.tsx` 的 `generateMetadata` 中修改关键词。

## 📱 联系方式配置

修改 `components/CTA.tsx` 和 `components/Footer.tsx` 中的联系信息：

- 邮箱
- 电话
- 地址
- 微信二维码

## 🎨 样式定制

### 品牌色

在 `tailwind.config.ts` 中修改主题色：

```ts
colors: {
  primary: {
    // 自定义颜色值
  },
}
```

### 全局样式

编辑 `app/globals.css` 来修改全局样式。

## 🚀 部署

### Vercel (推荐)

1. 将代码推送到GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 设置环境变量 `SITE_URL` 为你的域名
4. 自动部署完成

### 其他平台

确保Node.js环境，运行：

```bash
npm run build
npm start
```

## 📊 SEO检查清单

- [x] 多语言支持和hreflang标签
- [x] Meta标签（title, description, keywords）
- [x] Open Graph标签
- [x] 结构化数据 (Schema.org)
- [x] robots.txt
- [x] sitemap.xml
- [x] 响应式设计
- [x] 快速加载速度
- [ ] Google Analytics（可选）
- [ ] 百度统计（可选）

## 🔧 后续优化建议

1. **添加分析工具**: 集成Google Analytics和百度统计
2. **添加真实案例**: 在网站中展示实际项目案例
3. **博客功能**: 添加技术博客提升SEO
4. **在线咨询**: 集成在线客服系统
5. **表单提交**: 添加联系表单和项目咨询表单
6. **图片优化**: 使用Next.js Image组件优化图片
7. **性能监控**: 使用Lighthouse等工具持续优化性能

## 📄 许可证

Copyright © 2024 北京智理科技有限公司

## 🤝 贡献

欢迎提交Issue和Pull Request！
