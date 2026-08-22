"use client";

import PlayerMarker from "./PlayerMarker";

export default function FormationPitch({
  home = [],
  away = [],
}) {
  const ROWS = 5;
  const COLS = 5;

  return (
    <section className="mt-[30px] rounded-[18px] bg-gray-900 p-[25px]">
      <h2 className="mb-5 text-white">
        👥 Formation
      </h2>

      <div className="flex justify-center">
        <div
          className="
            relative
            aspect-[68/105]
            w-full
            max-w-[720px]
            overflow-hidden
            rounded-[20px]
            border-4
            border-white/15
            shadow-[0_20px_45px_rgba(0,0,0,0.45)]
            bg-[repeating-linear-gradient(90deg,#1d8f45_0px,#1d8f45_60px,#18793b_60px,#18793b_120px)]
          "
        >
          {/* Pitch Border */}

          <div className="absolute inset-[2%] border-2 border-white/45" />

          {/* Halfway Line */}

          <div
            className="
              absolute
              left-1/2
              top-[2%]
              bottom-[2%]
              w-[2px]
              -translate-x-1/2
              bg-white/45
            "
          />

          {/* Centre Circle */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              aspect-square
              w-[24%]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border-2
              border-white/45
            "
          />

          {/* Centre Spot */}

          <div
            className="
              absolute
              left-1/2
              top-1/2
              h-2
              w-2
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-white
            "
          />

          {/* Top Penalty Area */}

          <div
            className="
              absolute
              left-[21%]
              top-[2%]
              h-[16%]
              w-[58%]
              border-2
              border-white/45
              border-t-0
            "
          />

          {/* Bottom Penalty Area */}

          <div
            className="
              absolute
              bottom-[2%]
              left-[21%]
              h-[16%]
              w-[58%]
              border-2
              border-white/45
              border-b-0
            "
          />

          {/* Top Goal Box */}

          <div
            className="
              absolute
              left-[35%]
              top-[2%]
              h-[7%]
              w-[30%]
              border-2
              border-white/45
              border-t-0
            "
          />

          {/* Bottom Goal Box */}

          <div
            className="
              absolute
              bottom-[2%]
              left-[35%]
              h-[7%]
              w-[30%]
              border-2
              border-white/45
              border-b-0
            "
          />

          {/* Top Penalty Spot */}

          <div
            className="
              absolute
              left-1/2
              top-[13%]
              h-2
              w-2
              -translate-x-1/2
              rounded-full
              bg-white
            "
          />

          {/* Bottom Penalty Spot */}

          <div
            className="
              absolute
              bottom-[13%]
              left-1/2
              h-2
              w-2
              -translate-x-1/2
              rounded-full
              bg-white
            "
          />

          {/* Top Goal */}

          <div
            className="
              absolute
              left-[43%]
              top-[-1%]
              h-[3%]
              w-[14%]
              border-2
              border-white/45
              border-b-0
            "
          />

          {/* Bottom Goal */}

          <div
            className="
              absolute
              bottom-[-1%]
              left-[43%]
              h-[3%]
              w-[14%]
              border-2
              border-white/45
              border-t-0
            "
          />

          {/* Home Players */}

          {home.map((player) => {
            const left =
              (player.column * 100) /
              (COLS + 1);

            const top =
              (player.row * 100) /
              (ROWS + 1);

            return (
              <PlayerMarker
                key={player.id}
                player={{
                  ...player,
                  gridX: left,
                  gridY: top,
                }}
                side="home"
              />
            );
          })}

          {/* Away Players */}

          {away.map((player) => {
            const left =
              (player.column * 100) /
              (COLS + 1);

            const top =
              (player.row * 100) /
              (ROWS + 1);

            return (
              <PlayerMarker
                key={player.id}
                player={{
                  ...player,
                  gridX: left,
                  gridY: 100 - top,
                }}
                side="away"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}