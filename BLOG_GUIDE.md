# 博客系统使用指南

## 🎯 系统概述

智理科技网站现已集成完整的博客系统，支持Markdown格式的技术文章发布。博客系统已部署上线：

- **博客首页**: https://zhili.wanli.ai/blog/
- **示例文章**: https://zhili.wanli.ai/blog/posts/build-ai-customer-service-with-gpt4.html

## 📝 发布新文章

### 步骤 1: 创建Markdown文件

在 `public-site/blog/markdown/` 目录下创建新的 `.md` 文件，例如 `my-new-article.md`

### 步骤 2: 添加Frontmatter元数据

每篇文章顶部必须包含以下元数据（frontmatter）：

```markdown
---
title: 文章标题
slug: article-url-slug
excerpt: 文章摘要，显示在列表页，建议80-150字
category: ai
categoryName: AI应用开发
tags: ["GPT-4", "AI开发", "技术外包"]
author: 智理科技技术团队
date: 2024-12-28
readTime: 8分钟
cover: https://example.com/image.jpg
---

## 文章正文开始

这里是正文内容...
```

### 元数据字段说明

| 字段 | 必填 | 说明 | 示例 |
|------|------|------|------|
| title | ✅ | 文章标题 | "如何使用GPT-4构建智能客服系统" |
| slug | ✅ | URL地址（小写英文+连字符） | "build-ai-customer-service-with-gpt4" |
| excerpt | ✅ | 文章摘要 | "深入探讨如何利用GPT-4..." |
| category | ✅ | 分类ID | "ai", "system", "architecture", "case" |
| categoryName | ✅ | 分类显示名称 | "AI应用开发", "企业管理系统", "架构设计", "案例分析" |
| tags | ✅ | 标签数组（JSON格式） | ["GPT-4", "客服系统"] |
| author | ✅ | 作者 | "智理科技技术团队" |
| date | ✅ | 发布日期（YYYY-MM-DD） | "2024-12-28" |
| readTime | ✅ | 预计阅读时间 | "8分钟" |
| cover | 可选 | 封面图片URL | https://... |

### 分类ID对照表

| 分类ID | 分类名称 | 适用场景 |
|--------|----------|----------|
| `ai` | AI应用开发 | GPT、Claude等AI应用开发相关 |
| `system` | 企业管理系统 | ERP、CRM、OA等企业系统开发 |
| `architecture` | 架构设计 | 系统架构、技术选型、性能优化 |
| `case` | 案例分析 | 项目案例、客户故事、实战经验 |

### 步骤 3: 编写Markdown正文

使用标准Markdown语法编写文章：

```markdown
## 二级标题

### 三级标题

这是正文段落，支持**粗体**和*斜体*。

- 无序列表项1
- 无序列表项2

1. 有序列表项1
2. 有序列表项2

代码块示例：

\`\`\`javascript
const example = "Hello World";
console.log(example);
\`\`\`

行内代码：`const x = 1`

> 引用文字

[链接文字](https://example.com)
```

### 步骤 4: 构建HTML

在项目根目录运行构建命令：

```bash
node build-blog.js
```

构建成功后会：
- ✅ 将Markdown转换为HTML文件 → `public-site/blog/posts/[slug].html`
- ✅ 自动生成博客数据索引 → `public-site/blog/blog-data.json`
- ✅ 应用完整的SEO元数据和结构化数据

### 步骤 5: 提交并部署

```bash
# 1. 添加新文件
git add public-site/blog/

# 2. 提交
git commit -m "新增博客文章: [文章标题]"

# 3. 部署到Vercel
npx vercel --prod --yes
```

部署成功后，新文章会立即在 https://zhili.wanli.ai/blog/ 上线。

## 🔍 SEO配置

每篇文章自动包含以下SEO优化：

### 1. Meta标签
- `<title>` 文章标题 - 智理科技技术博客
- `<meta name="description">` 文章摘要
- `<meta name="keywords">` 文章标签

### 2. Open Graph标签
- 社交分享标题、描述、图片
- 完整的文章元数据（作者、发布时间、分类）

