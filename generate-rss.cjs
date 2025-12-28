/**
 * 生成RSS订阅源
 * 让用户可以通过RSS阅读器订阅博客
 */

const fs = require('fs');
const path = require('path');

function generateRSS(articles) {
  const now = new Date().toUTCString();

  const items = articles.map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <description><![CDATA[${article.excerpt}]]></description>
      <link>https://zhili.wanli.ai/blog/posts/${article.slug}.html</link>
      <guid isPermaLink="true">https://zhili.wanli.ai/blog/posts/${article.slug}.html</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <category>${article.categoryName}</category>
      ${article.tags.map(tag => `<category>${tag}</category>`).join('\n      ')}
      <author>wuning@wanli.ai (智理科技技术团队)</author>
    </item>
  `).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>智理科技技术博客</title>
    <link>https://zhili.wanli.ai/blog/</link>
    <description>企业级AI应用开发、微服务架构、技术外包服务 - 智理科技</description>
    <language>zh-CN</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="https://zhili.wanli.ai/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>https://zhili.wanli.ai/og-image.jpg</url>
      <title>智理科技技术博客</title>
      <link>https://zhili.wanli.ai/blog/</link>
    </image>
${items}
  </channel>
</rss>`;
}

function generateAtomFeed(articles) {
  const now = new Date().toISOString();

  const entries = articles.map(article => `
  <entry>
    <title>${article.title}</title>
    <link href="https://zhili.wanli.ai/blog/posts/${article.slug}.html"/>
    <id>https://zhili.wanli.ai/blog/posts/${article.slug}.html</id>
    <updated>${new Date(article.date).toISOString()}</updated>
    <summary>${article.excerpt}</summary>
    <author>
      <name>智理科技技术团队</name>
      <email>wuning@wanli.ai</email>
    </author>
    ${article.tags.map(tag => `<category term="${tag}"/>`).join('\n    ')}
  </entry>
  `).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>智理科技技术博客</title>
  <link href="https://zhili.wanli.ai/blog/"/>
  <link href="https://zhili.wanli.ai/blog/atom.xml" rel="self"/>
  <id>https://zhili.wanli.ai/blog/</id>
  <updated>${now}</updated>
  <subtitle>企业级AI应用开发、微服务架构、技术外包服务</subtitle>
  <author>
    <name>智理科技</name>
    <email>wuning@wanli.ai</email>
    <uri>https://zhili.wanli.ai</uri>
  </author>
${entries}
</feed>`;
}

// 读取blog-data.json (直接是数组)
const articles = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'public-site/blog/blog-data.json'), 'utf-8')
);

console.log('📡 生成RSS订阅源...\n');

// 按日期排序
const sortedArticles = [...articles].sort((a, b) =>
  new Date(b.date) - new Date(a.date)
);

// 生成RSS
const rssXML = generateRSS(sortedArticles);
fs.writeFileSync(
  path.join(__dirname, 'public-site/blog/rss.xml'),
  rssXML
);
console.log('✅ RSS 2.0: /blog/rss.xml');

// 生成Atom
const atomXML = generateAtomFeed(sortedArticles);
fs.writeFileSync(
  path.join(__dirname, 'public-site/blog/atom.xml'),
  atomXML
);
console.log('✅ Atom: /blog/atom.xml');

console.log('\n✨ RSS订阅源生成完成！\n');
console.log('📌 订阅地址:');
console.log('   RSS: https://zhili.wanli.ai/blog/rss.xml');
console.log('   Atom: https://zhili.wanli.ai/blog/atom.xml\n');
