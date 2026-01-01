/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://zhili.wanli.ai',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*', '/robots.txt', '/sitemap.xml', '/sitemap-*.xml'],
  alternateRefs: [
    {
      href: 'https://zhili.wanli.ai/zh-CN',
      hreflang: 'zh-CN',
    },
    {
      href: 'https://zhili.wanli.ai/zh-TW',
      hreflang: 'zh-TW',
    },
    {
      href: 'https://zhili.wanli.ai/en',
      hreflang: 'en',
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
  },
}
