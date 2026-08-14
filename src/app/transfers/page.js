"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

/* =====================================================
   API
===================================================== */

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

/* =====================================================
   TRANSFERS CLIENT
===================================================== */

export default function TransfersClient() {
  const [transfers, setTransfers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [leagueFilter, setLeagueFilter] =
    useState("all");

  /* =====================================================
     LOAD TRANSFERS
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    async function loadTransfers() {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(
            `${API}/api/transfers`,
            {
              cache: "no-store",
            }
          );

        const text =
          await response.text();

        let data = null;

        if (text) {
          try {
            data = JSON.parse(text);
          } catch {
            data = null;
          }
        }

        /* ==============================================
           BACKEND DOES NOT CURRENTLY PROVIDE TRANSFERS

           404 is handled as an unavailable dataset,
           not a page crash.
        ============================================== */

        if (response.status === 404) {
          if (!mounted) {
            return;
          }

          setTransfers([]);

          setError(
            "Transfer data is not currently available from the football-data.org backend."
          );

          return;
        }

        /* ==============================================
           OTHER HTTP ERRORS
        ============================================== */

        if (!response.ok) {
          throw new Error(
            data?.message ||
              `Transfers request failed: ${response.status}`
          );
        }

        if (!mounted) {
          return;
        }

        const items =
          Array.isArray(
            data?.transfers
          )
            ? data.transfers
            : Array.isArray(data)
            ? data
            : [];

        setTransfers(items);

        if (!items.length) {
          setError(
            "No transfer records are currently available."
          );
        }
      } catch (err) {
        console.error(
          "TransfersClient:",
          err
        );

        if (mounted) {
          setTransfers([]);

          setError(
            err?.message ||
              "Unable to load transfers."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadTransfers();

    return () => {
      mounted = false;
    };
  }, []);

  /* =====================================================
     LEAGUES
  ===================================================== */

  const leagues = useMemo(() => {
    const values =
      transfers
        .map(
          (item) =>
            item?.league?.name ||
            item?.leagueName ||
            (
              typeof item?.league ===
              "string"
                ? item.league
                : ""
            )
        )
        .filter(Boolean);

    return [
      ...new Set(values),
    ];
  }, [transfers]);

  /* =====================================================
     FILTERED TRANSFERS
  ===================================================== */

  const filteredTransfers =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return transfers.filter(
        (transfer) => {
          const player =
            transfer?.player?.name ||
            transfer?.playerName ||
            transfer?.name ||
            "";

          const from =
            transfer?.transfers
              ?.in?.name ||
            transfer?.from?.name ||
            transfer?.fromTeam?.name ||
            transfer?.from ||
            "";

          const to =
            transfer?.transfers
              ?.out?.name ||
            transfer?.to?.name ||
            transfer?.toTeam?.name ||
            transfer?.to ||
            "";

          const league =
            transfer?.league?.name ||
            transfer?.leagueName ||
            (
              typeof transfer?.league ===
              "string"
                ? transfer.league
                : ""
            );

          const matchesSearch =
            !query ||
            `${player} ${from} ${to} ${league}`
              .toLowerCase()
              .includes(query);

          const matchesLeague =
            leagueFilter === "all" ||
            league === leagueFilter;

          return (
            matchesSearch &&
            matchesLeague
          );
        }
      );
    }, [
      transfers,
      search,
      leagueFilter,
    ]);

  /* =====================================================
     HELPERS
  ===================================================== */

  function getPlayerName(
    transfer
  ) {
    return (
      transfer?.player?.name ||
      transfer?.playerName ||
      transfer?.name ||
      "Unknown Player"
    );
  }

  function getPlayerImage(
    transfer
  ) {
    return (
      transfer?.player?.photo ||
      transfer?.player?.image ||
      transfer?.photo ||
      ""
    );
  }

  function getTeamName(
    team,
    fallback
  ) {
    if (!team) {
      return fallback;
    }

    if (
      typeof team ===
      "string"
    ) {
      return team;
    }

    return (
      team?.name ||
      fallback
    );
  }

  function getFromTeam(
    transfer
  ) {
    return getTeamName(
      transfer?.from ||
        transfer?.fromTeam ||
        transfer?.transfers
          ?.out,
      "Previous club"
    );
  }

  function getToTeam(
    transfer
  ) {
    return getTeamName(
      transfer?.to ||
        transfer?.toTeam ||
        transfer?.transfers
          ?.in,
      "New club"
    );
  }

  function getLeagueName(
    transfer
  ) {
    return (
      transfer?.league?.name ||
      transfer?.leagueName ||
      (
        typeof transfer?.league ===
        "string"
          ? transfer.league
          : "Transfer"
      )
    );
  }

  function getDate(
    transfer
  ) {
    const value =
      transfer?.date ||
      transfer?.transferDate ||
      transfer?.transfers
        ?.date;

    if (!value) {
      return "";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "";
    }

    return date.toLocaleDateString(
      "en-US",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  }

  function getTransferType(
    transfer
  ) {
    return (
      transfer?.type ||
      transfer?.transferType ||
      "Transfer"
    );
  }

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <main
        style={{
          minHeight: "60vh",
          padding:
            "40px 20px",
          background:
            "#030712",
          color:
            "#fff",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1100,
            margin:
              "0 auto",
          }}
        >
          <div
            style={{
              color: "#ef4444",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing:
                "1.2px",
              textTransform:
                "uppercase",
              marginBottom: 8,
            }}
          >
            ⚽ Apex Sports
          </div>

          <h1
            style={{
              margin: 0,
              fontSize:
                "clamp(30px, 5vw, 44px)",
              fontWeight: 800,
            }}
          >
            Transfers
          </h1>

          <p
            style={{
              color:
                "#9ca3af",
              marginTop: 10,
            }}
          >
            Loading latest transfer
            activity...
          </p>
        </div>
      </main>
    );
  }

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <main
      style={{
        minHeight:
          "100vh",
        background:
          "#030712",
        color: "#fff",
        padding:
          "40px 20px 70px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          margin:
            "0 auto",
        }}
      >
        {/* HEADER */}

        <header
          style={{
            marginBottom: 30,
          }}
        >
          <div
            style={{
              color: "#ef4444",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing:
                "1.2px",
              textTransform:
                "uppercase",
              marginBottom: 8,
            }}
          >
            ⚽ Apex Sports
          </div>

          <h1
            style={{
              margin: 0,
              fontSize:
                "clamp(30px, 5vw, 44px)",
              fontWeight: 800,
            }}
          >
            Transfers
          </h1>

          <p
            style={{
              margin:
                "10px 0 0",
              color:
                "#9ca3af",
              fontSize: 15,
            }}
          >
            Latest football transfer
            activity and player
            movements.
          </p>
        </header>

        {/* ERROR / UNAVAILABLE */}

        {error && (
          <div
            style={{
              marginBottom: 20,
              padding: 18,
              borderRadius: 14,

              background:
                "#111827",

              border:
                "1px solid #374151",

              color:
                "#cbd5e1",

              fontSize: 14,

              lineHeight: 1.6,
            }}
          >
            <strong
              style={{
                display:
                  "block",
                color:
                  "#ffffff",
                marginBottom: 5,
              }}
            >
              Transfers unavailable
            </strong>

            {error}
          </div>
        )}

        {/* FILTER BAR */}

        <section
          style={{
            display: "flex",
            flexWrap:
              "wrap",
            gap: 12,
            marginBottom: 24,
            padding: 16,
            background:
              "#111827",
            border:
              "1px solid #1f2937",
            borderRadius: 16,
          }}
        >
          <input
            type="search"
            value={search}
            onChange={(
              event
            ) =>
              setSearch(
                event.target
                  .value
              )
            }
            placeholder="Search player or club..."
            disabled={
              transfers.length ===
              0
            }
            style={{
              flex:
                "1 1 280px",
              minWidth: 0,
              height: 44,
              padding:
                "0 14px",
              borderRadius:
                10,
              border:
                "1px solid #374151",
              background:
                "#030712",
              color:
                "#fff",
              outline:
                "none",
              fontSize: 14,
              opacity:
                transfers.length
                  ? 1
                  : 0.6,
            }}
          />

          <select
            value={
              leagueFilter
            }
            onChange={(
              event
            ) =>
              setLeagueFilter(
                event.target
                  .value
              )
            }
            disabled={
              transfers.length ===
              0
            }
            style={{
              flex:
                "0 1 220px",
              height: 44,
              padding:
                "0 12px",
              borderRadius:
                10,
              border:
                "1px solid #374151",
              background:
                "#030712",
              color:
                "#fff",
              fontSize: 14,
              cursor:
                "pointer",
              opacity:
                transfers.length
                  ? 1
                  : 0.6,
            }}
          >
            <option value="all">
              All leagues
            </option>

            {leagues.map(
              (league) => (
                <option
                  key={league}
                  value={league}
                >
                  {league}
                </option>
              )
            )}
          </select>
        </section>

        {/* EMPTY / UNAVAILABLE */}

        {filteredTransfers.length ===
          0 && (
          <section
            style={{
              padding:
                "60px 24px",
              textAlign:
                "center",
              background:
                "linear-gradient(145deg, #111827, #0b1220)",
              border:
                "1px solid #1f2937",
              borderRadius: 20,
            }}
          >
            <div
              style={{
                fontSize:
                  42,
                marginBottom:
                  12,
              }}
            >
              🔄
            </div>

            <h2
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              No transfer data available
            </h2>

            <p
              style={{
                margin:
                  "8px 0 0",
                color:
                  "#9ca3af",
                fontSize: 14,
                lineHeight:
                  1.6,
                maxWidth:
                  600,
                marginLeft:
                  "auto",
                marginRight:
                  "auto",
              }}
            >
              The current football-data.org
              backend does not provide a
              transfers dataset for this
              page yet.
            </p>
          </section>
        )}

        {/* TRANSFER LIST */}

        {filteredTransfers.length >
          0 && (
          <div
            style={{
              display:
                "grid",
              gap: 14,
            }}
          >
            {filteredTransfers.map(
              (
                transfer,
                index
              ) => {
                const player =
                  getPlayerName(
                    transfer
                  );

                const image =
                  getPlayerImage(
                    transfer
                  );

                const from =
                  getFromTeam(
                    transfer
                  );

                const to =
                  getToTeam(
                    transfer
                  );

                const league =
                  getLeagueName(
                    transfer
                  );

                const date =
                  getDate(
                    transfer
                  );

                return (
                  <article
                    key={
                      transfer?.id ||
                      transfer?.player
                        ?.id ||
                      `${player}-${index}`
                    }
                    style={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap: 18,
                      padding: 18,
                      background:
                        "linear-gradient(145deg, #111827, #0b1220)",
                      border:
                        "1px solid #1f2937",
                      borderRadius:
                        18,
                    }}
                  >
                    <div
                      style={{
                        width:
                          58,
                        height:
                          58,
                        flex:
                          "0 0 58px",
                        borderRadius:
                          "50%",
                        overflow:
                          "hidden",
                        background:
                          "#1f2937",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        fontSize:
                          24,
                      }}
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={
                            player
                          }
                          width={
                            58
                          }
                          height={
                            58
                          }
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
                        "⚽"
                      )}
                    </div>

                    <div
                      style={{
                        flex:
                          1,
                        minWidth:
                          0,
                      }}
                    >
                      <h2
                        style={{
                          margin: 0,
                          color:
                            "#fff",
                          fontSize:
                            17,
                          fontWeight:
                            800,
                        }}
                      >
                        {player}
                      </h2>

                      <div
                        style={{
                          marginTop:
                            7,
                          display:
                            "flex",
                          flexWrap:
                            "wrap",
                          alignItems:
                            "center",
                          gap: 8,
                          color:
                            "#d1d5db",
                          fontSize:
                            14,
                        }}
                      >
                        <span>
                          {from}
                        </span>

                        <span
                          style={{
                            color:
                              "#ef4444",
                            fontWeight:
                              800,
                          }}
                        >
                          →
                        </span>

                        <span>
                          {to}
                        </span>
                      </div>

                      <div
                        style={{
                          display:
                            "flex",
                          flexWrap:
                            "wrap",
                          gap: 8,
                          marginTop:
                            8,
                          fontSize:
                            11,
                          color:
                            "#6b7280",
                        }}
                      >
                        <span>
                          {league}
                        </span>

                        {date && (
                          <>
                            <span>
                              •
                            </span>

                            <span>
                              {date}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div
                      style={{
                        flex:
                          "0 0 auto",
                        padding:
                          "7px 10px",
                        borderRadius:
                          8,
                        background:
                          "#1f2937",
                        color:
                          "#d1d5db",
                        fontSize:
                          11,
                        fontWeight:
                          700,
                        textTransform:
                          "uppercase",
                      }}
                    >
                      {getTransferType(
                        transfer
                      )}
                    </div>
                  </article>
                );
              }
            )}
          </div>
        )}
      </div>
    </main>
  );
}