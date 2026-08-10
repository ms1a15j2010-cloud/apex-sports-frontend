import Image from "next/image";
import Link from "next/link";

export default function TeamFixtures({
  fixtures = [],
}) {
  if (!fixtures.length) return null;

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
      }}
    >
      <h2
        style={{
          color: "#fff",
          marginBottom: 25,
        }}
      >
        📅 Upcoming Fixtures
      </h2>

      <div
        style={{
          display: "grid",
          gap: 18,
        }}
      >
        {fixtures.map((match) => {
          const fixture =
            match.fixture || {};

          const league =
            match.league || {};

          const home =
            match.teams?.home || {};

          const away =
            match.teams?.away || {};

          return (
            <Link
              key={fixture.id}
              href={`/match/${fixture.id}`}
              style={{
                textDecoration: "none",
                color: "#fff",
              }}
            >
              <div
                style={{
                  background: "#1f2937",
                  borderRadius: 16,
                  padding: 22,
                  transition: ".25s",
                }}
              >
                {/* League */}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 18,
                  }}
                >
                  <Image
                    src={
                      league.logo ||
                      "/league.png"
                    }
                    alt={
                      league.name ||
                      "League"
                    }
                    width={24}
                    height={24}
                  />

                  <span
                    style={{
                      color: "#94a3b8",
                    }}
                  >
                    {league.name}
                  </span>
                </div>

                {/* Teams */}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "1fr auto 1fr",
                    alignItems:
                      "center",
                    gap: 15,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: 12,
                    }}
                  >
                    <Image
                      src={
                        home.logo ||
                        "/team.png"
                      }
                      alt={
                        home.name
                      }
                      width={40}
                      height={40}
                    />

                    <strong>
                      {home.name}
                    </strong>
                  </div>

                  <div
                    style={{
                      textAlign:
                        "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight:
                          "bold",
                      }}
                    >
                      VS
                    </div>

                    <div
                      style={{
                        color:
                          "#94a3b8",
                        marginTop: 5,
                        fontSize: 13,
                      }}
                    >
                      {fixture.date
                        ? new Date(
                            fixture.date
                          ).toLocaleString()
                        : "-"}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "flex-end",
                      alignItems:
                        "center",
                      gap: 12,
                    }}
                  >
                    <strong>
                      {away.name}
                    </strong>

                    <Image
                      src={
                        away.logo ||
                        "/team.png"
                      }
                      alt={
                        away.name
                      }
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}