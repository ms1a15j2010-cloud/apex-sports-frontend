/** @type {import('next').NextConfig} */

const nextConfig = {
  outputFileTracingRoot: import.meta.dirname,

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

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://apex-sports-backend.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;