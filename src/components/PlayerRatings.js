"use client";

import Image from "next/image";

export default function PlayerRatings({
  players = [],
}) {
  if (!players || players.length === 0) {
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
          Player ratings are not available.
        </p>
      </section>
    );
  }

  const home =
    players[0] || {};

  const away =
    players[1] || {};

  const homePlayers =
    [...(home.players || [])].sort(
      (a, b) =>
        (b.statistics?.[0]?.games
          ?.rating || 0) -
        (a.statistics?.[0]?.games
          ?.rating || 0)
    );

  const awayPlayers =
    [...(away.players || [])].sort(
      (a, b) =>
        (b.statistics?.[0]?.games
          ?.rating || 0) -
        (a.statistics?.[0]?.games
          ?.rating || 0)
    );

  return (
    <section
      style={{
        background:
          "linear-gradient(180deg,#111827,#0f172a)",
        borderRadius: 22,
        padding: 30,
        marginBottom: 30,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: 28,
          flexWrap: "wrap",
          gap: 15,
        }}
      >
        <div>
          <div
            style={{
              color: "#22c55e",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform:
                "uppercase",
              marginBottom: 6,
            }}
          >
            Apex Sports
          </div>

          <h2
            style={{
              color: "#fff",
              margin: 0,
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            ⭐ Player Ratings
          </h2>
        </div>

        <div
          style={{
            padding:
              "8px 16px",
            borderRadius: 999,
            background:
              "rgba(34,197,94,.12)",
            color: "#22c55e",
            fontWeight: 700,
          }}
        >
          Match Performance
        </div>
      </div>

      <div
       className="ratings-grid"
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: 25,
        }}
      >
        <TeamRatings
          title={
            home.team?.name ||
            "Home"
          }
          logo={
            home.team?.logo
          }
          players={
            homePlayers
          }
        />

        <TeamRatings
          title={
            away.team?.name ||
            "Away"
          }
          logo={
            away.team?.logo
          }
          players={
            awayPlayers
          }
        />
      </div>
    </section>
  );
}

function TeamRatings({
  title,
  logo,
  players,
}) {
  return (
    <div
     className="ratings-team"
      style={{
        background: "#1f2937",
        borderRadius: 18,
        padding: 22,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 22,
        }}
      >
        <Image
          src={
            logo ||
            "/team.png"
          }
          alt={title}
          width={40}
          height={40}
          unoptimized
        />

        <h3
          style={{
            color: "#fff",
            margin: 0,
            fontSize: 22,
          }}
        >
          {title}
        </h3>
      </div>

      <div
        style={{
          display: "grid",
          gap: 16,
        }}
      >
        {players.map(
          (player, index) => (
            <PlayerCard
              key={
                player.player
                  ?.id ||
                index
              }
              player={
                player
              }
            />
          )
        )}
      </div>
    </div>
  );
}

function PlayerCard({
  player,
}) {
  const info =
    player.player || {};

  const stats =
    player.statistics?.[0] ||
    {};

  const rating =
    parseFloat(
      stats.games?.rating || 0
    );

  const goals =
    stats.goals?.total || 0;

  const assists =
    stats.goals?.assists || 0;

  const yellow =
    stats.cards?.yellow || 0;

  const red =
    stats.cards?.red || 0;

  const captain =
    stats.games?.captain;

  const substitute =
    stats.games?.substitute;

  const minutes =
    stats.games?.minutes || 0;

  const number =
    stats.games?.number || "-";

  const position =
    stats.games?.position || "-";

  const progress =
    Math.min(
      (rating / 10) * 100,
      100
    );

  return (
    <div
    className="rating-player-card"
      style={{
        background: "#111827",
        borderRadius: 16,
        padding: 18,
        display: "flex",
        alignItems: "center",
        gap: 16,
        transition:
          ".25s ease",
      }}
    >
      {/* Player Image */}

      <Image
        src={
          info.photo ||
          "/player.png"
        }
        alt={
          info.name ||
          "Player"
        }
        width={70}
        height={70}
        unoptimized
        style={{
          borderRadius: "50%",
          objectFit:
            "cover",
        }}
      />

      <div
       className="rating-player-info"
        style={{
          flex: 1,
        }}
      >
        {/* Name */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 6,
          }}
        >
          <strong
            style={{
              color: "#fff",
              fontSize: 17,
            }}
          >
            {info.name}
          </strong>

          {captain && (
            <span
              style={{
                background:
                  "#f59e0b",
                color: "#fff",
                padding:
                  "2px 7px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight:
                  "bold",
              }}
            >
              C
            </span>
          )}

          {substitute && (
            <span
              style={{
                background:
                  "#3b82f6",
                color: "#fff",
                padding:
                  "2px 7px",
                borderRadius: 20,
                fontSize: 11,
                fontWeight:
                  "bold",
              }}
            >
              SUB
            </span>
          )}
        </div>

        {/* Position */}

        <div
          style={{
            color: "#94a3b8",
            fontSize: 13,
            marginBottom: 10,
          }}
        >
          #{number} • {position} •{" "}
          {minutes} min
        </div>

        {/* Rating Bar */}

        <div
          style={{
            height: 8,
            background:
              "#374151",
            borderRadius: 999,
            overflow:
              "hidden",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background:
                getRatingColor(
                  rating
                ),
            }}
          />
        </div>

        {/* Match Stats */}

        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            color: "#cbd5e1",
            fontSize: 13,
          }}
        >
          <span>
            ⚽ {goals}
          </span>

          <span>
            🎯 {assists}
          </span>

          <span>
            🟨 {yellow}
          </span>

          <span>
            🟥 {red}
          </span>
        </div>
      </div>

      {/* Rating Badge */}

      <div
  style={{
    textAlign: "center",
    minWidth: 80,
  }}
>
  <div
    style={{
      color: getRatingColor(rating),
      fontSize: 26,
      lineHeight: 1,
      marginBottom: 6,
    }}
  >
    {getStars(rating)}
  </div>

  <div
    style={{
      color: "#fff",
      fontWeight: "bold",
      fontSize: 18,
    }}
  >
    {rating ? rating.toFixed(1) : "-"}
  </div>
</div>
    </div>
  );
}

function getStars(rating) {
  if (!rating) return "☆☆☆☆☆";

  if (rating >= 9.0) return "★★★★★";
  if (rating >= 8.0) return "★★★★☆";
  if (rating >= 7.0) return "★★★☆☆";
  if (rating >= 6.0) return "★★☆☆☆";

  return "★☆☆☆☆";
}

function getRatingColor(rating) {
  if (!rating) return "#64748b";

  if (rating >= 8.5)
    return "#22c55e"; // Excellent

  if (rating >= 7)
    return "#84cc16"; // Good

  if (rating >= 6)
    return "#facc15"; // Average

  if (rating >= 5)
    return "#f97316"; // Poor

  return "#ef4444"; // Bad
}