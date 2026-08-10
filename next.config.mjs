/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.api-sports.io",
      },

      {
        protocol: "https",
        hostname: "media-4.api-sports.io",
      },

      {
        protocol: "https",
        hostname: "media-3.api-sports.io",
      },
    ],
  },
};

export default nextConfig;