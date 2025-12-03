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
    ],
    // Optimize images
    formats: ['image/avif', 'image/webp'],
    // Aumentar caché de imágenes optimizadas (1 semana)
    minimumCacheTTL: 604800,
    // Tamaños de imagen predefinidos para mejor caché
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  
  // Production optimizations
  poweredByHeader: false,
  
  // Compress responses
  compress: true,
  
  // Strict mode for React
  reactStrictMode: true,

  // Headers para caché del navegador
  async headers() {
    return [
      {
        // Caché para archivos estáticos (1 año)
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Caché para fuentes (1 año)
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
