import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@narpisa/config", "@narpisa/types", "@narpisa/ui"],
};

export default nextConfig;
