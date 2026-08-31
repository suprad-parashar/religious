import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
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
