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
        .glass {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .prose {
            max-width: 800px;
            margin: 0 auto;
        }

        .prose h2 {
            font-size: 1.875rem;
            font-weight: 700;
            margin-top: 2.5rem;
            margin-bottom: 1.25rem;
            color: #a78bfa;
        }

        .prose h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 2rem;
            margin-bottom: 1rem;
            color: #c4b5fd;
        }

        .prose p {
            margin-bottom: 1.25rem;
            line-height: 1.8;
            color: #e5e7eb;
        }

        .prose ul, .prose ol {
            margin-bottom: 1.25rem;
            padding-left: 1.5rem;
        }

        .prose li {
            margin-bottom: 0.5rem;
            color: #e5e7eb;
        }

        .prose code {
            background: rgba(102, 126, 234, 0.2);
            padding: 0.2rem 0.5rem;
            border-radius: 0.25rem;
            font-family: 'Courier New', monospace;
            color: #fbbf24;
        }

        .prose pre {
            background: rgba(0, 0, 0, 0.3);
            padding: 1.5rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin-bottom: 1.25rem;
            border: 1px solid rgba(102, 126, 234, 0.3);
        }

        .prose pre code {
            background: transparent;
            padding: 0;
            color: #a5f3fc;
        }

        .prose a {
            color: #a78bfa;
            text-decoration: underline;
        }

        .prose a:hover {
            color: #c4b5fd;
        }

        .prose strong {
            font-weight: 600;
            color: #fbbf24;
        }

        .prose blockquote {
            border-left: 4px solid #667eea;
            padding-left: 1.5rem;
            margin: 1.5rem 0;
            color: #d1d5db;
            font-style: italic;
        }

        .tag {
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
            color: #a78bfa;
            padding: 6px 14px;
            border-radius: 12px;
            font-size: 0.875rem;
            display: inline-block;
        }
    </style>
</head>
<body class="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white min-h-screen">

    <!-- 导航栏 -->
    <nav class="fixed top-0 w-full z-50 glass">
        <div class="max-w-6xl mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
                <a href="/" class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    智理科技
                </a>
                <div class="flex gap-6">
                    <a href="/" class="hover:text-purple-400 transition">首页</a>
                    <a href="/blog/" class="hover:text-purple-400 transition">博客</a>
                    <a href="/#contact" class="hover:text-purple-400 transition">联系我们</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- 文章内容 -->
    <main class="pt-24 pb-16">
        <div class="max-w-6xl mx-auto px-4">

            <!-- 文章头部 -->
            <header class="mb-12">
                <div class="text-center max-w-3xl mx-auto">
                    <div class="flex justify-center gap-3 mb-4">
                        <span class="tag">${metadata.categoryName}</span>
                    </div>
                    <h1 class="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        ${metadata.title}
                    </h1>
                    <div class="flex justify-center items-center gap-4 text-gray-400">
                        <span>${metadata.author}</span>
                        <span>·</span>
                        <time datetime="${metadata.date}">${new Date(metadata.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                        <span>·</span>
                        <span>${metadata.readTime}</span>
                    </div>
                </div>
            </header>

            <!-- 文章主体 -->
            <article class="prose">
                ${content}

                <div class="glass rounded-xl p-6 mt-8 mb-8">
                    <h3 class="text-xl font-bold mb-4">💡 联系我们</h3>
                    <p class="mb-2">📧 邮箱: <a href="mailto:wuning@wanli.ai" class="text-purple-400 hover:text-purple-300">wuning@wanli.ai</a></p>
                    <p class="mb-2">🌐 网站: <a href="https://zhili.wanli.ai" class="text-purple-400 hover:text-purple-300">zhili.wanli.ai</a></p>
                    <p>💬 扫描首页微信二维码，获取技术咨询</p>
                </div>
            </article>

            <!-- 文章标签 -->
            <div class="flex flex-wrap gap-3 mt-8 mb-12 justify-center">
                ${metadata.tags.map(tag => `<span class="tag">#${tag}</span>`).join('\n                ')}
            </div>

            <!-- 返回博客列表 -->
            <div class="text-center mt-12">
                <a href="/blog/" class="inline-block glass px-8 py-3 rounded-lg hover:bg-white/10 transition">
                    ← 返回博客列表
                </a>
            </div>

        </div>
    </main>

    <!-- 页脚 -->
    <footer class="glass py-8 mt-16">
        <div class="max-w-6xl mx-auto px-4 text-center text-gray-400">
            <p>&copy; 2024 北京智理科技有限公司 |
                <a href="/" class="hover:text-purple-400">返回首页</a> |
                <a href="mailto:wuning@wanli.ai" class="hover:text-purple-400">联系我们</a>
            </p>
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
