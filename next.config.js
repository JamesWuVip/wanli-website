const withNextIntl = require('next-intl/plugin')('./i18n/request.ts');

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

module.exports = withNextIntl(nextConfig)
