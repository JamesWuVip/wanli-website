/**
 * 相关文章推荐系统
 * 基于标签相似度推荐相关文章
 */

const fs = require('fs');
const path = require('path');

function calculateSimilarity(tags1, tags2) {
  const set1 = new Set(tags1);
  const set2 = new Set(tags2);
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return intersection.size / union.size;
}

function getRelatedArticles(currentArticle, allArticles, limit = 3) {
  return allArticles
    .filter(article => article.slug !== currentArticle.slug)
    .map(article => ({
      ...article,
      similarity: calculateSimilarity(currentArticle.tags, article.tags)
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}

function generateRelatedArticlesHTML(relatedArticles) {
  if (relatedArticles.length === 0) return '';

  const articlesHTML = relatedArticles.map(article => `
    <a href="${article.slug}.html"
       class="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-400 transition-all group">
        <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
                <span class="inline-block px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(article.category)}">
                    ${article.categoryName}
                </span>
            </div>
            <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                    ${article.title}
                </h3>
                <p class="text-sm text-gray-600 line-clamp-2 mb-3">
                    ${article.excerpt}
                </p>
                <div class="flex items-center text-xs text-gray-500 space-x-4">
                    <span>📅 ${article.date}</span>
                    <span>⏱️ ${article.readTime}</span>
                </div>
            </div>
        </div>
    </a>
  `).join('\n');

  return `
<!-- 相关推荐 -->
<div class="mt-16 border-t border-gray-200 pt-12">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <span class="w-1 h-6 bg-blue-600 mr-3"></span>
        相关推荐
    </h2>
    <div class="space-y-4">
        ${articlesHTML}
    </div>
</div>
`;
}

function getCategoryColor(category) {
  const colors = {
    'ai': 'bg-blue-100 text-blue-800',
    'architecture': 'bg-pink-100 text-pink-800',
    'case': 'bg-green-100 text-green-800',
    'default': 'bg-gray-100 text-gray-800'
  };
  return colors[category] || colors.default;
}

// 读取blog-data.json
const articles = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'public-site/blog/blog-data.json'), 'utf-8')
);

console.log('🔗 生成相关文章推荐...\n');

articles.forEach(article => {
  const htmlPath = path.join(__dirname, `public-site/blog/posts/${article.slug}.html`);

  if (!fs.existsSync(htmlPath)) {
    console.log(`⚠️  跳过: ${article.slug}.html (文件不存在)`);
    return;
  }

  let html = fs.readFileSync(htmlPath, 'utf-8');

  // 检查是否已经有推荐
  if (html.includes('相关推荐')) {
    console.log(`⏭️  跳过: ${article.title} (已有推荐)`);
    return;
  }

  // 获取相关文章
  const relatedArticles = getRelatedArticles(article, articles);
  const relatedHTML = generateRelatedArticlesHTML(relatedArticles);

  // 在"关于我们"部分之前插入推荐
  const aboutSection = '## 关于我们';
  if (html.includes(aboutSection)) {
    html = html.replace(aboutSection, relatedHTML + '\n' + aboutSection);
  } else {
    // 如果没有"关于我们"，在</article>前插入
    html = html.replace('</article>', relatedHTML + '\n</article>');
  }

  fs.writeFileSync(htmlPath, html);
  console.log(`✅ ${article.title} (推荐${relatedArticles.length}篇)`);
});

console.log('\n✨ 相关文章推荐生成完成！\n');
