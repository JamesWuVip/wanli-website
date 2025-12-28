/**
 * 为文章中的外链添加UTM参数
 * 追踪从不同平台来的流量
 */

const fs = require('fs');
const path = require('path');

// UTM参数配置
const UTM_CONFIGS = {
  // 掘金文章中的链接
  juejin: {
    utm_source: 'juejin',
    utm_medium: 'article',
    utm_campaign: 'tech_blog'
  },
  // 网站博客中链接到掘金的
  blog_to_juejin: {
    utm_source: 'zhili_blog',
    utm_medium: 'referral',
    utm_campaign: 'cross_promotion'
  }
};

function addUTMParams(url, utmConfig) {
  const urlObj = new URL(url);
  Object.entries(utmConfig).forEach(([key, value]) => {
    urlObj.searchParams.set(key, value);
  });
  return urlObj.toString();
}

// 为博客文章添加UTM追踪的外链版本
function generateUTMLinks() {
  const articles = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'public-site/blog/blog-data.json'), 'utf-8')
  );

  const utmLinksData = {
    generated_at: new Date().toISOString(),
    purpose: '用于在掘金等外部平台发布文章时，添加UTM参数追踪流量来源',
    links: {}
  };

  articles.forEach(article => {
    const baseURL = `https://zhili.wanli.ai/blog/posts/${article.slug}.html`;

    utmLinksData.links[article.slug] = {
      title: article.title,
      base_url: baseURL,
      utm_links: {
        juejin: addUTMParams(baseURL, UTM_CONFIGS.juejin),
        csdn: addUTMParams(baseURL, { ...UTM_CONFIGS.juejin, utm_source: 'csdn' }),
        zhihu: addUTMParams(baseURL, { ...UTM_CONFIGS.juejin, utm_source: 'zhihu' }),
        segmentfault: addUTMParams(baseURL, { ...UTM_CONFIGS.juejin, utm_source: 'segmentfault' }),
        wechat: addUTMParams(baseURL, { ...UTM_CONFIGS.juejin, utm_source: 'wechat', utm_medium: 'social' })
      },
      markdown_snippets: {
        juejin: `[阅读原文](${addUTMParams(baseURL, UTM_CONFIGS.juejin)})`,
        homepage: `[智理科技官网](${addUTMParams('https://zhili.wanli.ai', UTM_CONFIGS.juejin)})`,
        blog: `[技术博客](${addUTMParams('https://zhili.wanli.ai/blog/', UTM_CONFIGS.juejin)})`
      }
    };
  });

  // 添加官网主要页面的UTM链接
  utmLinksData.main_pages = {
    homepage: {
      juejin: addUTMParams('https://zhili.wanli.ai', UTM_CONFIGS.juejin),
      markdown: `[智理科技官网](${addUTMParams('https://zhili.wanli.ai', UTM_CONFIGS.juejin)})`
    },
    blog: {
      juejin: addUTMParams('https://zhili.wanli.ai/blog/', UTM_CONFIGS.juejin),
      markdown: `[技术博客](${addUTMParams('https://zhili.wanli.ai/blog/', UTM_CONFIGS.juejin)})`
    },
    services: {
      juejin: addUTMParams('https://zhili.wanli.ai/#services', UTM_CONFIGS.juejin),
      markdown: `[服务内容](${addUTMParams('https://zhili.wanli.ai/#services', UTM_CONFIGS.juejin)})`
    },
    contact: {
      juejin: addUTMParams('https://zhili.wanli.ai/#contact', UTM_CONFIGS.juejin),
      markdown: `[联系我们](${addUTMParams('https://zhili.wanli.ai/#contact', UTM_CONFIGS.juejin)})`
    }
  };

  // 保存UTM链接数据
  const outputPath = path.join(__dirname, 'utm-links.json');
  fs.writeFileSync(outputPath, JSON.stringify(utmLinksData, null, 2));

  console.log('✅ UTM追踪链接已生成: utm-links.json\n');
  console.log('📋 使用方法:');
  console.log('   在掘金发布文章时，使用对应的UTM链接替换普通链接');
  console.log('   例如: 将 https://zhili.wanli.ai 替换为:');
  console.log(`   ${utmLinksData.main_pages.homepage.juejin}\n`);

  return utmLinksData;
}

// 生成掘金文章发布模板
function generateJuejinTemplate(articleSlug) {
  const utmData = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'utm-links.json'), 'utf-8')
  );

  const articleUTM = utmData.links[articleSlug];
  if (!articleUTM) {
    console.error(`❌ 未找到文章: ${articleSlug}`);
    return;
  }

  const template = `
# ${articleUTM.title}

[文章内容...]

---

## 关于我们

智理科技专注于企业级AI应用开发，我们已为20+企业成功部署解决方案。

**服务内容**：
- 需求分析与技术选型
- POC快速验证（2周）
- 完整系统开发与部署
- 持续优化与运维支持

**联系我们**：
- 📧 邮箱: wuning@wanli.ai
- 🌐 官网: ${utmData.main_pages.homepage.juejin}
- 📝 技术博客: ${utmData.main_pages.blog.juejin}

欢迎访问我们的[官网](${utmData.main_pages.homepage.juejin})了解更多案例和服务！
`;

  const templatePath = path.join(__dirname, `juejin-ready/${articleSlug}-with-utm.md`);
  fs.writeFileSync(templatePath, template.trim());

  console.log(`✅ 掘金发布模板已生成: juejin-ready/${articleSlug}-with-utm.md`);
  console.log(`   包含UTM追踪链接，可直接用于掘金发布\n`);
}

// 主程序
console.log('🔗 生成UTM追踪链接...\n');

const utmData = generateUTMLinks();

console.log('\n📝 生成文章Markdown模板（带UTM）:');
console.log('   node utm-tracker.cjs template <article-slug>\n');

// 如果有命令行参数，生成模板
const args = process.argv.slice(2);
if (args[0] === 'template' && args[1]) {
  console.log('');
  generateJuejinTemplate(args[1]);
}
