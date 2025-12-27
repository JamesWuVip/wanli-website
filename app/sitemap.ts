import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zhilitech.com'
  const locales = ['zh-CN', 'zh-TW', 'en']

  const routes = locales.flatMap(locale => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
      alternates: {
        languages: {
          'zh-CN': `${baseUrl}/zh-CN`,
          'zh-TW': `${baseUrl}/zh-TW`,
          'en': `${baseUrl}/en`,
        }
      }
    },
  ])

  return routes
}
