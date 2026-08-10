"use client";

import Image from "next/image";

export default function MatchAwards({ players = [] }) {
  if (!players.length) return null;

  const allPlayers = players.flatMap((team) =>
    (team.players || []).map((p) => {
      const s = p.statistics?.[0] || {};

      return {
        id: p.player.id,
        name: p.player.name,
        photo: p.player.photo,
        team: team.team.name,
        position: s.games?.position || "",
        rating: Number(s.games?.rating || 0),
        goals: Number(s.goals?.total || 0),
        assists: Number(s.goals?.assists || 0),
        saves: Number(s.goals?.saves || 0),
        shots: Number(s.shots?.total || 0),
      };
    })
  );

  if (!allPlayers.length) return null;

  const highestRating = [...allPlayers].sort(
    (a, b) => b.rating - a.rating
  )[0];

  const topScorer = [...allPlayers].sort(
    (a, b) => b.goals - a.goals
  )[0];

  const topCreator = [...allPlayers].sort(
    (a, b) => b.assists - a.assists
  )[0];

  const bestKeeper = [...allPlayers]
    .filter(
      (p) =>
        p.position === "G" ||
        p.position === "GK"
    )
    .sort((a, b) => {
      if (b.saves !== a.saves)
        return b.saves - a.saves;

      return b.rating - a.rating;
    })[0];

  const mostShots = [...allPlayers].sort(
    (a, b) => b.shots - a.shots
  )[0];

  const cards = [
    {
      icon: "⭐",
      title: "Man of the Match",
      player: highestRating,
      stat:
        highestRating.rating > 0
          ? `${highestRating.rating.toFixed(1)} Rating`
          : "-",
      color: "#22c55e",
    },
    {
      icon: "⚽",
      title: "Top Goalscorer",
      player: topScorer,
      stat: `${topScorer.goals} Goals`,
      color: "#16a34a",
    },
    {
      icon: "🎯",
      title: "Top Creator",
      player: topCreator,
      stat: `${topCreator.assists} Assists`,
      color: "#3b82f6",
    },
    {
      icon: "🧤",
      title: "Best Goalkeeper",
      player: bestKeeper,
      stat: bestKeeper
        ? `${bestKeeper.saves} Saves`
        : "-",
      color: "#06b6d4",
    },
    {
      icon: "🚀",
      title: "Most Shots",
      player: mostShots,
      stat: `${mostShots.shots} Shots`,
      color: "#f97316",
    },
    {
      icon: "📈",
      title: "Highest Rating",
      player: highestRating,
      stat:
        highestRating.rating > 0
          ? highestRating.rating.toFixed(1)
          : "-",
      color: "#a855f7",
    },
  ];

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 18,
        padding: 28,
        marginBottom: 25,
      }}
    >
      <h2
        style={{
          marginBottom: 25,
          color: "#fff",
          fontSize: 28,
        }}
      >
        🏆 Match Awards
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: 20,
        }}
      >
        {cards.map((card) => (
          <AwardCard
            key={card.title}
            {...card}
          />
        ))}
      </div>
    </section>
  );
}

function AwardCard({
  icon,
  title,
  player,
  stat,
  color,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 16,
        padding: 20,
        border: `2px solid ${color}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        {player?.photo ? (
          <Image
            src={player.photo}
            alt={player.name}
            width={60}
            height={60}
            style={{
              borderRadius: "50%",
              border: `3px solid ${color}`,
            }}
          />
        ) : (
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
            }}
          >
            {icon}
          </div>
        )}

        <div style={{ flex: 1 }}>
          <div
            style={{
              color: "#94a3b8",
              fontSize: 13,
            }}
          >
            {title}
          </div>

          <div
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: 700,
              marginTop: 4,
            }}
          >
            {player?.name || "-"}
          </div>

          <div
            style={{
              color,
              marginTop: 6,
              fontWeight: 700,
            }}
          >
            {stat}
          </div>

          <div
            style={{
              marginTop: 6,
              color: "#94a3b8",
              fontSize: 13,
            }}
          >
            {player?.team || ""}
          </div>
        </div>
      </div>
    </div>
  );
}