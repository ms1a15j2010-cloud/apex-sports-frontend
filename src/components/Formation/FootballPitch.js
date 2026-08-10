"use client";
import PlayerMarker from "./PlayerMarker";
export default function FootballPitch({
  children,
  height = 900,
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 700,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "68 / 105",
          background:
            "linear-gradient(to bottom,#15803d,#166534)",

          border: "4px solid white",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        {/* Grass stripes */}

        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${i * 10}%`,
              height: "10%",
              background:
                i % 2 === 0
                  ? "rgba(255,255,255,.03)"
                  : "transparent",
            }}
          />
        ))}

        {/* Center line */}

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: 2,
            background: "white",
            transform: "translateY(-1px)",
          }}
        />

        {/* Center circle */}

        <div
          style={{
            position: "absolute",
            width: 120,
            height: 120,
            border: "3px solid white",
            borderRadius: "50%",
            left: "50%",
            top: "50%",
            transform:
              "translate(-50%,-50%)",
          }}
        />

        {/* Kickoff spot */}

        <div
          style={{
            position: "absolute",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "white",
            left: "50%",
            top: "50%",
            transform:
              "translate(-50%,-50%)",
          }}
        />

        {/* Top penalty area */}

        <div
          style={{
            position: "absolute",
            width: "60%",
            height: "16%",
            left: "20%",
            top: 0,
            border: "3px solid white",
            borderTop: "none",
          }}
        />

        {/* Bottom penalty area */}

        <div
          style={{
            position: "absolute",
            width: "60%",
            height: "16%",
            left: "20%",
            bottom: 0,
            border: "3px solid white",
            borderBottom: "none",
          }}
        />

        {/* Top goal area */}

        <div
          style={{
            position: "absolute",
            width: "28%",
            height: "7%",
            left: "36%",
            top: 0,
            border: "3px solid white",
            borderTop: "none",
          }}
        />

        {/* Bottom goal area */}

        <div
          style={{
            position: "absolute",
            width: "28%",
            height: "7%",
            left: "36%",
            bottom: 0,
            border: "3px solid white",
            borderBottom: "none",
          }}
        />

        {/* Top penalty spot */}

        <div
          style={{
            position: "absolute",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "white",
            left: "50%",
            top: "11%",
            transform:
              "translateX(-50%)",
          }}
        />

        {/* Bottom penalty spot */}

        <div
          style={{
            position: "absolute",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "white",
            left: "50%",
            bottom: "11%",
            transform:
              "translateX(-50%)",
          }}
        />

        {/* Top penalty arc */}

        <div
          style={{
            position: "absolute",
            width: 90,
            height: 45,
            border: "3px solid white",
            borderBottom: "none",
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderRadius:
              "90px 90px 0 0",
            left: "50%",
            top: "13%",
            transform:
              "translateX(-50%) rotate(180deg)",
          }}
        />

        {/* Bottom penalty arc */}

        <div
          style={{
            position: "absolute",
            width: 90,
            height: 45,
            border: "3px solid white",
            borderBottom: "none",
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderRadius:
              "90px 90px 0 0",
            left: "50%",
            bottom: "13%",
            transform:
              "translateX(-50%)",
          }}
        />

        {/* Corner arcs */}

        {[
          { top: 0, left: 0 },
          { top: 0, right: 0 },
          { bottom: 0, left: 0 },
          { bottom: 0, right: 0 },
        ].map((corner, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 24,
              height: 24,
              border: "3px solid white",
              borderRadius: "50%",
              ...corner,
              transform:
                "translate(-50%,-50%)",
            }}
          />
        ))}

        {/* Player layer */}

        <div
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}