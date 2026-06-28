export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://apex-sports-frontend.vercel.app/sitemap.xml",
  };
}