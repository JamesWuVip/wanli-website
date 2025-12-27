/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://zhilitech.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
  alternateRefs: [
    {
      href: 'https://zhilitech.com/zh-CN',
      hreflang: 'zh-CN',
    },
    {
      href: 'https://zhilitech.com/zh-TW',
      hreflang: 'zh-TW',
    },
    {
      href: 'https://zhilitech.com/en',
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
