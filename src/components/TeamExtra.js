"use client";

export default function TeamExtras({
  team,
}) {
  if (!team) return null;

  const transfers = Array.isArray(
    team.transfers
  )
    ? team.transfers
    : [];

  const injuries = Array.isArray(
    team.injuries
  )
    ? team.injuries
    : [];

  const trophies = Array.isArray(
    team.trophies
  )
    ? team.trophies
    : [];

  const transfersAvailable =
    team.transfersAvailable === true ||
    team.transferDataAvailable === true;

  const injuriesAvailable =
    team.injuriesAvailable === true ||
    team.injuryDataAvailable === true;

  const trophiesAvailable =
    team.trophiesAvailable === true ||
    team.trophyDataAvailable === true;

  return (
    <section
      id="team-extra"
      style={{
        background:
          "linear-gradient(145deg,#111827,#0f172a)",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
        border:
          "1px solid #1e293b",
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        style={{
          marginBottom: 30,
        }}
      >
        <div
          style={{
            color: "#ef4444",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "1.2px",
            textTransform:
              "uppercase",
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
          ⭐ Team Information
        </h2>

        <p
          style={{
            color: "#94a3b8",
            margin:
              "8px 0 0",
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          Additional club information and
          data availability.
        </p>
      </div>

      {/* =================================================
          TRANSFERS
      ================================================= */}

      <section
        id="transfers"
        style={{
          background: "#1f2937",
          borderRadius: 18,
          padding: 24,
          marginBottom: 22,
          border:
            "1px solid #293548",
        }}
      >
        <SectionHeading
          icon="🔄"
          title="Latest Transfers"
        />

        {transfersAvailable &&
        transfers.length > 0 ? (
          <div
            style={{
              display: "grid",
              gap: 14,
            }}
          >
            {transfers
              .slice(0, 10)
              .map(
                (
                  transfer,
                  index
                ) => {
                  const player =
                    transfer?.player ||
                    {};

                  const move =
                    transfer?.transfers?.[0] ||
                    transfer ||
                    {};

                  const from =
                    move?.teams?.out
                      ?.name ||
                    move?.from?.name ||
                    "-";

                  const to =
                    move?.teams?.in
                      ?.name ||
                    move?.to?.name ||
                    "-";

                  const type =
                    move?.type ||
                    "-";

                  const date =
                    move?.date ||
                    "-";

                  return (
                    <div
                      key={
                        player?.id ??
                        `${date}-${index}`
                      }
                      style={{
                        background:
                          "#111827",
                        borderRadius:
                          14,
                        padding: 16,
                        border:
                          "1px solid #293548",
                      }}
                    >
                      <div
                        style={{
                          color: "#fff",
                          fontWeight:
                            800,
                          fontSize: 15,
                        }}
                      >
                        {player?.name ||
                          "Unknown Player"}
                      </div>

                      <div
                        style={{
                          color:
                            "#94a3b8",
                          fontSize: 13,
                          marginTop: 8,
                        }}
                      >
                        {from} → {to}
                      </div>

                      <div
                        style={{
                          display:
                            "flex",
                          gap: 14,
                          flexWrap:
                            "wrap",
                          marginTop: 8,
                          color:
                            "#64748b",
                          fontSize: 12,
                        }}
                      >
                        <span>
                          Type: {type}
                        </span>

                        <span>
                          Date: {date}
                        </span>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        ) : (
          <UnavailableState
            icon="🔄"
            title="Transfer History Unavailable"
            message="The current football-data.org source does not provide team transfer history."
          />
        )}
      </section>

      {/* =================================================
          INJURIES
      ================================================= */}

      <section
        id="injuries"
        style={{
          background: "#1f2937",
          borderRadius: 18,
          padding: 24,
          marginBottom: 22,
          border:
            "1px solid #293548",
        }}
      >
        <SectionHeading
          icon="🏥"
          title="Team Injuries"
        />

        {injuriesAvailable &&
        injuries.length > 0 ? (
          <div
            style={{
              display: "grid",
              gap: 12,
            }}
          >
            {injuries.map(
              (
                injury,
                index
              ) => {
                const player =
                  injury?.player ||
                  {};

                const reason =
                  injury?.player
                    ?.reason ||
                  injury?.reason ||
                  injury?.type ||
                  "Injury information";

                return (
                  <div
                    key={
                      player?.id ??
                      index
                    }
                    style={{
                      background:
                        "#111827",
                      borderRadius:
                        14,
                      padding: 16,
                      border:
                        "1px solid #293548",
                    }}
                  >
                    <div
                      style={{
                        color:
                          "#fff",
                        fontWeight:
                          800,
                      }}
                    >
                      {player?.name ||
                        "Unknown Player"}
                    </div>

                    <div
                      style={{
                        color:
                          "#f87171",
                        marginTop: 6,
                        fontSize:
                          13,
                      }}
                    >
                      {reason}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        ) : (
          <UnavailableState
            icon="🏥"
            title="Injury Data Unavailable"
            message="The current football-data.org source does not provide team injury information."
          />
        )}
      </section>

      {/* =================================================
          TROPHIES
      ================================================= */}

      <section
        id="trophies"
        style={{
          background: "#1f2937",
          borderRadius: 18,
          padding: 24,
          border:
            "1px solid #293548",
        }}
      >
        <SectionHeading
          icon="🏆"
          title="Team Trophies"
        />

        {trophiesAvailable &&
        trophies.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(240px,1fr))",
              gap: 16,
            }}
          >
            {trophies.map(
              (
                trophy,
                index
              ) => (
                <div
                  key={
                    trophy?.id ??
                    index
                  }
                  style={{
                    background:
                      "#111827",
                    borderRadius:
                      14,
                    padding: 18,
                    border:
                      "1px solid #293548",
                  }}
                >
                  <div
                    style={{
                      fontSize: 28,
                      marginBottom: 10,
                    }}
                  >
                    🏆
                  </div>

                  <div
                    style={{
                      color:
                        "#fff",
                      fontSize:
                        17,
                      fontWeight:
                        800,
                    }}
                  >
                    {trophy?.league ||
                      "Competition"}
                  </div>

                  <div
                    style={{
                      color:
                        "#22c55e",
                      marginTop:
                        7,
                      fontWeight:
                        700,
                      fontSize:
                        13,
                    }}
                  >
                    {trophy?.place ||
                      "Achievement"}
                  </div>

                  <div
                    style={{
                      color:
                        "#94a3b8",
                      marginTop:
                        6,
                      fontSize:
                        12,
                    }}
                  >
                    Season:{" "}
                    {trophy?.season ||
                      "-"}
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <UnavailableState
            icon="🏆"
            title="Trophy History Unavailable"
            message="The current football-data.org source does not provide historical team trophy data."
          />
        )}
      </section>

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
SECTION HEADING
===================================================== */

function SectionHeading({
  icon,
  title,
}) {
  return (
    <h3
      style={{
        color: "#fff",
        margin:
          "0 0 20px",
        fontSize: 21,
        display: "flex",
        alignItems:
          "center",
        gap: 10,
      }}
    >
      <span>{icon}</span>
      <span>{title}</span>
    </h3>
  );
}

/* =====================================================
UNAVAILABLE STATE
===================================================== */

function UnavailableState({
  icon,
  title,
  message,
}) {
  return (
    <div
      style={{
        background:
          "#111827",
        borderRadius: 14,
        padding: 28,
        textAlign: "center",
        border:
          "1px solid #293548",
      }}
    >
      <div
        style={{
          fontSize: 42,
          marginBottom: 12,
        }}
      >
        {icon}
      </div>

      <h4
        style={{
          color: "#fff",
          margin:
            "0 0 8px",
          fontSize: 17,
        }}
      >
        {title}
      </h4>

      <p
        style={{
          color: "#94a3b8",
          margin: 0,
          fontSize: 13,
          lineHeight: 1.7,
          maxWidth: 600,
          marginInline:
            "auto",
        }}
      >
        {message}
      </p>

      <div
        style={{
          display:
            "inline-block",
          marginTop: 14,
          padding:
            "6px 12px",
          borderRadius: 999,
          background:
            "#0f172a",
          color:
            "#64748b",
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        Source limitation
      </div>
    </div>
  );
}