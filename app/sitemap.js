export default async function sitemap() {
  const baseUrl = "https://yourdomain.com";

  const staticRoutes = [
    "",
    "/league/epl",
  ];

  const matchIds = [1, 2]; // Replace with real DB fetch later

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
