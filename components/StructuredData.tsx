'use client';

export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '北京智理科技有限公司',
    alternateName: 'Zhili Technology',
    url: 'https://zhili.wanli.ai',
    logo: 'https://zhili.wanli.ai/logo.png',
    description: '专业的AI应用开发和企业级技术解决方案提供商',
    address: {
      '@type': 'PostalAddress',
      addressLocality: '北京',
      addressRegion: '北京市',
      addressCountry: 'CN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+86-10-XXXX-XXXX',
      contactType: 'customer service',
      availableLanguage: ['Chinese', 'English'],
    },
    sameAs: [
      'https://www.linkedin.com/company/zhilitech',
      'https://github.com/zhilitech',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '智理科技',
    url: 'https://zhili.wanli.ai',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://zhili.wanli.ai/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: '北京智理科技有限公司',
    image: 'https://zhili.wanli.ai/logo.png',
    '@id': 'https://zhili.wanli.ai',
    url: 'https://zhili.wanli.ai',
    telephone: '+86-10-XXXX-XXXX',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '海淀区',
      addressLocality: '北京',
      addressRegion: '北京市',
      addressCountry: 'CN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.9042,
      longitude: 116.4074,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '$$',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
