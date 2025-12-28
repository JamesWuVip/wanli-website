import withNextIntl from 'next-intl/plugin';

const withNextIntlConfig = withNextIntl('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/zh-CN',
        permanent: false,
      },
    ]
  },
}

export default withNextIntlConfig(nextConfig);
