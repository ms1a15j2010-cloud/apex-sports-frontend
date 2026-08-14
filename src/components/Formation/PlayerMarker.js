"use client";

import Image from "next/image";

export default function PlayerMarker({
  player,
  side = "home",
  onClick,
}) {
  const rating = Number(player.rating || 0);

  let ratingColor = "#64748b";

  if (rating >= 8.5) ratingColor = "#16a34a";
  else if (rating >= 7.5) ratingColor = "#22c55e";
  else if (rating >= 7) ratingColor = "#84cc16";
  else if (rating >= 6.5) ratingColor = "#eab308";
  else if (rating > 0) ratingColor = "#ef4444";

  const borderColor =
    side === "home"
      ? "#22c55e"
      : "#ef4444";

  const playerName =
    player?.name ||
    "Player";

  const initials =
    playerName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(
        (part) =>
          part
            .charAt(0)
            .toUpperCase()
      )
      .join("") || "P";

  const playerPhoto =
    typeof player?.photo === "string" &&
    player.photo.trim()
      ? player.photo
      : null;

  return (
    <div
      onClick={() =>
        onClick && onClick(player)
      }
      style={{
        position: "absolute",
        left: `${player.gridX}%`,
        top: `${player.gridY}%`,
        transform:
          "translate(-50%,-50%)",
        width: 92,
        textAlign: "center",
        zIndex: 20,
        cursor: "pointer",
        transition:
          "all .25s ease",
      }}
    >
      {/* Rating */}

      {rating > 0 && (
        <div
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform:
              "translateX(-50%)",
            background:
              ratingColor,
            color: "#fff",
            padding:
              "3px 8px",
            borderRadius: 20,
            fontSize: 11,
            fontWeight: 700,
            border:
              "2px solid #111827",
            minWidth: 34,
          }}
        >
          {rating.toFixed(1)}
        </div>
      )}

      {/* Player */}

      <div
        style={{
          width: 58,
          height: 58,
          margin:
            "0 auto",
          borderRadius:
            "50%",
          overflow:
            "hidden",
          border:
            `3px solid ${borderColor}`,
          background:
            "#0f172a",
          boxShadow:
            "0 6px 15px rgba(0,0,0,.4)",
          position:
            "relative",
          display:
            "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
        }}
      >
        {playerPhoto ? (
          <Image
            src={playerPhoto}
            alt={playerName}
            width={58}
            height={58}
            unoptimized
            style={{
              width:
                "100%",
              height:
                "100%",
              objectFit:
                "cover",
            }}
          />
        ) : (
          <span
            style={{
              color:
                "#22c55e",
              fontSize:
                18,
              fontWeight:
                800,
              lineHeight: 1,
            }}
          >
            {initials}
          </span>
        )}

        {/* Captain */}

        {player.captain && (
          <div
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              width: 20,
              height: 20,
              borderRadius:
                "50%",
              background:
                "#2563eb",
              color: "#fff",
              display:
                "flex",
              justifyContent:
                "center",
              alignItems:
                "center",
              fontSize: 10,
              fontWeight: 700,
              border:
                "2px solid white",
            }}
          >
            C
          </div>
        )}

        {/* Goalkeeper */}

        {(player.position === "G" ||
          player.position === "GK") && (
          <div
            style={{
              position:
                "absolute",
              left: -4,
              top: -4,
              fontSize: 15,
            }}
          >
            🧤
          </div>
        )}
      </div>

      {/* Name */}

      <div
        style={{
          color: "#fff",
          fontWeight: 700,
          fontSize: 11,
          marginTop: 6,
          whiteSpace:
            "nowrap",
          overflow:
            "hidden",
          textOverflow:
            "ellipsis",
        }}
      >
        {playerName}
      </div>

      {/* Number */}

      <div
        style={{
          color:
            "#cbd5e1",
          fontSize: 11,
        }}
      >
        #{player.number}
      </div>

      {/* Match Icons */}

      <div
        style={{
          display:
            "flex",
          justifyContent:
            "center",
          gap: 3,
          marginTop: 4,
          minHeight: 18,
          flexWrap:
            "wrap",
        }}
      >
        {player.goals > 0 && (
          <span title="Goals">
            ⚽ {player.goals}
          </span>
        )}

        {player.assists > 0 && (
          <span title="Assists">
            🎯 {player.assists}
          </span>
        )}

        {player.yellow > 0 && (
          <span title="Yellow Card">
            🟨
          </span>
        )}

        {player.red > 0 && (
          <span title="Red Card">
            🟥
          </span>
        )}

        {player.substituted && (
          <span title="Substituted">
            🔄
          </span>
        )}
      </div>
    </div>
  );
}