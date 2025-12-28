# SEO配置指南 - 智理科技官网

## 📊 分析工具配置

### 1. 百度统计配置

**步骤：**
1. 访问 [百度统计](https://tongji.baidu.com/)
2. 注册/登录百度账号
3. 添加网站 `zhili.wanli.ai`
4. 获取统计代码中的ID（形如：`1234567890abcdef`）
5. 在 `public-site/index.html` 中替换 `YOUR_BAIDU_ANALYTICS_ID` 为实际ID

**代码位置：** `index.html` 第117行

```javascript
hm.src = "https://hm.baidu.com/hm.js?YOUR_BAIDU_ANALYTICS_ID";
```

### 2. Google Analytics 4 (GA4) 配置

**步骤：**
1. 访问 [Google Analytics](https://analytics.google.com/)
2. 创建GA4媒体资源
3. 添加数据流，选择"网站"
4. 输入网站URL: `zhili.wanli.ai`
5. 获取衡量ID（形如：`G-XXXXXXXXXX`）
6. 在 `public-site/index.html` 中替换 `G-YOUR_GA4_ID` 为实际ID（两处）

**代码位置：** `index.html` 第104行和第109行

```javascript
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_GA4_ID"></script>
gtag('config', 'G-YOUR_GA4_ID');
```

---

## 🔍 搜索引擎提交

### 3. 百度搜索资源平台

**步骤：**

#### 3.1 验证网站所有权
1. 访问 [百度搜索资源平台](https://ziyuan.baidu.com/)
2. 登录百度账号
3. 选择"用户中心" > "站点管理" > "添加网站"
4. 输入网站地址: `https://zhili.wanli.ai`
5. 选择验证方式（推荐"HTML标签验证"）
   - 网站已配置验证码：`codeva-EK37kLEzAa`（第31行）
   - 无需额外操作，直接点击"完成验证"

#### 3.2 提交sitemap
1. 创建 `sitemap.xml` 文件（见下方）
2. 上传到网站根目录
3. 在百度搜索资源平台提交sitemap地址：`https://zhili.wanli.ai/sitemap.xml`

#### 3.3 主动推送（可选但推荐）
```bash
# API推送示例
curl -H 'Content-Type:text/plain' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=https://zhili.wanli.ai&token=YOUR_TOKEN"
```

**urls.txt 内容：**
```
https://zhili.wanli.ai/
https://zhili.wanli.ai/#services
https://zhili.wanli.ai/#cases
https://zhili.wanli.ai/#tech
https://zhili.wanli.ai/#contact
https://zhili.wanli.ai/#faq
```

### 4. Google Search Console

**步骤：**

#### 4.1 验证网站所有权
1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 登录Google账号
3. 点击"添加资源"，选择"网址前缀"
4. 输入: `https://zhili.wanli.ai`
5. 选择验证方式（推荐"HTML标记"）
   - 网站已配置验证码：`NmSM5pAwwIQ6tUDkqN2NNmvgnb0_J15gsG4QGVAND0w`（第37行）
   - 无需额外操作，直接点击"验证"

#### 4.2 提交sitemap
1. 在左侧菜单选择"站点地图"
2. 输入sitemap地址：`sitemap.xml`
3. 点击"提交"

#### 4.3 请求编入索引（可选）
- 在顶部搜索栏输入具体页面URL
- 点击"请求编入索引"
- Google会优先抓取这些页面

---

## 📄 Sitemap.xml 配置

创建文件：`public-site/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- 首页 - 中文简体 -->
  <url>
    <loc>https://zhili.wanli.ai/</loc>
    <lastmod>2025-12-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="https://zhili.wanli.ai/" />
    <xhtml:link rel="alternate" hreflang="zh-TW" href="https://zhili.wanli.ai/?lang=zh-TW" />
    <xhtml:link rel="alternate" hreflang="en" href="https://zhili.wanli.ai/?lang=en" />
  </url>

  <!-- 服务页面 -->
  <url>
    <loc>https://zhili.wanli.ai/#services</loc>
    <lastmod>2025-12-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- 案例展示 -->
  <url>
    <loc>https://zhili.wanli.ai/#cases</loc>
    <lastmod>2025-12-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- 技术栈 -->
  <url>
    <loc>https://zhili.wanli.ai/#tech</loc>
    <lastmod>2025-12-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- 常见问题 -->
  <url>
    <loc>https://zhili.wanli.ai/#faq</loc>
    <lastmod>2025-12-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- 联系我们 -->
  <url>
    <loc>https://zhili.wanli.ai/#contact</loc>
    <lastmod>2025-12-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

</urlset>
```

---

## 🌐 多语言SEO优化（进阶）

### 方案：使用URL参数区分语言版本

**当前实现：**
- 简体中文：`https://zhili.wanli.ai/` (默认)
- 繁体中文：`https://zhili.wanli.ai/?lang=zh-TW`
- 英文：`https://zhili.wanli.ai/?lang=en`

**优化建议：**

#### 方案A：子目录结构（推荐）
```
https://zhili.wanli.ai/          (简体中文)
https://zhili.wanli.ai/zh-tw/    (繁体中文)
https://zhili.wanli.ai/en/       (英文)
```

**实现步骤：**
1. 在 `public-site/` 目录下创建 `zh-tw/` 和 `en/` 子目录
2. 复制 `index.html` 到各子目录并翻译内容
3. 在Vercel配置路由重写

#### 方案B：子域名结构
```
https://zhili.wanli.ai/     (简体中文)
https://tw.zhili.wanli.ai/  (繁体中文)
https://en.zhili.wanli.ai/  (英文)
```

---

## ✅ 配置检查清单

### 立即执行：
- [x] 页面内容已增加至500+字（通过FAQ板块）
- [x] 已添加百度统计代码框架
- [x] 已添加Google Analytics代码框架
- [ ] 需要替换百度统计ID
- [ ] 需要替换Google Analytics ID

### 后续任务：
- [ ] 在百度搜索资源平台验证网站（已有验证码）
- [ ] 在Google Search Console验证网站（已有验证码）
- [ ] 创建并提交sitemap.xml
- [ ] 考虑实施多语言URL结构优化

### 测试验证：
- [ ] 测试百度统计是否正常工作
- [ ] 测试Google Analytics是否接收数据
- [ ] 在百度搜索资源平台查看索引状态
- [ ] 在Google Search Console查看收录情况
- [ ] 使用Google Mobile-Friendly Test测试移动端

---

## 📞 需要帮助？

如有任何配置问题，请联系：
- 邮箱: wuning@wanli.ai
- 网站: zhili.wanli.ai

---

**文档版本：** v1.0
**更新日期：** 2025-12-28
**状态：** 待完成配置
