# 快速操作指南

## 发布掘金文章 (使用UTM追踪)

### 1. 准备工作
```bash
# 查看UTM链接
cat utm-links.json

# 或者生成特定文章的模板
node utm-tracker.cjs template rag-enterprise-knowledge-base
```

### 2. 发布步骤
```bash
# 自动填写掘金编辑器
node paste-to-juejin.js juejin-ready/rag-enterprise-knowledge-base-clean.md
```

然后在浏览器中：
1. 上传封面图: `covers/rag-cover.jpg`
2. 添加标签: RAG, 向量数据库, 企业知识库, LangChain, AI应用
3. 选择分类: 后端 或 人工智能
4. **重要**: 将"关于我们"部分的链接改为UTM版本

### 3. UTM链接替换

**原链接**:
```markdown
- 🌐 官网: https://zhili.wanli.ai
- 📝 技术博客: https://zhili.wanli.ai/blog/
```

**改为 (掘金专用)**:
```markdown
- 🌐 官网: https://zhili.wanli.ai/?utm_source=juejin&utm_medium=article&utm_campaign=tech_blog
- 📝 技术博客: https://zhili.wanli.ai/blog/?utm_source=juejin&utm_medium=article&utm_campaign=tech_blog
```

---

## 添加新文章

### 1. 创建Markdown文件
```bash
# 在 public-site/blog/markdown/ 创建新文件
# 包含frontmatter
```

### 2. 构建HTML
```bash
node build-blog.js
```

### 3. 生成封面
```bash
node generate-cover.js "文章标题" "副标题" "filename.jpg" "blue"
```

### 4. 更新RSS
```bash
node generate-rss.cjs
```

---

## 数据监控

### 查看SEO状态
```bash
node seo-monitor.js
```

### 查看流量来源
1. 百度统计: https://tongji.baidu.com
2. Google Analytics: https://analytics.google.com
3. 筛选: `utm_source=juejin`

---

## 待实施的优化

### 添加社交分享按钮
```bash
node add-social-share.cjs
git add public-site/blog/posts/*.html
git commit -m "添加社交分享按钮"
```

### 添加结构化数据
```bash
node add-schema.cjs
git add public-site/blog/posts/*.html
git commit -m "添加JSON-LD结构化数据"
```

### 添加相关文章推荐
```bash
node add-related-articles.cjs
git add public-site/blog/posts/*.html
git commit -m "添加相关文章推荐"
```

---

## 文章发布时间表

- ✅ **第1周 (已完成)**: RAG技术在企业知识库中的应用实践
- ⏳ **第2周 (+3-5天)**: 企业级微服务架构设计与落地实践
- ⏳ **第3周 (+3-5天)**: 提示词工程完全指南
- ⏳ **第4周 (+3-5天)**: AI应用成本优化完全指南

---

## 常用命令

### SEO
```bash
# SEO检查
node seo-monitor.js

# 生成sitemap
# (已在public-site/sitemap.xml)

# 百度推送
bash baidu-push.sh
```

### 博客
```bash
# 构建博客
node build-blog.js

# 生成RSS
node generate-rss.cjs

# UTM链接
node utm-tracker.cjs
```

### 掘金发布
```bash
# 获取Cookie (首次)
node get-cookies.js juejin

# 发布文章
node paste-to-juejin.js juejin-ready/xxx-clean.md

# 生成封面
node generate-cover.js
```

### Git
```bash
# 提交更新
git add -A
git commit -m "更新博客内容"
git push origin main
```

---

## 检查清单

### 发布文章前
- [ ] Markdown文件包含frontmatter
- [ ] 代码块有语言标签
- [ ] 图片alt属性完整
- [ ] 封面图已生成
- [ ] UTM链接已准备

### 发布到掘金
- [ ] 内容自动填写成功
- [ ] 封面图已上传
- [ ] 5个标签已添加
- [ ] 分类已选择
- [ ] **链接已改为UTM版本**
- [ ] 预览检查无误

### 发布后
- [ ] 文章链接已保存
- [ ] 回复评论
- [ ] 查看阅读数据
- [ ] 监控流量来源

---

## 联系方式

- 邮箱: wuning@wanli.ai
- 官网: https://zhili.wanli.ai
- 博客: https://zhili.wanli.ai/blog/

---

**最后更新**: 2024-12-28
