import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL.replace('/api/proxy', '')}/:path*`,
      },
    ];
  },
};

export default nextConfig;
