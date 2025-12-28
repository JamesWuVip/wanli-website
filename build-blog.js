#!/usr/bin/env node
/**
 * 博客文章构建工具
 * 将Markdown文件转换为HTML，并生成文章索引
 */

import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 配置路径
const POSTS_DIR = path.join(__dirname, 'public-site/blog/markdown');
const OUTPUT_DIR = path.join(__dirname, 'public-site/blog/posts');
const BLOG_DATA_FILE = path.join(__dirname, 'public-site/blog/blog-data.json');

// 创建必要的目录
if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
}
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 配置marked
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false
});

// HTML模板
function getArticleTemplate(metadata, content) {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${metadata.title} - 智理科技技术博客</title>
    <meta name="description" content="${metadata.excerpt}">
    <meta name="keywords" content="${metadata.tags.join(',')}">
    <meta name="author" content="${metadata.author}">

    <!-- Open Graph -->
    <meta property="og:title" content="${metadata.title}">
    <meta property="og:description" content="${metadata.excerpt}">
    <meta property="og:image" content="https://zhili.wanli.ai/og-image.jpg">
    <meta property="og:url" content="https://zhili.wanli.ai/blog/posts/${metadata.slug}.html">
    <meta property="og:type" content="article">
    <meta property="article:published_time" content="${metadata.date}T10:00:00+08:00">
    <meta property="article:author" content="${metadata.author}">
    <meta property="article:section" content="${metadata.categoryName}">
    ${metadata.tags.map(tag => `<meta property="article:tag" content="${tag}">`).join('\n    ')}

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- 百度统计 -->
    <script>
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?899d2895125d00f40d4e27a4e9490d14";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
    </script>

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-HYYQPK3KW2"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-HYYQPK3KW2');
    </script>

    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Microsoft YaHei";
        }

        .prose {
            max-width: 800px;
            margin: 0 auto;
            color: #374151;
        }

        .prose h2 {
            font-size: 1.875rem;
            font-weight: 700;
            margin-top: 3rem;
            margin-bottom: 1rem;
            color: #111827;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #e5e7eb;
        }

        .prose h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 2rem;
            margin-bottom: 0.75rem;
            color: #1f2937;
        }

        .prose h4 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
            color: #374151;
        }

        .prose p {
            margin-bottom: 1.25rem;
            line-height: 1.75;
            color: #4b5563;
        }

        .prose ul, .prose ol {
            margin-bottom: 1.25rem;
            padding-left: 1.5rem;
        }

        .prose li {
            margin-bottom: 0.5rem;
            color: #4b5563;
            line-height: 1.75;
        }

        .prose code {
            background: #f3f4f6;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-family: 'SF Mono', 'Monaco', 'Cascadia Code', 'Courier New', monospace;
            color: #dc2626;
            font-size: 0.875em;
        }

        .prose pre {
            background: #1f2937;
            padding: 1.5rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin-bottom: 1.5rem;
            border: 1px solid #374151;
        }

        .prose pre code {
            background: transparent;
            padding: 0;
            color: #e5e7eb;
            font-size: 0.875rem;
        }

        .prose a {
            color: #2563eb;
            text-decoration: none;
            border-bottom: 1px solid transparent;
            transition: border-color 0.2s;
        }

        .prose a:hover {
            border-bottom-color: #2563eb;
        }

        .prose strong {
            font-weight: 600;
            color: #111827;
        }

        .prose blockquote {
            border-left: 4px solid #2563eb;
            padding-left: 1.5rem;
            margin: 1.5rem 0;
            color: #6b7280;
            font-style: italic;
        }

        .prose table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
        }

        .prose th {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            padding: 0.75rem;
            text-align: left;
            font-weight: 600;
            color: #111827;
        }

        .prose td {
            border: 1px solid #e5e7eb;
            padding: 0.75rem;
            color: #4b5563;
        }

        .prose tr:nth-child(even) {
            background: #f9fafb;
        }

        .prose img {
            max-width: 100%;
            border-radius: 0.5rem;
            margin: 1.5rem 0;
        }

        .category-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .category-ai { background: #dbeafe; color: #1e40af; }
        .category-architecture { background: #fce7f3; color: #9f1239; }
        .category-system { background: #dcfce7; color: #166534; }
        .category-case { background: #fef3c7; color: #92400e; }

        .tag {
            display: inline-block;
            padding: 4px 12px;
            background: #f3f4f6;
            color: #6b7280;
            border-radius: 4px;
            font-size: 0.875rem;
            margin-right: 8px;
            margin-bottom: 8px;
        }

        .contact-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 0.75rem;
            padding: 2rem;
            margin: 2rem 0;
        }

        .nav-link {
            position: relative;
            padding-bottom: 4px;
        }

        .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: #2563eb;
            transition: width 0.3s;
        }

        .nav-link:hover::after {
            width: 100%;
        }
    </style>
</head>
<body class="bg-gray-50 text-gray-900">

    <!-- 导航栏 -->
    <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <a href="/" class="text-xl font-bold text-gray-900 hover:text-blue-600 transition">
                    智理科技
                </a>
                <div class="flex gap-8">
                    <a href="/" class="nav-link text-gray-600 hover:text-gray-900 transition">首页</a>
                    <a href="/blog/" class="nav-link text-blue-600 font-medium">博客</a>
                    <a href="/#contact" class="nav-link text-gray-600 hover:text-gray-900 transition">联系我们</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- 文章内容 -->
    <main class="py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

            <!-- 文章头部 -->
            <header class="mb-12">
                <div class="mb-6">
                    <a href="/blog/" class="inline-flex items-center text-gray-600 hover:text-gray-900 text-sm">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        返回博客列表
                    </a>
                </div>
                <div class="flex items-center gap-3 mb-4">
                    <span class="category-badge category-${metadata.category}">${metadata.categoryName}</span>
                    <span class="text-gray-500 text-sm">${new Date(metadata.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span class="text-gray-400">·</span>
                    <span class="text-gray-500 text-sm flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        ${metadata.readTime}
                    </span>
                </div>
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                    ${metadata.title}
                </h1>
                <p class="text-xl text-gray-600 leading-relaxed">
                    ${metadata.excerpt}
                </p>
            </header>

            <!-- 文章主体 -->
            <article class="prose prose-lg">
                ${content}
            </article>

            <!-- 联系卡片 -->
            <div class="contact-card mt-12">
                <h3 class="text-xl font-bold text-white mb-3">💡 需要技术支持？</h3>
                <p class="text-white/90 mb-4">智理科技专注于企业级AI应用开发，我们提供从需求分析、技术选型到开发上线的全流程服务。</p>
                <div class="flex flex-col sm:flex-row gap-4">
                    <a href="mailto:wuning@wanli.ai" class="inline-flex items-center text-white hover:text-white/90">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        wuning@wanli.ai
                    </a>
                    <a href="https://zhili.wanli.ai" class="inline-flex items-center text-white hover:text-white/90">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                        </svg>
                        zhili.wanli.ai
                    </a>
                </div>
            </div>

            <!-- 文章标签 -->
            <div class="mt-8 pt-8 border-t border-gray-200">
                <div class="flex flex-wrap gap-2">
                    ${metadata.tags.map(tag => `<span class="tag">#${tag}</span>`).join('\n                    ')}
                </div>
            </div>

            <!-- 返回博客列表 -->
            <div class="text-center mt-12">
                <a href="/blog/" class="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition text-gray-700 font-medium">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                    </svg>
                    返回博客列表
                </a>
            </div>

        </div>
    </main>

    <!-- 页脚 -->
    <footer class="bg-white border-t border-gray-200 mt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="text-center text-gray-500 text-sm">
                <p>&copy; 2024 北京智理科技有限公司 |
                    <a href="/" class="hover:text-blue-600">返回首页</a> |
                    <a href="mailto:wuning@wanli.ai" class="hover:text-blue-600">联系我们</a>
                </p>
            </div>
        </div>
    </footer>

    <!-- 结构化数据 - Article -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${metadata.title}",
      "description": "${metadata.excerpt}",
      "image": "https://zhili.wanli.ai/og-image.jpg",
      "datePublished": "${metadata.date}T10:00:00+08:00",
      "dateModified": "${metadata.date}T10:00:00+08:00",
      "author": {
        "@type": "Organization",
        "name": "${metadata.author}"
      },
      "publisher": {
        "@type": "Organization",
        "name": "北京智理科技有限公司",
        "logo": {
          "@type": "ImageObject",
          "url": "https://zhili.wanli.ai/og-image.jpg"
        }
      },
      "articleSection": "${metadata.categoryName}",
      "keywords": ${JSON.stringify(metadata.tags)},
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://zhili.wanli.ai/blog/posts/${metadata.slug}.html"
      }
    }
    </script>

</body>
</html>`;
}

// 解析Markdown文件的frontmatter
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    throw new Error('文件缺少frontmatter');
  }

  const frontmatter = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      // 处理数组类型（tags）
      if (value.startsWith('[')) {
        frontmatter[key.trim()] = JSON.parse(value);
      } else {
        frontmatter[key.trim()] = value;
      }
    }
  }

  const markdown = match[2];

  return { metadata: frontmatter, markdown };
}

// 构建单个文章
function buildPost(filename) {
  const filePath = path.join(POSTS_DIR, filename);
  const content = fs.readFileSync(filePath, 'utf-8');

  try {
    const { metadata, markdown } = parseFrontmatter(content);

    // 转换Markdown为HTML
    const htmlContent = marked(markdown);

    // 生成完整HTML
    const fullHtml = getArticleTemplate(metadata, htmlContent);

    // 写入文件
    const outputPath = path.join(OUTPUT_DIR, `${metadata.slug}.html`);
    fs.writeFileSync(outputPath, fullHtml);

    console.log(`✅ 构建成功: ${metadata.title} -> ${metadata.slug}.html`);

    return {
      id: Date.now() + Math.random(), // 临时ID
      ...metadata,
      cover: metadata.cover || `https://via.placeholder.com/400x250/667eea/ffffff?text=${encodeURIComponent(metadata.categoryName)}`
    };

  } catch (error) {
    console.error(`❌ 构建失败 ${filename}:`, error.message);
    return null;
  }
}

