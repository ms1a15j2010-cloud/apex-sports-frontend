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
      className="absolute z-20 w-[92px] -translate-x-1/2 -translate-y-1/2 cursor-pointer text-center transition-all duration-200 ease-in-out"
      style={{
        left: `${player.gridX}%`,
        top: `${player.gridY}%`,
      }}
    >
      {/* Rating */}

      {rating > 0 && (
        <div
          className="absolute left-1/2 top-[-12px] min-w-[34px] -translate-x-1/2 rounded-[20px] border-2 border-[#111827] px-2 py-[3px] text-[11px] font-bold text-white"
          style={{
            backgroundColor: ratingColor,
          }}
        >
          {rating.toFixed(1)}
        </div>
      )}

      {/* Player */}

      <div
        className="relative mx-auto flex h-[58px] w-[58px] items-center justify-center overflow-hidden rounded-full border-[3px] bg-[#0f172a] shadow-[0_6px_15px_rgba(0,0,0,0.4)]"
        style={{
          borderColor,
        }}
      >
        {playerPhoto ? (
          <Image
            src={playerPhoto}
            alt={playerName}
            width={58}
            height={58}
            unoptimized
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-[18px] font-extrabold leading-none text-green-500">
            {initials}
          </span>
        )}

        {/* Captain */}

        {player.captain && (
          <div className="absolute right-[-2px] top-[-2px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-[10px] font-bold text-white">
            C
          </div>
        )}

        {/* Goalkeeper */}

        {(player.position === "G" ||
          player.position === "GK") && (
          <div className="absolute left-[-4px] top-[-4px] text-[15px]">
            🧤
          </div>
        )}
      </div>

      {/* Name */}

      <div className="mt-[6px] overflow-hidden text-ellipsis whitespace-nowrap text-[11px] font-bold text-white">
        {playerName}
      </div>

      {/* Number */}

      <div className="text-[11px] text-slate-300">
        #{player.number}
      </div>

      {/* Match Icons */}

      <div className="mt-1 flex min-h-[18px] flex-wrap justify-center gap-[3px]">
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