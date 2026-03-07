import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  redirects: () => ([
    {
      source: '/articles',
      destination: '/search',
      permanent: true
    }
  ])
};

export default nextConfig;
