'use client';

import {useTranslations} from 'next-intl';
import {useParams} from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');
  const params = useParams();
  const locale = params.locale as string;

  const quickLinks = [
    {href: `/${locale}#home`, label: t('quickLinks')},
    {href: `/${locale}#services`, label: useTranslations('nav')('services')},
    {href: `/${locale}#about`, label: useTranslations('nav')('about')},
    {href: `/${locale}#contact`, label: useTranslations('nav')('contact')},
  ];

  return (
    <footer id="about" className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 text-gradient">
              智理科技
            </h3>
            <p className="text-xl font-semibold text-gray-400 mb-4">
              {t('company')}
            </p>
            <p className="text-gray-400 leading-relaxed">
              {t('aboutText')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2">
              {quickLinks.slice(1).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {t('contact')}
            </h4>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-400">{t('email')}</p>
                <a
                  href="mailto:wuning@wanli.ai"
                  className="hover:text-primary-400 transition-colors"
                >
                  wuning@wanli.ai
                </a>
              </div>
              <div>
                <p className="font-semibold text-gray-400">{t('phone')}</p>
                <a
                  href="tel:+8613811796300"
                  className="hover:text-primary-400 transition-colors"
                >
                  138-1179-6300
                </a>
              </div>
              <div>
                <p className="font-semibold text-gray-400">{t('address')}</p>
                <p>{t('addressText')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>
            © {new Date().getFullYear()} {t('company')}. {t('rights')}.
          </p>
          <p className="mt-2 text-sm">
            京ICP备XXXXXXXX号-1
          </p>
        </div>
      </div>
    </footer>
  );
}
