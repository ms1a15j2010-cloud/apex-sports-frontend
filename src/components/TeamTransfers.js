"use client";

import Image from "next/image";
import Link from "next/link";

export default function TeamTransfers({
  transfers = [],
  available = false,
}) {
  const hasTransfers =
    available &&
    Array.isArray(transfers) &&
    transfers.length > 0;

  return (
    <section
      id="transfers"
      className="mb-[30px] rounded-[20px] border border-slate-800 bg-gradient-to-br from-gray-900 to-slate-900 p-[30px]"
    >
      {/* HEADER */}

      <div className="mb-[25px]">
        <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[28px] text-white">
          🔄 Latest Transfers
        </h2>

        <p className="mt-2 text-sm leading-[1.6] text-slate-400">
          Player transfer activity associated
          with this team.
        </p>
      </div>

      {/* AVAILABLE TRANSFERS */}

      {hasTransfers ? (
        <div className="grid gap-4">
          {transfers
            .slice(0, 15)
            .map((transfer, index) => {
              const player =
                transfer?.player || {};

              const move =
                transfer?.transfers?.[0] ||
                transfer;

              const from =
                move?.teams?.out ||
                {};

              const to =
                move?.teams?.in ||
                {};

              const type =
                move?.type ||
                "Transfer";

              const date =
                move?.date ||
                null;

              const isLoan =
                type
                  .toLowerCase()
                  .includes("loan");

              return (
                <article
                  key={
                    player?.id ??
                    `transfer-${index}`
                  }
                  className="rounded-2xl border border-[#293548] bg-gray-800 p-5"
                >
                  <div className="grid grid-cols-[70px_1fr_auto] items-center gap-[18px]">
                    {/* PLAYER */}

                    <div className="flex justify-center">
                      {player?.photo ? (
                        <Image
                          src={
                            player.photo
                          }
                          alt={
                            player?.name ||
                            "Player"
                          }
                          width={60}
                          height={60}
                          unoptimized
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gray-900 text-[22px] font-black text-green-500">
                          {player?.name
                            ?.slice(
                              0,
                              1
                            )
                            ?.toUpperCase() ||
                            "P"}
                        </div>
                      )}
                    </div>

                    {/* DETAILS */}

                    <div className="min-w-0">
                      {player?.id ? (
                        <Link
                          href={`/player/${player.id}`}
                          className="text-[18px] font-extrabold text-white no-underline hover:text-green-500"
                        >
                          {player?.name ||
                            "Unknown Player"}
                        </Link>
                      ) : (
                        <div className="text-[18px] font-extrabold text-white">
                          {player?.name ||
                            "Unknown Player"}
                        </div>
                      )}

                      <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[13px] text-slate-300">
                        <span>
                          {from?.name ||
                            "Unknown Team"}
                        </span>

                        <span className="text-[20px] font-black text-green-500">
                          →
                        </span>

                        <span>
                          {to?.name ||
                            "Unknown Team"}
                        </span>
                      </div>

                      {date && (
                        <div className="mt-2 text-xs text-slate-500">
                          📅{" "}
                          {new Date(
                            date
                          ).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    {/* TYPE */}

                    <div
                      className={`whitespace-nowrap rounded-full px-[15px] py-2 text-xs font-extrabold text-white ${
                        isLoan
                          ? "bg-blue-600"
                          : "bg-green-500"
                      }`}
                    >
                      {type}
                    </div>
                  </div>
                </article>
              );
            })}
        </div>
      ) : (
        /* UNAVAILABLE */

        <div className="rounded-[18px] border border-[#293548] bg-gray-800 p-10 text-center">
          <div className="mb-[18px] text-[54px]">
            🔄
          </div>

          <h3 className="mb-2.5 text-[21px] text-white">
            Transfer History Unavailable
          </h3>

          <p className="mx-auto m-0 max-w-[650px] text-sm leading-[1.8] text-slate-400">
            The current football-data.org
            source does not provide the
            team transfer-history data that
            was previously supplied by
            API-Football.
          </p>

          <div className="mt-4 inline-block rounded-full bg-gray-900 px-3 py-[7px] text-[11px] font-bold text-slate-500">
            Source limitation
          </div>
        </div>
      )}

      {/* SOURCE */}

      <div className="mt-[18px] border-t border-[#293548] pt-4 text-xs text-slate-500">
        Source: football-data.org
      </div>
    </section>
  );
}