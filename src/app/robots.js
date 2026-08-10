/* =====================================================
   APEX SPORTS - ROBOTS
===================================================== */

export default function robots() {
  const baseUrl =
    "https://apex-sports-frontend.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}