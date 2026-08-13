import type { NextConfig } from "next";

const basePath = process.env.PAGES_BASE_PATH || "";
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: isStaticExport ? "export" : undefined,
  basePath: isStaticExport ? basePath : undefined,
  assetPrefix: isStaticExport && basePath ? basePath : undefined,
  images: {
    unoptimized: isStaticExport
  }
};

export default nextConfig;
