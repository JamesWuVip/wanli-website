'use client';

import {useTranslations} from 'next-intl';

export default function Testimonials() {
  const t = useTranslations('testimonials');

  const testimonials = [
    {key: 'testimonial1', rating: 5},
    {key: 'testimonial2', rating: 5},
    {key: 'testimonial3', rating: 5},
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">{t('title')}</h2>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.key}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative"
            >
              {/* 引号装饰 */}
              <div className="absolute top-4 right-4 text-6xl text-primary-100">
                "
              </div>

              {/* 评分 */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>

              {/* 评价内容 */}
              <p className="text-gray-700 mb-6 leading-relaxed relative z-10">
                "{t(`${testimonial.key}.content`)}"
              </p>

              {/* 客户信息 */}
              <div className="flex items-center gap-4 border-t pt-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {t(`${testimonial.key}.name`).charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-800">
                    {t(`${testimonial.key}.name`)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t(`${testimonial.key}.position`)} - {t(`${testimonial.key}.company`)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
