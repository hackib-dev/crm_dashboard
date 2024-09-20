/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  reactStrictMode: true,
  eslint: {
    dirs: ["pages", "app", "components", "lib", "__tests__"],
  },
};

export default nextConfig;