// 构建所有文章
async function buildAll() {
  console.log('🚀 开始构建博客文章...\n');

  // 检查Markdown目录
  if (!fs.existsSync(POSTS_DIR)) {
    console.log(`📁 创建Markdown目录: ${POSTS_DIR}`);
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

  if (files.length === 0) {
    console.log('⚠️  没有找到Markdown文件');
    console.log(`💡 请在 ${POSTS_DIR} 目录下创建 .md 文件\n`);
    console.log('示例frontmatter格式:');
    console.log('---');
    console.log('title: 文章标题');
    console.log('slug: article-slug');
    console.log('excerpt: 文章摘要');
    console.log('category: ai');
    console.log('categoryName: AI应用开发');
    console.log('tags: ["GPT-4", "AI开发"]');
    console.log('author: 智理科技技术团队');
    console.log('date: 2024-12-20');
    console.log('readTime: 8分钟');
    console.log('---');
    return;
  }

  const posts = [];

  for (const file of files) {
    const post = buildPost(file);
    if (post) {
      posts.push(post);
    }
  }

  // 按日期排序（最新的在前）
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // 生成博客数据索引
  fs.writeFileSync(BLOG_DATA_FILE, JSON.stringify(posts, null, 2));

  console.log(`\n✅ 构建完成! 共 ${posts.length} 篇文章`);
  console.log(`📊 博客数据已保存: ${BLOG_DATA_FILE}`);
}

// 执行构建
buildAll().catch(error => {
  console.error('💥 构建失败:', error);
  process.exit(1);
});
