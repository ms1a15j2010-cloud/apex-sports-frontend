import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Top Assists | Apex Sports",
  description:
    "Top football assist providers from Premier League, Champions League, La Liga and more.",
};

async function getTopAssists() {
  const res = await fetch(
    "http://localhost:5000/api/top-assists",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function TopAssistsPage() {
  const data = await getTopAssists();

  const players = data.success
    ? data.players
    : [];

  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
        color: "white",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        🎯 Top Assists
      </h1>

      {players.length === 0 ? (
        <div
          style={{
            background: "#111827",
            padding: 30,
            borderRadius: 16,
            textAlign: "center",
          }}
        >
          No assist data available.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 20,
          }}
        >
          {players.map((player, index) => (
            <Link
              key={player.player.id}
              href={`/player/${player.player.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  background: "#111827",
                  borderRadius: 16,
                  padding: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* Rank */}

                <div
                  style={{
                    width: 60,
                    textAlign: "center",
                    fontSize: 28,
                    fontWeight: "bold",
                    color: "#3b82f6",
                  }}
                >
                  #{index + 1}
                </div>

                {/* Player */}

                <div
                  style={{
                    width: "35%",
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                  }}
                >
                  <Image
                    src={player.player.photo}
                    alt={player.player.name}
                    width={70}
                    height={70}
                    style={{
                      borderRadius: "50%",
                    }}
                  />

                  <div>
                    <h3
                      style={{
                        margin: 0,
                      }}
                    >
                      {player.player.name}
                    </h3>

                    <p
                      style={{
                        color: "#9ca3af",
                        marginTop: 5,
                      }}
                    >
                      {player.player.age} Years
                    </p>
                  </div>
                </div>

                {/* Team */}

                <div
                  style={{
                    width: "20%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <Image
                    src={player.statistics[0].team.logo}
                    alt={player.statistics[0].team.name}
                    width={40}
                    height={40}
                  />

                  <strong>
                    {player.statistics[0].team.name}
                  </strong>
                </div>

                {/* Assists */}

                <div
                  style={{
                    width: "10%",
                    textAlign: "center",
                  }}
                >
                  <h2
                    style={{
                      color: "#3b82f6",
                    }}
                  >
                    {player.statistics[0].goals.assists ?? 0}
                  </h2>

                  <small>Assists</small>
                </div>

                {/* Goals */}

                <div
                  style={{
                    width: "10%",
                    textAlign: "center",
                  }}
                >
                  <h2>
                    {player.statistics[0].goals.total ?? 0}
                  </h2>

                  <small>Goals</small>
                </div>

                {/* Matches */}

                <div
                  style={{
                    width: "10%",
                    textAlign: "center",
                  }}
                >
                  <h2>
                    {player.statistics[0].games.appearences ?? 0}
                  </h2>

                  <small>Matches</small>
                </div>

                {/* Minutes */}

                <div
                  style={{
                    width: "10%",
                    textAlign: "center",
                  }}
                >
                  <h2>
                    {player.statistics[0].games.minutes ?? 0}
                  </h2>

                  <small>Minutes</small>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}