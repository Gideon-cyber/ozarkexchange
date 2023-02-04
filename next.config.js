/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cryptochanger.to"],
  },
};

module.exports = nextConfig;
