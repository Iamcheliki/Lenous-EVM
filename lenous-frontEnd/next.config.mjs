/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.moralis.io",
      "coin-images.coingecko.com",
      "cryptologos.cc",
      "localhost:3003",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  output: "export",

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

export default nextConfig;
