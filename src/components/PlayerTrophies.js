"use client";

export default function PlayerTrophies({
  trophies = [],
}) {
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
          marginBottom: 28,
        }}
      >
        🏆 Career Trophies
      </h2>

      {!trophies.length ? (
        <div
          style={{
            background: "#1f2937",
            borderRadius: 18,
            padding: 35,
            textAlign: "center",
            color: "#94a3b8",
          }}
        >
          No trophies available.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: 20,
          }}
        >
          {trophies.map(
            (trophy, index) => (
              <div
                key={index}
                style={{
                  background:
                    "#1f2937",
                  borderRadius: 18,
                  padding: 22,
                  border:
                    "1px solid rgba(255,215,0,.25)",
                  transition:
                    "all .25s ease",
                  cursor: "default",
                }}
                onMouseEnter={(
                  e
                ) => {
                  e.currentTarget.style.transform =
                    "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 28px rgba(0,0,0,.35)";
                }}
                onMouseLeave={(
                  e
                ) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "none";
                }}
              >
                {/* Trophy */}

                <div
                  style={{
                    fontSize: 46,
                    marginBottom: 18,
                  }}
                >
                  🏆
                </div>

                <h3
                  style={{
                    color: "#fff",
                    marginBottom: 12,
                    fontSize: 21,
                  }}
                >
                  {trophy.league ||
                    "-"}
                </h3>

                <div
                  style={{
                    color: "#facc15",
                    fontWeight: 700,
                    fontSize: 18,
                    marginBottom: 10,
                  }}
                >
                  {trophy.place ||
                    "-"}
                </div>

                <div
                  style={{
                    color: "#94a3b8",
                    marginBottom: 8,
                  }}
                >
                  Season
                </div>

                <div
                  style={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 18,
                  }}
                >
                  {trophy.season ||
                    "-"}
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Summary */}

      {trophies.length > 0 && (
        <div
          style={{
            marginTop: 35,
            background:
              "#1f2937",
            borderRadius: 18,
            padding: 24,
          }}
        >
          <h3
            style={{
              color: "#fff",
              marginBottom: 15,
            }}
          >
            Career Summary
          </h3>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            This player has won{" "}
            <strong>
              {trophies.length}
            </strong>{" "}
            official career
            trophy
            {trophies.length >
            1
              ? "ies"
              : ""}{" "}
            across domestic
            leagues,
            international
            competitions and
            cup tournaments.
          </p>
        </div>
      )}
    </section>
  );
}