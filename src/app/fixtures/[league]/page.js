import Link from "next/link";
import Image from "next/image";

/* ============================================
API
============================================ */

async function getFixtures(league) {
  try {
    const API =
      process.env.NEXT_PUBLIC_API_URL ||
      "http://127.0.0.1:5000";

    const res = await fetch(
      `${API}/api/fixtures/${league}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Backend unavailable");
    }

    return await res.json();
  } catch (err) {
    console.error(err);

    return {
      success: false,
      league: null,
      fixtures: [],
    };
  }
}

/* ============================================
SEO
============================================ */

export async function generateMetadata({ params }) {
  const { league } = await params;

  return {
    title: `${league.toUpperCase()} Fixtures | Apex Sports`,
    description: `${league} upcoming fixtures`,
  };
}

/* ============================================
PAGE
============================================ */

export default async function FixturesPage({ params }) {
  const { league } = await params;

  const data = await getFixtures(league);

  if (!data.success) {
    return (
      <main
        style={{
          maxWidth: 1200,
          margin: "40px auto",
          color: "white",
          textAlign: "center",
        }}
      >
        Fixtures Not Available
      </main>
    );
  }

  const fixtures = data.fixtures || [];

  // Use league information directly from backend
  const leagueData = data.league;

  if (!leagueData) {
    return (
      <main
        style={{
          maxWidth: 1200,
          margin: "40px auto",
          color: "white",
          textAlign: "center",
        }}
      >
        League Information Not Available
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        padding: 20,
        color: "white",
      }}
    >
      {/* League Header */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          background: "#111827",
          borderRadius: 18,
          padding: 25,
          marginBottom: 30,
        }}
      >
        <Image
          src={leagueData.logo}
          alt={leagueData.name}
          width={70}
          height={70}
          unoptimized
        />

        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 34,
            }}
          >
            {leagueData.name}
          </h1>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            {leagueData.country}
          </p>

          <p
            style={{
              color: "#22c55e",
            }}
          >
            Season {leagueData.season}
          </p>
        </div>
      </div>

      {/* Fixtures */}

      <div
        style={{
          display: "grid",
          gap: 18,
        }}
      >
        {fixtures.map((match) => (
          <Link
            key={match.fixture.id}
            href={`/match/${match.fixture.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                background: "#111827",
                borderRadius: 18,
                padding: 22,
                border: "1px solid #1e293b",
              }}
            >
              {/* Date */}

              <div
                style={{
                  textAlign: "center",
                  color: "#94a3b8",
                  marginBottom: 18,
                }}
              >
                {new Date(
                  match.fixture.date
                ).toLocaleString()}
              </div>

              {/* Teams */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto 1fr",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                {/* Home */}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 15,
                  }}
                >
                  <Image
                    src={match.home.logo}
                    alt={match.home.name}
                    width={55}
                    height={55}
                    unoptimized
                  />

                  <strong>{match.home.name}</strong>
                </div>

                {/* Status */}

                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                    }}
                  >
                    VS
                  </h2>

                  <div
                    style={{
                      marginTop: 10,
                      color: "#22c55e",
                      fontWeight: "bold",
                    }}
                  >
                    {match.status.short}
                  </div>
                </div>

                {/* Away */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 15,
                  }}
                >
                  <strong>{match.away.name}</strong>

                  <Image
                    src={match.away.logo}
                    alt={match.away.name}
                    width={55}
                    height={55}
                    unoptimized
                  />
                </div>
              </div>

              {/* Venue */}

              <div
                style={{
                  marginTop: 20,
                  textAlign: "center",
                  color: "#94a3b8",
                }}
              >
                🏟{" "}
                {match.fixture.venue?.name || "Venue TBD"}
                {" • "}
                {match.fixture.venue?.city || "City TBD"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}