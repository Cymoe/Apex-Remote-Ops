import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['pxagrvoggbkhorhwmhoh.supabase.co'],
    formats: ['image/avif', 'image/webp'],
  },
  // experimental: {
  //   optimizeCss: true,
  // },
  serverExternalPackages: ['@react-pdf/renderer'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
