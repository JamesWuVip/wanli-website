'use client';

import {useTranslations} from 'next-intl';

export default function TrustIndicators() {
  const t = useTranslations('trust');

  const stats = [
    {key: 'projects', number: '100+', icon: '📊'},
    {key: 'clients', number: '50+', icon: '🤝'},
    {key: 'satisfaction', number: '98%', icon: '⭐'},
    {key: 'experience', number: '10+', icon: '🏆'},
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-blue-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4">{t('title')}</h2>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>

        {/* 数据展示 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.key}
              className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {t(`stats.${stat.key}`)}
              </div>
            </div>
          ))}
        </div>

        {/* 成功案例 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['case1', 'case2', 'case3'].map((caseKey, index) => (
            <div
              key={caseKey}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                {t(`cases.${caseKey}.icon`)}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {t(`cases.${caseKey}.title`)}
              </h3>
              <p className="text-gray-600 mb-4">
                {t(`cases.${caseKey}.description`)}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-primary-600 font-semibold">
                  {t(`cases.${caseKey}.industry`)}
                </span>
                <span className="text-green-600 font-semibold">
                  ✓ {t(`cases.${caseKey}.result`)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
