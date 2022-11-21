/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'tailwindui.com',
      'images.unsplash.com',
      'naszsklep-api.vercel.app',
      'media.graphassets.com',
    ],
  },
};

module.exports = nextConfig;
