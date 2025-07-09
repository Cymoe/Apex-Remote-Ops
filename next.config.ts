import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['pxagrvoggbkhorhwmhoh.supabase.co', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // experimental: {
  //   optimizeCss: true,
  // },
  serverExternalPackages: ['@react-pdf/renderer', 'canvas'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias.canvas = false;
    }
    return config;
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
