'use client';

import {useTranslations} from 'next-intl';
import {useState} from 'react';
import {useParams} from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
  const t = useTranslations('nav');
  const params = useParams();
  const locale = params.locale as string;
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {href: `/${locale}#home`, label: t('home')},
    {href: `/${locale}#services`, label: t('services')},
    {href: `/${locale}#about`, label: t('about')},
    {href: `/${locale}#contact`, label: t('contact')},
  ];

  const languages = [
    {code: 'zh-CN', label: '简体'},
    {code: 'zh-TW', label: '繁體'},
    {code: 'en', label: 'EN'},
  ];

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <Link href={`/${locale}`} className="text-2xl font-bold text-gradient">
            智理科技
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex space-x-2">
              {languages.map((lang) => (
                <Link
                  key={lang.code}
                  href={`/${lang.code}`}
                  className={`px-2 py-1 rounded ${
                    locale === lang.code
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {lang.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-700 hover:text-primary-600"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex space-x-2 mt-4">
              {languages.map((lang) => (
                <Link
                  key={lang.code}
                  href={`/${lang.code}`}
                  className={`px-3 py-1 rounded ${
                    locale === lang.code
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {lang.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
