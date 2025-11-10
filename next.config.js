// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.cache = false;
    }
    return config;
  },
  devIndicators: {
    buildActivity: false,
  },
  experimental: {
    // Désactive les devtools problématiques
    devOverlays: false,
  },
};

export default nextConfig;