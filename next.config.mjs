/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix the multiple lockfiles warning - using import.meta.dirname instead
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
};

export default nextConfig;