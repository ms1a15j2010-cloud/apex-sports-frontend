export default async function sitemap() {
  const baseUrl = "https://apex-sports-frontend.vercel.app";

  const staticRoutes = [
    "",
    "/league/epl",
  ];

  const matchIds = [1, 2]; // later you can fetch from backend

  const matchRoutes = matchIds.map((id) => ({
    url: `${baseUrl}/match/${id}`,
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...matchRoutes,
  ];
}