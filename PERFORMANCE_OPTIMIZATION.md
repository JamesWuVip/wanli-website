# 性能优化指南 - 智理科技官网

## 📊 当前性能指标

根据最新 SEO 监控报告:
- **加载时间**: 1893ms (目标: <1000ms)
- **页面大小**: 73.61 KB
- **压缩方式**: 无
- **评分**: 90/100

---

## 🎯 优化目标

### 短期目标 (1周内)
- [ ] 将加载时间降至 **<1500ms**
- [ ] 启用 Gzip/Brotli 压缩
- [ ] 优化图片资源

### 中期目标 (1个月内)
- [ ] 将加载时间降至 **<1000ms**
- [ ] 实现 CDN 加速
- [ ] Core Web Vitals 达到"良好"标准

### 长期目标 (3个月内)
- [ ] 性能评分达到 **95+**
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

---

## ✅ 已完成的优化

### 1. Vercel 缓存配置 ✅
```json
{
  "headers": [
    {
      "source": "/(.*)\\.(js|css|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot|ico)",
      "headers": [{
        "key": "Cache-Control",
        "value": "public, max-age=31536000, immutable"
      }]
    }
  ]
}
```

**效果**: 静态资源浏览器缓存 1 年

### 2. 安全响应头 ✅
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection

---

## 🚀 待执行的优化项

### 高优先级 (立即执行)

#### 1. 启用压缩 (预计提升 60-70%)

**方法 A: Vercel 自动压缩** (推荐)
```json
// vercel.json 已自动启用
// Vercel 会自动对所有文本资源进行 Brotli/Gzip 压缩
```

**验证命令**:
```bash
curl -I https://zhili.wanli.ai | grep -i "content-encoding"
```

预期输出: `content-encoding: br` 或 `content-encoding: gzip`

#### 2. 图片优化

**当前图片**:
- `/wechat-qr.png` - 微信二维码
- `/og-image.jpg` - OG 图片

**优化步骤**:

a. 安装图片压缩工具:
```bash
npm install -D sharp imagemin imagemin-webp
```

b. 创建图片优化脚本 `optimize-images.js`:
```javascript
import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

async function optimizeImages() {
  const imgDir = './public-site';
  const files = await readdir(imgDir);
  
  for (const file of files) {
    if (/\.(jpg|jpeg|png)$/i.test(file)) {
      const input = join(imgDir, file);
      const output = input.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      await sharp(input)
        .webp({ quality: 85 })
        .toFile(output);
      
      console.log(`✓ ${file} → ${output}`);
    }
  }
}

optimizeImages();
```

c. 运行优化:
```bash
node optimize-images.js
```

d. 更新 HTML 使用 WebP (带降级支持):
```html
<picture>
  <source srcset="/wechat-qr.webp" type="image/webp">
  <img src="/wechat-qr.png" alt="微信二维码">
</picture>
```

**预期效果**: 图片大小减少 30-50%

#### 3. 字体优化

**当前**: 从 Google Fonts CDN 加载
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap" rel="stylesheet">
```

**优化方案**:
- 使用 `font-display: swap` (已实现 ✅)
- 考虑只加载必要字重 (300, 400, 700)
- 使用 `preconnect` 预连接

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Noto+Sans+SC:wght@400;700&display=swap" rel="stylesheet">
```

**预期效果**: 减少 30-40% 字体文件大小

### 中优先级 (本周完成)

#### 4. JavaScript 优化

**当前问题**:
- Tailwind CSS CDN (127KB gzipped)

**优化方案**:
a. 使用构建版本代替 CDN:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

b. 配置 `tailwind.config.js`:
```javascript
module.exports = {
  content: ['./public-site/**/*.html'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

c. 构建优化后的 CSS:
```bash
npx tailwindcss -i ./input.css -o ./output.css --minify
```

**预期效果**: CSS 从 127KB 降至 20-30KB

#### 5. 资源预加载

在 `<head>` 中添加:
```html
<!-- 预加载关键资源 -->
<link rel="preload" href="/wechat-qr.webp" as="image">
<link rel="dns-prefetch" href="https://cdn.tailwindcss.com">
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
```

#### 6. 懒加载

对非关键图片添加懒加载:
```html
<img src="/og-image.webp" alt="..." loading="lazy">
```

### 低优先级 (持续优化)

#### 7. 使用 CDN

**方案**: Cloudflare 或阿里云 OSS
- 将静态资源上传到 CDN
- 配置 CNAME 解析
- 更新资源 URL

#### 8. 实施 Service Worker

缓存策略:
- HTML: Network First
- CSS/JS: Stale While Revalidate
- 图片: Cache First

#### 9. 性能监控

**安装**: 
```bash
npm install -D lighthouse web-vitals
```

**创建监控脚本**:
```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

---

## 📈 性能预期

### 优化前
- 加载时间: **1893ms**
- 页面大小: **73.61 KB**
- 评分: **90/100**

### 优化后 (预期)
- 加载时间: **<800ms** (-58%)
- 页面大小: **<40 KB** (-46%)
- 评分: **95+/100**

### Core Web Vitals 目标
- **LCP** (Largest Contentful Paint): <2.5s
- **FID** (First Input Delay): <100ms
- **CLS** (Cumulative Layout Shift): <0.1

---

## 🔧 快速执行清单

### 今天完成
- [ ] 启用 Vercel 压缩 (验证是否已生效)
- [ ] 优化图片为 WebP 格式
- [ ] 添加资源预加载

### 本周完成
- [ ] 优化字体加载
- [ ] 替换 Tailwind CDN 为构建版本
- [ ] 实施图片懒加载

### 本月完成
- [ ] 配置 CDN
- [ ] 实施 Service Worker
- [ ] 集成性能监控

---

## 📊 监控和测试

### 工具
1. **Google PageSpeed Insights**: https://pagespeed.web.dev/
2. **WebPageTest**: https://www.webpagetest.org/
3. **Lighthouse CI**: 本地运行
4. **自建监控**: `node seo-monitor.js`

### 定期检查
- 每日: 运行 `node seo-monitor.js`
- 每周: PageSpeed Insights 测试
- 每月: 完整性能审计

---

## 📞 技术支持

如有疑问,请联系:
- 📧 wuning@wanli.ai
- 🌐 zhili.wanli.ai

---

**文档更新**: 2025年12月28日
**下次审查**: 2026年1月4日
