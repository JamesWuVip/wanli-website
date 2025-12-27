'use client';

import {useTranslations} from 'next-intl';

export default function Services() {
  const t = useTranslations('services');

  const services = [
    {key: 'aiDevelopment', icon: '🧠', gradient: 'from-purple-500 to-pink-500'},
    {key: 'enterpriseApp', icon: '💼', gradient: 'from-blue-500 to-cyan-500'},
    {key: 'webDevelopment', icon: '🌐', gradient: 'from-green-500 to-teal-500'},
    {key: 'mobileApp', icon: '📱', gradient: 'from-orange-500 to-red-500'},
    {key: 'consulting', icon: '💡', gradient: 'from-yellow-500 to-orange-500'},
    {key: 'cloudService', icon: '☁️', gradient: 'from-indigo-500 to-purple-500'},
  ];

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">{t('title')}</h2>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.key}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-10 rounded-bl-full`}></div>
              <div className="relative">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                  {t(`${service.key}.title`)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(`${service.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
