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
      <main className="min-h-[60vh] bg-gray-950 px-5 py-10 text-white">
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
            ⚽ Apex Sports
          </div>

          <h1 className="text-[clamp(30px,5vw,44px)] font-extrabold">
            Transfers
          </h1>

          <p className="mt-2.5 text-slate-400">
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
    <main className="min-h-screen bg-gray-950 px-5 pb-[70px] pt-10 text-white">
      <div className="mx-auto w-full max-w-[1100px]">

        {/* HEADER */}

        <header className="mb-[30px]">
          <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
            ⚽ Apex Sports
          </div>

          <h1 className="text-[clamp(30px,5vw,44px)] font-extrabold">
            Transfers
          </h1>

          <p className="mt-2.5 text-[15px] text-gray-400">
            Latest football transfer
            activity and player
            movements.
          </p>
        </header>

        {/* ERROR / UNAVAILABLE */}

        {error && (
          <div className="mb-5 rounded-[14px] border border-gray-700 bg-gray-900 p-[18px] text-sm leading-relaxed text-slate-300">
            <strong className="mb-1 block text-white">
              Transfers unavailable
            </strong>

            {error}
          </div>
        )}

        {/* FILTER BAR */}

        <section className="mb-6 flex flex-wrap gap-3 rounded-2xl border border-gray-800 bg-gray-900 p-4">

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search player or club..."
            disabled={
              transfers.length === 0
            }
            className="h-11 min-w-0 flex-[1_1_280px] rounded-[10px] border border-gray-700 bg-gray-950 px-3.5 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-red-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <select
            value={leagueFilter}
            onChange={(event) =>
              setLeagueFilter(
                event.target.value
              )
            }
            disabled={
              transfers.length === 0
            }
            className="h-11 min-w-0 flex-[0_1_220px] cursor-pointer rounded-[10px] border border-gray-700 bg-gray-950 px-3 text-sm text-white outline-none transition focus:border-red-500 disabled:cursor-not-allowed disabled:opacity-60"
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

        {filteredTransfers.length === 0 && (
          <section className="rounded-[20px] border border-gray-800 bg-[linear-gradient(145deg,#111827,#0b1220)] px-6 py-[60px] text-center">
            <div className="mb-3 text-[42px]">
              🔄
            </div>

            <h2 className="text-xl font-extrabold">
              No transfer data available
            </h2>

            <p className="mx-auto mt-2 max-w-[600px] text-sm leading-relaxed text-gray-400">
              The current football-data.org
              backend does not provide a
              transfers dataset for this
              page yet.
            </p>
          </section>
        )}

        {/* TRANSFER LIST */}

        {filteredTransfers.length > 0 && (
          <div className="grid gap-[14px]">
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
                    className="flex flex-col items-start gap-4 rounded-[18px] border border-gray-800 bg-[linear-gradient(145deg,#111827,#0b1220)] p-[18px] transition hover:border-gray-700 sm:flex-row sm:items-center sm:gap-[18px]"
                  >
                    {/* PLAYER IMAGE */}

                    <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-800 text-2xl">
                      {image ? (
                        <img
                          src={image}
                          alt={player}
                          width={58}
                          height={58}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        "⚽"
                      )}
                    </div>

                    {/* PLAYER / TRANSFER INFO */}

                    <div className="min-w-0 flex-1">
                      <h2 className="m-0 text-[17px] font-extrabold text-white">
                        {player}
                      </h2>

                      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-gray-300">
                        <span>
                          {from}
                        </span>

                        <span className="font-extrabold text-red-500">
                          →
                        </span>

                        <span>
                          {to}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-gray-500">
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

                    {/* TRANSFER TYPE */}

                    <div className="shrink-0 rounded-lg bg-gray-800 px-2.5 py-1.5 text-[11px] font-bold uppercase text-gray-300">
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