### 3. 结构化数据 (Schema.org)
- Article类型结构化数据
- 自动配置发布时间、作者、分类、关键词

### 4. 百度统计 & Google Analytics
- 自动集成访问统计
- 追踪文章阅读量和用户行为

## 📊 内容管理最佳实践

### 文章标题优化
- 包含核心关键词（如"GPT-4", "AI应用开发"）
- 控制在30字以内
- 明确表达文章价值

### 摘要撰写
- 80-150字
- 概括文章核心内容
- 吸引读者点击

### 标签策略
- 每篇3-6个标签
- 优先使用核心关键词
- 标签要准确反映文章内容

### 分类规范
- 每篇文章只选一个主分类
- 分类要与业务方向一致

## 🎨 Markdown写作建议

### 文章结构

```markdown
## 一、引言
简短介绍背景和问题

## 二、核心内容1
详细讲解...

### 2.1 子主题
具体细节...

## 三、核心内容2
...

## 四、总结
关键要点总结
```

### 代码示例

````markdown
```javascript
// 代码注释
const example = () => {
  console.log('示例代码');
};
```
````

### 图片引用

```markdown
![图片描述](https://example.com/image.jpg)
```

## 🚀 高级功能

### 自定义封面图

如果不指定 `cover` 字段，系统会自动生成占位图。推荐尺寸：400x250px

```markdown
---
cover: https://your-cdn.com/article-cover.jpg
---
```

### 更新现有文章

1. 修改 `public-site/blog/markdown/` 中的 `.md` 文件
2. 运行 `node build-blog.js` 重新构建
3. Git提交并部署

### 删除文章

1. 删除 `public-site/blog/markdown/` 中的 `.md` 文件
2. 手动删除 `public-site/blog/posts/` 中对应的 `.html` 文件
3. 运行 `node build-blog.js` 更新索引
4. Git提交并部署

## 📈 内容营销策略

### 发布节奏
- **推荐频率**: 每周1-2篇
- **最佳发布时间**: 工作日上午10:00-11:00

### 多平台分发

在自建博客发布后，同步到：

1. **掘金 (juejin.cn)**
   - 面向开发者社区
   - 技术内容为主

2. **知乎 (zhihu.com)**
   - 覆盖更广泛受众
   - 适合案例分析类文章

3. **CSDN (csdn.net)**
   - 技术教程类文章
   - SEO权重高

4. **微信公众号**
   - 企业官方渠道
   - 适合客户触达

### 内容主题建议

**高优先级主题**（推荐优先创作）：

1. **AI应用开发系列**
   - GPT-4/Claude应用开发实战
   - RAG技术详解
   - AI Agent开发指南
   - 提示词工程最佳实践

2. **企业系统架构系列**
   - 微服务架构设计
   - 数据库优化实践
   - 性能调优案例

3. **项目案例分析系列**
   - 教育AI项目案例
   - 企业管理系统案例
   - 电商平台开发经验

4. **技术外包指南系列**
   - 如何选择技术外包服务商
   - 外包项目管理最佳实践
   - 成本优化策略

## 🔧 故障排查

### 构建失败

**问题**: 运行 `node build-blog.js` 报错

**解决**:
1. 检查Markdown文件frontmatter格式是否正确
2. 确保所有必填字段都已填写
3. tags字段必须使用JSON数组格式：`["tag1", "tag2"]`
4. date字段格式必须是 `YYYY-MM-DD`

### 文章不显示

**问题**: 构建成功但文章不在列表页显示

**解决**:
1. 检查 `public-site/blog/blog-data.json` 是否包含该文章
2. 清除浏览器缓存刷新页面
3. 检查文章的category字段是否正确

### 部署失败

**问题**: Vercel部署报错

**解决**:
```bash
# 查看部署日志
npx vercel --prod --yes

# 如果失败，查看详细错误
vercel inspect [deployment-url] --logs
```

## 📞 技术支持

如有问题或建议，请联系：

- 📧 邮箱: wuning@wanli.ai
- 🌐 网站: https://zhili.wanli.ai

---

**文档版本**: v1.0
**最后更新**: 2024-12-28
