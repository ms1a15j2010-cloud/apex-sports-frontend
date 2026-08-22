"use client";

export default function FootballPitch({
  children,
  height = 900,
}) {
  return (
    <div className="mx-auto w-full max-w-[700px]">
      <div
        className="relative w-full overflow-hidden rounded-xl border-4 border-white bg-gradient-to-b from-green-700 to-green-800"
        style={{ aspectRatio: "68 / 105" }}
      >
        {/* Grass stripes */}

        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`absolute left-0 right-0 h-[10%] ${
              i % 2 === 0
                ? "bg-white/[0.03]"
                : "bg-transparent"
            }`}
            style={{
              top: `${i * 10}%`,
            }}
          />
        ))}

        {/* Center line */}

        <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-px bg-white" />

        {/* Center circle */}

        <div className="absolute left-1/2 top-1/2 h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white" />

        {/* Kickoff spot */}

        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />

        {/* Top penalty area */}

        <div className="absolute left-[20%] top-0 h-[16%] w-[60%] border-3 border-white border-t-0" />

        {/* Bottom penalty area */}

        <div className="absolute bottom-0 left-[20%] h-[16%] w-[60%] border-3 border-white border-b-0" />

        {/* Top goal area */}

        <div className="absolute left-[36%] top-0 h-[7%] w-[28%] border-3 border-white border-t-0" />

        {/* Bottom goal area */}

        <div className="absolute bottom-0 left-[36%] h-[7%] w-[28%] border-3 border-white border-b-0" />

        {/* Top penalty spot */}

        <div className="absolute left-1/2 top-[11%] h-2 w-2 -translate-x-1/2 rounded-full bg-white" />

        {/* Bottom penalty spot */}

        <div className="absolute bottom-[11%] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white" />

        {/* Top penalty arc */}

        <div
          className="absolute left-1/2 top-[13%] h-[45px] w-[90px] -translate-x-1/2 rotate-180 rounded-[90px_90px_0_0] border-[3px] border-white border-b-0 border-l-transparent border-r-transparent"
        />

        {/* Bottom penalty arc */}

        <div className="absolute bottom-[13%] left-1/2 h-[45px] w-[90px] -translate-x-1/2 rounded-[90px_90px_0_0] border-[3px] border-white border-b-0 border-l-transparent border-r-transparent" />

        {/* Corner arcs */}

        {[
          { top: 0, left: 0 },
          { top: 0, right: 0 },
          { bottom: 0, left: 0 },
          { bottom: 0, right: 0 },
        ].map((corner, i) => (
          <div
            key={i}
            className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white"
            style={corner}
          />
        ))}

        {/* Player layer */}

        <div className="absolute inset-0">
          {children}
        </div>
      </div>
    </div>
  );
}