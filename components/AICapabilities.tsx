'use client';

import {useTranslations} from 'next-intl';

export default function AICapabilities() {
  const t = useTranslations('aiCapabilities');

  const capabilities = [
    {
      key: 'chat',
      icon: '💬',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      key: 'document',
      icon: '📄',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      key: 'workflow',
      icon: '⚡',
      gradient: 'from-green-500 to-teal-500',
    },
    {
      key: 'insight',
      icon: '💡',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const techStack = [
    'OpenAI GPT-4',
    'Claude',
    'LangChain',
    'TensorFlow',
    'PyTorch',
    'Stable Diffusion',
    'Whisper',
    'Vector DB',
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-block bg-primary-500/20 text-primary-300 px-6 py-2 rounded-full font-semibold mb-4">
            🚀 {t('badge')}
          </div>
          <h2 className="heading-lg mb-4">{t('title')}</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* AI能力卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {capabilities.map((cap) => (
            <div
              key={cap.key}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${cap.gradient} rounded-xl flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                {cap.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">
                {t(`capabilities.${cap.key}.title`)}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {t(`capabilities.${cap.key}.description`)}
              </p>
            </div>
          ))}
        </div>

        {/* 技术栈展示 */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-center mb-8">
            {t('techStack')}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech) => (
              <div
                key={tech}
                className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 border border-white/20"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#consultation"
            className="inline-block px-10 py-4 bg-gradient-to-r from-primary-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:from-primary-600 hover:to-blue-600 transform hover:scale-105 transition-all shadow-2xl"
          >
            {t('cta')}
          </a>
        </div>
      </div>
    </section>
  );
}
