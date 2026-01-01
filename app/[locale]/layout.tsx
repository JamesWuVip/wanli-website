import {notFound} from 'next/navigation';
import {getTranslations, getMessages} from 'next-intl/server';
import {NextIntlClientProvider} from 'next-intl';
import '@/app/globals.css';

type Props = {
  params: {locale: string};
};

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh-CN'}, {locale: 'zh-TW'}];
}

export async function generateMetadata({params: {locale}}: Props) {
  const t = await getTranslations({locale, namespace: 'hero'});
  const baseUrl = 'https://zhili.wanli.ai';

  return {
    title: `${t('title')} - ${t('subtitle')}`,
    description: t('description'),
    keywords: 'AI应用开发,企业管理系统,技术外包,网站开发,移动应用,北京技术团队',
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'zh-CN': `${baseUrl}/zh-CN`,
        'zh-TW': `${baseUrl}/zh-TW`,
        'en': `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const locales = ['en', 'zh-CN', 'zh-TW'];

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta name="baidu-site-verification" content="codeva-zhili" />
        <meta name="google-site-verification" content="google-zhili" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
