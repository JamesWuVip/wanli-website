'use client';

import {useTranslations} from 'next-intl';

export default function Process() {
  const t = useTranslations('process');

  const steps = [
    {key: 'step1', icon: '💬'},
    {key: 'step2', icon: '📋'},
    {key: 'step3', icon: '⚙️'},
    {key: 'step4', icon: '✅'},
    {key: 'step5', icon: '🔧'},
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">{t('title')}</h2>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>
        <div className="relative">
          {/* Desktop Timeline */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-600 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {steps.map((step, index) => (
              <div key={step.key} className="relative">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-primary-100">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-3xl mb-4 shadow-lg">
                      {step.icon}
                    </div>
                    <div className="text-primary-600 font-bold text-sm mb-2">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-800">
                      {t(`${step.key}.title`)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t(`${step.key}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
