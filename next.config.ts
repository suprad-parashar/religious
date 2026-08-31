import path from "path";
import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@ishubhamx/panchangam-js"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "astronomy-engine": path.resolve("node_modules/astronomy-engine"),
    };
    return config;
  },
};

export default nextConfig;
