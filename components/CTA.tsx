'use client';

import {useTranslations} from 'next-intl';

export default function CTA() {
  const t = useTranslations('cta');

  return (
    <section id="contact" className="section-padding bg-gradient-to-r from-primary-600 to-blue-600">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="heading-lg mb-6">{t('title')}</h2>
          <p className="text-xl mb-8 opacity-90">{t('subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:wuning@wanli.ai"
              className="px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all shadow-xl"
            >
              📧 wuning@wanli.ai
            </a>
            <a
              href="tel:+8613811796300"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-lg font-semibold hover:bg-white/20 transform hover:scale-105 transition-all"
            >
              📱 138-1179-6300
            </a>
          </div>
          <div className="mt-12 pt-12 border-t border-white/20">
            <p className="text-lg mb-4">或添加微信咨询</p>
            <div className="inline-block bg-white p-4 rounded-lg">
              <div className="w-48 h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                二维码位置
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
