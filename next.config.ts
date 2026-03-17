import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  cacheLife: {
    'breaking-news': {
      stale: 60 * 15, // 15 minutes,
      revalidate: 60 * 60, // 1 hour
      expire: 60 * 60 * 24, // 1 day
    },
    'featured-articles': {
      stale: 60 * 60 * 12, // 12 hours
      revalidate: 60 * 60 * 24 * 2, // 2 days
      expire: 60 * 60 * 24 * 7, // 1 week
    },
    'article': {
      stale: 60 * 60 * 24, // 1 day
      revalidate: 60 * 60 * 24 * 7, // 1 week
      expire: 60 * 60 * 24 * 30, // 1 month
    },
    'categories': {
      stale: 60 * 60 * 24 * 7, // 1 week
      revalidate: 60 * 60 * 24 * 30, // 30 days
      expire: 60 * 60 * 24 * 365, // 365 days
    },
    'search-results': {
      stale: 60 * 15, // 15 minutes
      revalidate: 60 * 60, // 1 hour
      expire: 60 * 60 * 6, // 6 hours
    }
  },
  redirects: () => ([
    {
      source: '/articles',
      destination: '/search',
      permanent: true
    }
  ]),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  }
};

export default nextConfig;
