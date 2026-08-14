"use client";

export default function TeamTrophies({
  trophies = [],
  available = false,
}) {
  const hasTrophies =
    available &&
    Array.isArray(trophies) &&
    trophies.length > 0;

  return (
    <section
      id="trophies"
      style={{
        background:
          "linear-gradient(145deg,#111827,#0f172a)",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
        border: "1px solid #1e293b",
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        style={{
          marginBottom: 25,
        }}
      >
        <div
          style={{
            color: "#ef4444",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          ⚽ Apex Sports
        </div>

        <h2
          style={{
            color: "#fff",
            margin: 0,
            fontSize: 28,
          }}
        >
          🏆 Club Honours
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin: "8px 0 0",
            fontSize: 14,
          }}
        >
          Historical trophy and honours information.
        </p>
      </div>

      {/* =================================================
          AVAILABLE TROPHIES
      ================================================= */}

      {hasTrophies ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(280px,1fr))",
            gap: 18,
          }}
        >
          {trophies.map(
            (trophy, index) => (
              <article
                key={
                  trophy?.id ??
                  index
                }
                style={{
                  background:
                    "#1f2937",
                  borderRadius: 18,
                  padding: 22,
                  border:
                    "1px solid #293548",
                }}
              >
                {/* Trophy icon */}

                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background:
                      "#111827",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    fontSize: 32,
                    marginBottom: 18,
                  }}
                >
                  🏆
                </div>

                <h3
                  style={{
                    color: "#fff",
                    margin:
                      "0 0 8px",
                    fontSize: 20,
                  }}
                >
                  {trophy?.league ||
                    "Competition"}
                </h3>

                {trophy?.country && (
                  <div
                    style={{
                      color:
                        "#94a3b8",
                      fontSize: 13,
                      marginBottom: 16,
                    }}
                  >
                    {trophy.country}
                  </div>
                )}

                <Info
                  label="🏅 Result"
                  value={
                    trophy?.place ||
                    "-"
                  }
                />

                <Info
                  label="📅 Season"
                  value={
                    trophy?.season ||
                    "-"
                  }
                />
              </article>
            )
          )}
        </div>
      ) : (
        /* =================================================
           UNAVAILABLE
        ================================================= */

        <div
          style={{
            background:
              "#1f2937",
            borderRadius: 18,
            padding: 40,
            textAlign: "center",
            border:
              "1px solid #293548",
          }}
        >
          <div
            style={{
              fontSize: 58,
              marginBottom: 16,
            }}
          >
            🏆
          </div>

          <h3
            style={{
              color: "#fff",
              margin:
                "0 0 10px",
              fontSize: 21,
            }}
          >
            Trophy History Unavailable
          </h3>

          <p
            style={{
              color: "#94a3b8",
              margin: 0,
              maxWidth: 650,
              marginInline:
                "auto",
              lineHeight: 1.8,
              fontSize: 14,
            }}
          >
            Historical club trophy data is
            not provided by the current
            football-data.org source.
            This section is intentionally
            left empty rather than displaying
            unverified honours.
          </p>

          <div
            style={{
              display:
                "inline-block",
              marginTop: 16,
              padding:
                "7px 12px",
              borderRadius: 999,
              background:
                "#111827",
              color:
                "#64748b",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            Source limitation
          </div>
        </div>
      )}

      {/* =================================================
          SOURCE
      ================================================= */}

      <div
        style={{
          marginTop: 18,
          paddingTop: 16,
          borderTop:
            "1px solid #293548",
          color: "#64748b",
          fontSize: 12,
        }}
      >
        Source: football-data.org
      </div>
    </section>
  );
}

/* =====================================================
INFO
===================================================== */

function Info({
  label,
  value,
}) {
  return (
    <div
      style={{
        background:
          "#111827",
        borderRadius: 12,
        padding: 14,
        marginTop: 10,
        border:
          "1px solid #293548",
      }}
    >
      <div
        style={{
          color:
            "#94a3b8",
          fontSize: 12,
          marginBottom: 6,
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: "#fff",
          fontWeight: 800,
          fontSize: 16,
        }}
      >
        {value || "-"}
      </div>
    </div>
  );
}