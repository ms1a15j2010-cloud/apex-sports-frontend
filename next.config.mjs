/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: import.meta.dirname,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://apexsportsbackendapi-mdfvpc2w.b4a.run/api/:path*",
      },
    ];
  },

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