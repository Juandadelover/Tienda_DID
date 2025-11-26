import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization for Supabase Storage
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.in',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
    // Optimize images
    formats: ['image/avif', 'image/webp'],
  },
  
  // Production optimizations
  poweredByHeader: false,
  
  // Compress responses
  compress: true,
  
  // Strict mode for React
  reactStrictMode: true,
};

export default nextConfig;
