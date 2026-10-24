import type { NextConfig } from "next";

const config: NextConfig = {
  images: { unoptimized: true },
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  devIndicators: false,
};

export default config;
