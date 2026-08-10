"use client";

import Image from "next/image";
import Link from "next/link";

export default function MatchHeadToHead({
  h2h = [],
}) {
  if (!h2h || h2h.length === 0) {
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
            marginBottom: 20,
          }}
        >
          🤝 Head to Head
        </h2>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          No previous meetings found.
        </p>
      </section>
    );
  }

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
          marginBottom: 30,
        }}
      >
        🤝 Head to Head
      </h2>

      <div
        style={{
          display: "grid",
          gap: 18,
        }}
      >
        {h2h.map((match) => (
          <HeadToHeadCard
            key={match.fixture?.id}
            match={match}
          />
        ))}
      </div>
    </section>
  );
}

/* ===================================== */

function HeadToHeadCard({
  match,
}) {
  const fixture =
    match.fixture || {};

  const league =
    match.league || {};

  const home =
    match.teams?.home || {};

  const away =
    match.teams?.away || {};

  const goals =
    match.goals || {};

  return (
    <Link
      href={`/match/${fixture.id}`}
      style={{
        textDecoration: "none",
      }}
    >
      <div
        style={{
          background: "#1f2937",
          borderRadius: 18,
          padding: 20,
          transition:
            ".25s",
        }}
      >
        {/* Top */}

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: 18,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div
            style={{
              color: "#94a3b8",
            }}
          >
            {league.name}
          </div>

          <div
            style={{
              color: "#94a3b8",
            }}
          >
            {fixture.date
              ? new Date(
                  fixture.date
                ).toLocaleDateString()
              : "-"}
          </div>
        </div>

        {/* Teams */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr auto 1fr",
            alignItems:
              "center",
            gap: 20,
          }}
        >
          {/* Home */}

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
              width={42}
              height={42}
            />

            <strong
              style={{
                color: "#fff",
              }}
            >
              {home.name}
            </strong>
          </div>

          {/* Score */}

          <div
            style={{
              textAlign:
                "center",
            }}
          >
            <div
              style={{
                color: "#fff",
                fontSize: 28,
                fontWeight:
                  "bold",
              }}
            >
              {goals.home}
              {" - "}
              {goals.away}
            </div>

            <div
              style={{
                marginTop: 6,
                color:
                  "#22c55e",
                fontSize: 13,
              }}
            >
              {fixture.status
                ?.short}
            </div>
          </div>

          {/* Away */}

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
            <strong
              style={{
                color: "#fff",
              }}
            >
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
              width={42}
              height={42}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}