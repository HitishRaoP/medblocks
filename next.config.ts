import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    '@electric-sql/pglite-react',
    '@electric-sql/pglite',
  ],
};

export default nextConfig;
