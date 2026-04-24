import type { NextConfig } from "next";

const repoName = "ARCH-408-Portfolio";
const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProduction ? `/${repoName}` : "",
  assetPrefix: isProduction ? `/${repoName}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isProduction ? `/${repoName}` : "",
  },
};

export default nextConfig;
