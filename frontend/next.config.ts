import type { NextConfig } from "next";

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!apiBase) {
  throw new Error("Missing NEXT_PUBLIC_API_BASE_URL env variable");
}

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: `${apiBase.replace(/\/api\/proxy$/, "")}/:path*`,
      },
    ];
  },
};

export default nextConfig;
