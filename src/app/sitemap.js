/* =====================================================
   APEX SPORTS - SITEMAP
===================================================== */

const BASE_URL =
  "https://apex-sports-frontend.vercel.app";

/* =====================================================
   STATIC PUBLIC ROUTES
===================================================== */

const staticRoutes = [
  "/",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/fixtures/epl",
  "/results",
  "/results/epl",
  "/standings/epl",
  "/top-scorers/epl",
  "/transfers",
];

/* =====================================================
   SITEMAP
===================================================== */

export default function sitemap() {
  const lastModified =
    new Date();

  return staticRoutes.map(
    (route) => ({
      url: `${BASE_URL}${route}`,
      lastModified,
      changeFrequency:
        getChangeFrequency(route),
      priority:
        getPriority(route),
    })
  );
}

/* =====================================================
   CHANGE FREQUENCY
===================================================== */

function getChangeFrequency(route) {
  switch (route) {
    case "/":
      return "daily";

    case "/fixtures/epl":
      return "hourly";

    case "/results":
    case "/results/epl":
      return "hourly";

    case "/standings/epl":
      return "daily";

    case "/top-scorers/epl":
      return "daily";

    case "/transfers":
      return "daily";

    case "/about":
    case "/contact":
    case "/privacy-policy":
    case "/terms":
      return "monthly";

    default:
      return "weekly";
  }
}

/* =====================================================
   PRIORITY
===================================================== */

function getPriority(route) {
  switch (route) {
    case "/":
      return 1.0;

    case "/fixtures/epl":
      return 0.9;

    case "/results":
    case "/results/epl":
      return 0.8;

    case "/standings/epl":
      return 0.8;

    case "/top-scorers/epl":
      return 0.8;

    case "/transfers":
      return 0.7;

    case "/about":
    case "/contact":
      return 0.5;

    case "/privacy-policy":
    case "/terms":
      return 0.3;

    default:
      return 0.5;
  }
}