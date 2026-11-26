/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['next-intl'],
  allowedDevOrigins: ['127.0.0.1'],
  async rewrites() {
    return [
      { source: '/travel-wrapped', destination: '/travel-wrapped/index.html' },
      { source: '/travel-wrapped/privacy', destination: '/travel-wrapped/privacy.html' },
      { source: '/travel-wrapped/support', destination: '/travel-wrapped/support.html' },
    ];
  },
};

export default nextConfig;
