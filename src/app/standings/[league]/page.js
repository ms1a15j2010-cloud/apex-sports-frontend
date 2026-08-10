import Image from "next/image";
import { notFound } from "next/navigation";
import { getLeagueId } from "../../../utils/leagueMap";

/* ============================================
   API
============================================ */

async function getStandings(league) {
  try {
    const leagueId = getLeagueId(league);

    if (!leagueId) {
      return {
        success: false,
        league: null,
        standings: [],
      };
    }

    const API =
      process.env.NEXT_PUBLIC_API_URL ||
      "http://127.0.0.1:5000";

    const res = await fetch(
      `${API}/api/league/${leagueId}/standings?season=2024`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Backend error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Error fetching standings:", err);

    return {
      success: false,
      league: null,
      standings: [],
      error: err.message,
    };
  }
}

/* ============================================
   SEO
============================================ */

export async function generateMetadata({ params }) {
  const { league } = await params;

  return {
    title: `${league.toUpperCase()} Standings | Apex Sports`,
    description: `${league} football standings`,
  };
}

/* ============================================
   PAGE
============================================ */

export default async function StandingsPage({ params }) {
  const { league } = await params;

  const data = await getStandings(league);

  if (!data.success || !data.standings?.length) {
    notFound();
  }

  const table = data.standings;

  /* ==========================================
     LEAGUE INFORMATION
  ========================================== */

  const leagueData = {
    name: "Premier League",
    country: "England",
    season: data.season || 2024,
    logo:
      "https://media.api-sports.io/football/leagues/39.png",
  };

  return (
    <main
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        padding: "20px",
        color: "white",
      }}
    >
      {/* ========================================
          LEAGUE HEADER
      ======================================== */}

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
              fontWeight: 700,
            }}
          >
            {leagueData.name}
          </h1>

          <p
            style={{
              color: "#94a3b8",
              margin: "6px 0",
            }}
          >
            {leagueData.country}
          </p>

          <p
            style={{
              color: "#22c55e",
              margin: 0,
              fontWeight: 600,
            }}
          >
            Season {leagueData.season}
          </p>
        </div>
      </div>

      {/* ========================================
          STANDINGS TABLE
      ======================================== */}

      <div
        style={{
          background: "#111827",
          borderRadius: 18,
          overflowX: "auto",
          overflowY: "hidden",
          width: "100%",
        }}
      >
        <table
          style={{
            width: "100%",
            minWidth: 700,
            borderCollapse: "collapse",
          }}
        >
          {/* ====================================
              TABLE HEADER
          ==================================== */}

          <thead
            style={{
              background: "#1e293b",
            }}
          >
            <tr>
              <th
                style={{
                  padding: "15px 12px",
                  textAlign: "center",
                }}
              >
                #
              </th>

              <th
                style={{
                  padding: "15px 12px",
                  textAlign: "left",
                }}
              >
                Club
              </th>

              <th
                style={{
                  padding: "15px 12px",
                  textAlign: "center",
                }}
              >
                P
              </th>

              <th
                style={{
                  padding: "15px 12px",
                  textAlign: "center",
                }}
              >
                W
              </th>

              <th
                style={{
                  padding: "15px 12px",
                  textAlign: "center",
                }}
              >
                D
              </th>

              <th
                style={{
                  padding: "15px 12px",
                  textAlign: "center",
                }}
              >
                L
              </th>

              <th
                style={{
                  padding: "15px 12px",
                  textAlign: "center",
                }}
              >
                GF
              </th>

              <th
                style={{
                  padding: "15px 12px",
                  textAlign: "center",
                }}
              >
                GA
              </th>

              <th
                style={{
                  padding: "15px 12px",
                  textAlign: "center",
                }}
              >
                GD
              </th>

              <th
                style={{
                  padding: "15px 12px",
                  textAlign: "center",
                }}
              >
                Pts
              </th>
            </tr>
          </thead>

          {/* ====================================
              TABLE BODY
          ==================================== */}

          <tbody>
            {table.map((team) => (
              <tr
                key={`${team.team?.id}-${team.rank}`}
                style={{
                  borderBottom:
                    "1px solid #1e293b",
                }}
              >
                {/* POSITION */}

                <td
                  style={{
                    padding: "14px 12px",
                    textAlign: "center",
                    fontWeight: 600,
                  }}
                >
                  {team.rank}
                </td>

                {/* CLUB */}

                <td
                  style={{
                    padding: "14px 12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <Image
                      src={team.team?.logo}
                      alt={team.team?.name || "Team"}
                      width={32}
                      height={32}
                      unoptimized
                    />

                    <strong>
                      {team.team?.name || "Unknown Team"}
                    </strong>
                  </div>
                </td>

                {/* PLAYED */}

                <td
                  style={{
                    padding: "14px 12px",
                    textAlign: "center",
                  }}
                >
                  {team.all?.played ?? 0}
                </td>

                {/* WINS */}

                <td
                  style={{
                    padding: "14px 12px",
                    textAlign: "center",
                  }}
                >
                  {team.all?.win ?? 0}
                </td>

                {/* DRAWS */}

                <td
                  style={{
                    padding: "14px 12px",
                    textAlign: "center",
                  }}
                >
                  {team.all?.draw ?? 0}
                </td>

                {/* LOSSES */}

                <td
                  style={{
                    padding: "14px 12px",
                    textAlign: "center",
                  }}
                >
                  {team.all?.lose ?? 0}
                </td>

                {/* GOALS FOR */}

                <td
                  style={{
                    padding: "14px 12px",
                    textAlign: "center",
                  }}
                >
                  {team.all?.goals?.for ?? 0}
                </td>

                {/* GOALS AGAINST */}

                <td
                  style={{
                    padding: "14px 12px",
                    textAlign: "center",
                  }}
                >
                  {team.all?.goals?.against ?? 0}
                </td>

                {/* GOAL DIFFERENCE */}

                <td
                  style={{
                    padding: "14px 12px",
                    textAlign: "center",
                  }}
                >
                  {team.goalsDiff ?? 0}
                </td>

                {/* POINTS */}

                <td
                  style={{
                    padding: "14px 12px",
                    textAlign: "center",
                    color: "#22c55e",
                    fontWeight: 700,
                  }}
                >
                  {team.points ?? 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}