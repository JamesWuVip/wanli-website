'use client';

import {useTranslations} from 'next-intl';

export default function Advantages() {
  const t = useTranslations('advantages');

  const advantages = [
    {
      key: 'expertTeam',
      icon: '👥',
    },
    {
      key: 'aiExpertise',
      icon: '🤖',
    },
    {
      key: 'highQuality',
      icon: '⚡',
    },
    {
      key: 'fullStack',
      icon: '🔧',
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">{t('title')}</h2>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={advantage.key}
              className="text-center p-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border border-gray-100"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="text-6xl mb-4">{advantage.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                {t(`${advantage.key}.title`)}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(`${advantage.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
