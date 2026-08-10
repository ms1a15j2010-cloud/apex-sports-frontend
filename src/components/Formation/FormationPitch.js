"use client";

import PlayerMarker from "./PlayerMarker";

export default function FormationPitch({
  home = [],
  away = [],
}) {
  const ROWS = 5;
  const COLS = 5;

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 18,
        padding: 25,
        marginTop: 30,
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: 20,
        }}
      >
        👥 Formation
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 720,
            aspectRatio: "68 / 105",
            overflow: "hidden",
            borderRadius: 20,
            border: "4px solid rgba(255,255,255,.15)",
            boxShadow:
              "0 20px 45px rgba(0,0,0,.45)",

            background: `
              repeating-linear-gradient(
                90deg,
                #1d8f45 0px,
                #1d8f45 60px,
                #18793b 60px,
                #18793b 120px
              )
            `,
          }}
        >
          {/* Pitch Border */}

          <div
            style={{
              position: "absolute",
              inset: "2%",
              border: "2px solid rgba(255,255,255,.45)",
            }}
          />

          {/* Halfway Line */}

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "2%",
              bottom: "2%",
              width: 2,
              background: "rgba(255,255,255,.45)",
              transform: "translateX(-50%)",
            }}
          />

          {/* Centre Circle */}

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "24%",
              aspectRatio: "1",
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,.45)",
              transform: "translate(-50%,-50%)",
            }}
          />

          {/* Centre Spot */}

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#fff",
              transform: "translate(-50%,-50%)",
            }}
          />

          {/* Top Penalty Area */}

          <div
            style={{
              position: "absolute",
              left: "21%",
              top: "2%",
              width: "58%",
              height: "16%",
              border: "2px solid rgba(255,255,255,.45)",
              borderTop: "none",
            }}
          />

          {/* Bottom Penalty Area */}

          <div
            style={{
              position: "absolute",
              left: "21%",
              bottom: "2%",
              width: "58%",
              height: "16%",
              border: "2px solid rgba(255,255,255,.45)",
              borderBottom: "none",
            }}
          />

          {/* Top Goal Box */}

          <div
            style={{
              position: "absolute",
              left: "35%",
              top: "2%",
              width: "30%",
              height: "7%",
              border: "2px solid rgba(255,255,255,.45)",
              borderTop: "none",
            }}
          />

          {/* Bottom Goal Box */}

          <div
            style={{
              position: "absolute",
              left: "35%",
              bottom: "2%",
              width: "30%",
              height: "7%",
              border: "2px solid rgba(255,255,255,.45)",
              borderBottom: "none",
            }}
          />
                    {/* Top Penalty Spot */}

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "13%",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#fff",
              transform: "translateX(-50%)",
            }}
          />

          {/* Bottom Penalty Spot */}

          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: "13%",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#fff",
              transform: "translateX(-50%)",
            }}
          />

          {/* Top Goal */}

          <div
            style={{
              position: "absolute",
              left: "43%",
              top: "-1%",
              width: "14%",
              height: "3%",
              border: "2px solid rgba(255,255,255,.45)",
              borderBottom: "none",
            }}
          />

          {/* Bottom Goal */}

          <div
            style={{
              position: "absolute",
              left: "43%",
              bottom: "-1%",
              width: "14%",
              height: "3%",
              border: "2px solid rgba(255,255,255,.45)",
              borderTop: "none",
            }}
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