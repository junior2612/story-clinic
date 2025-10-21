// next.config.mjs
const nextConfig = {
  experimental: {
    serverActions: { allowedOrigins: ['*'] },
  },
  output: 'standalone',
  images: { unoptimized: true },
};

export default nextConfig;
