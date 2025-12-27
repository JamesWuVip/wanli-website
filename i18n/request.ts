import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

const locales = ['en', 'zh-CN', 'zh-TW'];

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale)) {
    locale = 'zh-CN';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
