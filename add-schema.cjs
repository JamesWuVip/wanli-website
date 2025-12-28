/**
 * 为博客文章添加JSON-LD结构化数据
 * 增强搜索引擎对文章的理解
 */

const fs = require('fs');
const path = require('path');

function generateArticleSchema(article) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": article.title,
    "description": article.excerpt,
    "image": `https://zhili.wanli.ai/blog-covers/${article.slug}.jpg`,
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Organization",
      "name": "智理科技",
      "url": "https://zhili.wanli.ai",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zhili.wanli.ai/og-image.jpg"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "智理科技",
      "url": "https://zhili.wanli.ai",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zhili.wanli.ai/og-image.jpg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://zhili.wanli.ai/blog/posts/${article.slug}.html`
    },
    "keywords": article.tags.join(", "),
    "articleSection": article.categoryName,
    "proficiencyLevel": "Advanced",
    "dependencies": "LangChain, OpenAI, Python",
    "about": {
      "@type": "Thing",
      "name": article.categoryName
    }
  };
}

function generateBreadcrumbSchema(article) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "首页",
        "item": "https://zhili.wanli.ai"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "技术博客",
        "item": "https://zhili.wanli.ai/blog/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://zhili.wanli.ai/blog/posts/${article.slug}.html`
      }
    ]
  };
}

// 读取blog-data.json
const articles = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'public-site/blog/blog-data.json'), 'utf-8')
);

console.log('📊 生成结构化数据...\n');

articles.forEach(article => {
  const articleSchema = generateArticleSchema(article);
  const breadcrumbSchema = generateBreadcrumbSchema(article);

  const htmlPath = path.join(__dirname, `public-site/blog/posts/${article.slug}.html`);

  if (!fs.existsSync(htmlPath)) {
    console.log(`⚠️  跳过: ${article.slug}.html (文件不存在)`);
    return;
  }

  let html = fs.readFileSync(htmlPath, 'utf-8');

  // 检查是否已经有结构化数据
  if (html.includes('"@type": "TechArticle"')) {
    console.log(`⏭️  跳过: ${article.title} (已有结构化数据)`);
    return;
  }

  // 在</head>前插入结构化数据
  const schemaScript = `
    <!-- JSON-LD 结构化数据 -->
    <script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
    </script>
    <script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
    </script>
</head>`;

  html = html.replace('</head>', schemaScript);

  fs.writeFileSync(htmlPath, html);
  console.log(`✅ ${article.title}`);
});

console.log('\n✨ 结构化数据生成完成！\n');
