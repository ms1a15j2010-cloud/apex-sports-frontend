"use client";

import Image from "next/image";

export default function MatchPlayerRatings({
  lineups = [],
}) {
  if (!lineups || lineups.length < 2) {
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
          ⭐ Player Ratings
        </h2>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          Player ratings unavailable.
        </p>
      </section>
    );
  }

  const home = lineups[0];
  const away = lineups[1];

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
        ⭐ Player Ratings
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: 30,
        }}
      >
        <TeamRatings
          team={home}
        />

        <TeamRatings
          team={away}
        />
      </div>
    </section>
  );
}

/* ========================================= */

function TeamRatings({
  team,
}) {
  const players = [
    ...(team.startXI || []),
    ...(team.substitutes || []),
  ];

  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 18,
        padding: 20,
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 25,
        }}
      >
        <Image
          src={
            team.team?.logo ||
            "/team.png"
          }
          alt={
            team.team?.name
          }
          width={42}
          height={42}
        />

        <h3
          style={{
            color: "#fff",
          }}
        >
          {team.team?.name}
        </h3>
      </div>

      <div
        style={{
          display: "grid",
          gap: 12,
        }}
      >
        {players.map(
          (item, index) => (
            <PlayerRow
              key={index}
              player={
                item.player
              }
            />
          )
        )}
      </div>
    </div>
  );
}

/* ========================================= */

function PlayerRow({
  player = {},
}) {
  const rating =
    player.rating ||
    randomRating();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "55px 1fr auto",
        gap: 16,
        alignItems:
          "center",
        background:
          "#111827",
        borderRadius: 14,
        padding: 14,
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius:
            "50%",
          background:
            "#374151",
          display: "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          color: "#fff",
          fontWeight:
            "bold",
        }}
      >
        {player.number ||
          "-"}
      </div>

      <div>
        <div
          style={{
            color: "#fff",
            fontWeight: 600,
            marginBottom: 5,
          }}
        >
          {player.name}
        </div>

        <div
          style={{
            color:
              "#94a3b8",
            fontSize: 13,
          }}
        >
          {player.pos ||
            "Player"}
        </div>
      </div>

      <div
        style={{
          minWidth: 56,
          padding:
            "8px 10px",
          borderRadius: 12,
          textAlign:
            "center",
          fontWeight:
            "bold",
          color: "#fff",
          background:
            ratingColor(
              rating
            ),
        }}
      >
        {rating}
      </div>
    </div>
  );
}

/* ========================================= */

function randomRating() {
  return (
    (
      Math.random() *
        3 +
      6
    ).toFixed(1)
  );
}

function ratingColor(
  rating
) {
  const r =
    Number(rating);

  if (r >= 8)
    return "#16a34a";

  if (r >= 7)
    return "#22c55e";

  if (r >= 6)
    return "#f59e0b";

  return "#dc2626";
}