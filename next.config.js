/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "allbeefhotdogs.corndocs.com",
      },
    ],
  },
};

module.exports = nextConfig;
