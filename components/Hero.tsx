'use client';

import {useTranslations} from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section id="home" className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* 信任标签 */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
              ✓ {t('badges.experts')}
            </span>
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              ✓ {t('badges.ai')}
            </span>
            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
              ✓ {t('badges.fast')}
            </span>
          </div>

          <h1 className="heading-xl mb-6">
            <span className="text-gradient">{t('title')}</span>
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
            {t('subtitle')}
          </p>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            {t('description')}
          </p>

          {/* 社会证明 */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-10 text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🏆</span>
              <div className="text-left">
                <div className="text-2xl font-bold text-primary-600">100+</div>
                <div className="text-sm">{t('stats.projects')}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">⭐</span>
              <div className="text-left">
                <div className="text-2xl font-bold text-primary-600">98%</div>
                <div className="text-sm">{t('stats.satisfaction')}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">🤝</span>
              <div className="text-left">
                <div className="text-2xl font-bold text-primary-600">50+</div>
                <div className="text-sm">{t('stats.clients')}</div>
              </div>
            </div>
          </div>

          {/* CTA按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="#consultation"
              className="group px-10 py-5 bg-gradient-to-r from-primary-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:from-primary-700 hover:to-blue-700 transform hover:scale-105 transition-all shadow-2xl hover:shadow-3xl relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                🎁 {t('cta')}
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </a>
            <a
              href="tel:+8613811796300"
              className="px-10 py-5 bg-white text-primary-600 border-2 border-primary-600 rounded-xl font-bold text-lg hover:bg-primary-50 transform hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>📱</span> {t('callNow')}
            </a>
          </div>

          {/* 紧迫感提示 */}
          <p className="text-sm text-gray-500 animate-pulse">
            💡 {t('urgency')}
          </p>
        </div>
      </div>
    </section>
  );
}
