const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/data",
        headers: [
          {
            key: "Vary",
            value: "X-Vercel-IP-Country",
          },
          {
            key: "Cache-Control",
            value: "s-maxage=3600",
          },
        ],
      },
    ];
  },
};

export default nextConfig;