/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["images.unsplash.com", "placehold.co", "dumpsterduffs.com"],
  },
};

module.exports = nextConfig;
