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
  "/articles",

  "/live",
  "/fixtures/epl",
  "/results",
  "/results/epl",
  "/standings/epl",
  "/top-scorers/epl",
  "/transfers",
];

/* =====================================================
   FOOTBALL ARTICLES
===================================================== */

const articleRoutes = [
  "/articles/how-football-points-work",
  "/articles/how-football-league-standings-work",
  "/articles/how-to-read-football-fixtures-and-match-results",
  "/articles/how-football-goal-difference-works",
  "/articles/what-is-a-clean-sheet-in-football",
  "/articles/what-is-a-football-fixture",
  "/articles/what-is-added-time-in-football",
  "/articles/what-is-a-hat-trick-in-football",
  "/articles/what-is-a-penalty-kick-in-football",
  "/articles/what-is-a-free-kick-in-football",
  "/articles/what-is-a-corner-kick-in-football",
  "/articles/what-is-offside-in-football",
  "/articles/what-is-a-goal-kick-in-football",
  "/articles/what-is-a-throw-in-in-football",
  "/articles/what-is-handball-in-football",
  "/articles/what-is-a-yellow-card-in-football",
  "/articles/what-is-a-red-card-in-football",
  "/articles/what-is-a-substitution-in-football",
  "/articles/what-is-a-football-formation",
  "/articles/what-is-extra-time-in-football",
];

/* =====================================================
   SITEMAP
===================================================== */

export default function sitemap() {
  const lastModified = new Date();

  return [
    ...staticRoutes,
    ...articleRoutes,
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
    changeFrequency: getChangeFrequency(route),
    priority: getPriority(route),
  }));
}

/* =====================================================
   CHANGE FREQUENCY
===================================================== */

function getChangeFrequency(route) {
  switch (route) {
    case "/":
      return "daily";

    case "/live":
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

    case "/articles":
      return "weekly";

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

    case "/live":
      return 0.9;

    case "/results":
    case "/results/epl":
      return 0.8;

    case "/standings/epl":
      return 0.8;

    case "/top-scorers/epl":
      return 0.8;

    case "/articles":
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
      return 0.7;
  }
}