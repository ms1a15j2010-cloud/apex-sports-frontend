import Image from "next/image";
import Link from "next/link";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:5000";

/* ============================================
   API
============================================ */

async function getTopScorers(league) {
  try {
    const res = await fetch(
      `${API}/api/league/${league}/topscorers`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(
        `Backend error: ${res.status}`
      );
    }

    const data = await res.json();

    console.log(
      "⚽ Top scorers response:",
      data
    );

    return data;
  } catch (err) {
    console.error(
      "TOP SCORERS FETCH ERROR:",
      err.message
    );

    return {
      success: false,
      message: "Unable to connect to backend.",
      players: [],
    };
  }
}

/* ============================================
   SEO
============================================ */

export async function generateMetadata({ params }) {
  const { league } = await params;

  return {
    title: `${league.toUpperCase()} Top Scorers | Apex Sports`,
    description: `Top scorers for ${league}`,
  };
}

/* ============================================
   PAGE
============================================ */

export default async function TopScorersPage({
  params,
}) {
  const { league } = await params;

  const data = await getTopScorers(league);

  /* ---------------------------------------------
     Safe player extraction
  --------------------------------------------- */

  const players = Array.isArray(data?.players)
    ? data.players
    : Array.isArray(data?.scorers)
    ? data.scorers
    : [];

  return (
    <main
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        padding: 20,
        color: "#fff",
      }}
    >
      {/* ============================================
          PAGE TITLE
      ============================================ */}

      <h1
        style={{
          textAlign: "center",
          marginBottom: 30,
        }}
      >
        ⚽ Top Scorers -{" "}
        {league.toUpperCase()}
      </h1>

      {/* ============================================
          EMPTY STATE
      ============================================ */}

      {!players.length ? (
        <div
          style={{
            background: "#111827",
            borderRadius: 15,
            padding: 40,
            textAlign: "center",
          }}
        >
          No top scorers available.
        </div>
      ) : (
        /* ============================================
           PLAYER LIST
        ============================================ */

        <div
          style={{
            display: "grid",
            gap: 18,
          }}
        >
          {players.map((player, index) => {
            /* ---------------------------------------
               API-Football statistics
            --------------------------------------- */

            const statistics =
              Array.isArray(player.statistics) &&
              player.statistics.length > 0
                ? player.statistics[0]
                : {};

            /* ---------------------------------------
               Safe player information
            --------------------------------------- */

            const playerId =
              player.id ??
              player.player?.id ??
              index;

            const playerName =
              player.name ??
              player.player?.name ??
              "Unknown Player";

            const playerPhoto =
              player.photo ??
              player.player?.photo ??
              null;

            const teamName =
              player.team?.name ??
              statistics.team?.name ??
              "Unknown Team";

            const teamLogo =
              player.team?.logo ??
              statistics.team?.logo ??
              null;

            /* ---------------------------------------
               Goals
            --------------------------------------- */

            const goals =
              player.goals ??
              statistics.goals?.total ??
              0;

            /* ---------------------------------------
               Assists
            --------------------------------------- */

            const assists =
              player.assists ??
              statistics.goals?.assists ??
              0;

            /* ---------------------------------------
               Appearances
            --------------------------------------- */

            const appearances =
              player.appearances ??
              statistics.games?.appearences ??
              0;

            return (
              <Link
                key={playerId}
                href={`/player/${playerId}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div
                  style={{
                    background: "#111827",
                    borderRadius: 18,
                    padding: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "space-between",
                    gap: 15,
                    border:
                      "1px solid #1e293b",
                  }}
                >
                  {/* =================================
                      RANK
                  ================================= */}

                  <div
                    style={{
                      width: 60,
                      textAlign: "center",
                      fontSize: 28,
                      fontWeight: "bold",
                      color: "#22c55e",
                      flexShrink: 0,
                    }}
                  >
                    #{index + 1}
                  </div>

                  {/* =================================
                      PLAYER
                  ================================= */}

                  <div
                    style={{
                      width: "35%",
                      display: "flex",
                      alignItems: "center",
                      gap: 20,
                      minWidth: 0,
                    }}
                  >
                    {playerPhoto && (
                      <Image
                        src={playerPhoto}
                        alt={playerName}
                        width={70}
                        height={70}
                        unoptimized
                        style={{
                          borderRadius: "50%",
                          objectFit:
                            "cover",
                          flexShrink: 0,
                        }}
                      />
                    )}

                    <div
                      style={{
                        minWidth: 0,
                      }}
                    >
                      <h3
                        style={{
                          margin: 0,
                          overflow: "hidden",
                          textOverflow:
                            "ellipsis",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {playerName}
                      </h3>
                    </div>
                  </div>

                  {/* =================================
                      TEAM
                  ================================= */}

                  <div
                    style={{
                      width: "20%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent:
                        "center",
                      gap: 10,
                      minWidth: 0,
                    }}
                  >
                    {teamLogo && (
                      <Image
                        src={teamLogo}
                        alt={teamName}
                        width={40}
                        height={40}
                        unoptimized
                      />
                    )}

                    <strong
                      style={{
                        overflow: "hidden",
                        textOverflow:
                          "ellipsis",
                        whiteSpace:
                          "nowrap",
                      }}
                    >
                      {teamName}
                    </strong>
                  </div>

                  {/* =================================
                      GOALS
                  ================================= */}

                  <div
                    style={{
                      width: "10%",
                      textAlign: "center",
                    }}
                  >
                    <h2
                      style={{
                        color: "#22c55e",
                        margin: 0,
                      }}
                    >
                      {goals}
                    </h2>

                    <small>Goals</small>
                  </div>

                  {/* =================================
                      ASSISTS
                  ================================= */}

                  <div
                    style={{
                      width: "10%",
                      textAlign: "center",
                    }}
                  >
                    <h2
                      style={{
                        margin: 0,
                      }}
                    >
                      {assists}
                    </h2>

                    <small>Assists</small>
                  </div>

                  {/* =================================
                      MATCHES
                  ================================= */}

                  <div
                    style={{
                      width: "10%",
                      textAlign: "center",
                    }}
                  >
                    <h2
                      style={{
                        margin: 0,
                      }}
                    >
                      {appearances}
                    </h2>

                    <small>Matches</small>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}