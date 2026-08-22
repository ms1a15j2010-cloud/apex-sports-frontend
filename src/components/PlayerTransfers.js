"use client";

import Image from "next/image";

export default function PlayerTransfers({
  transfers = [],
  available = false,
}) {
  return (
    <section className="mb-[30px] rounded-[20px] border border-[#1e293b] bg-gradient-to-br from-[#111827] to-[#0f172a] p-[30px]">
      <div className="mb-[25px]">
        <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[1.2px] text-red-500">
          ⚽ Apex Sports
        </div>

        <h2 className="m-0 text-[26px] text-white">
          🔄 Transfer History
        </h2>

        <p className="m-[8px_0_0] text-[14px] text-slate-400">
          Player transfer and club movement history.
        </p>
      </div>

      {!available ? (
        <div className="rounded-2xl border border-[#293548] bg-[#1f2937] p-[35px] text-center">
          <div className="mb-[15px] text-[42px]">
            🔄
          </div>

          <h3 className="m-[0_0_10px] text-[20px] text-white">
            Transfer History Unavailable
          </h3>

          <p className="m-0 text-[14px] leading-[1.7] text-slate-400">
            Transfer history is not provided by the current
            football-data.org data source.
          </p>

          <div className="mt-[18px] inline-block rounded-full bg-[#0f172a] px-[14px] py-2 text-[12px] font-bold text-slate-500">
            Source: football-data.org
          </div>
        </div>
      ) : !Array.isArray(transfers) ||
        transfers.length === 0 ? (
        <div className="rounded-2xl bg-[#1f2937] p-[30px] text-center text-slate-400">
          No transfer history available.
        </div>
      ) : (
        <div className="grid gap-[18px]">
          {transfers.map((item, index) => {
            const move =
              item?.transfers?.[0] ||
              item ||
              {};

            const fromTeam =
              move?.teams?.out ||
              move?.from ||
              {};

            const toTeam =
              move?.teams?.in ||
              move?.to ||
              {};

            const fromLogo =
              fromTeam?.logo ||
              fromTeam?.crest ||
              null;

            const toLogo =
              toTeam?.logo ||
              toTeam?.crest ||
              null;

            return (
              <div
                key={
                  move?.date ||
                  move?.id ||
                  index
                }
                className="rounded-[18px] border border-[#293548] bg-[#1f2937] p-[22px]"
              >
                <div className="mb-[18px] text-[14px] text-slate-400">
                  {move?.date ||
                    move?.transferDate ||
                    "Unknown Date"}
                </div>

                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-5 max-[600px]:grid-cols-1">
                  <TeamTransferSide
                    label="From"
                    team={fromTeam}
                    logo={fromLogo}
                  />

                  <div className="text-center max-[600px]:rotate-90">
                    <div className="text-[28px]">
                      ➜
                    </div>

                    <div className="mt-2 text-[13px] font-bold text-green-500 max-[600px]:hidden">
                      {move?.type || "-"}
                    </div>
                  </div>

                  <TeamTransferSide
                    label="To"
                    team={toTeam}
                    logo={toLogo}
                    align="right"
                  />
                </div>

                <div className="mt-[22px] flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-slate-300">
                  <span>
                    <strong>Season:</strong>{" "}
                    {move?.season || "-"}
                  </span>

                  <span>
                    <strong>Type:</strong>{" "}
                    {move?.type || "-"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function TeamTransferSide({
  label,
  team = {},
  logo,
  align = "left",
}) {
  const isRight = align === "right";

  const name =
    team?.name ||
    "Unknown Club";

  return (
    <div
      className={`flex min-w-0 items-center gap-3 ${
        isRight
          ? "justify-end text-right"
          : "justify-start text-left"
      } max-[600px]:justify-center max-[600px]:text-center`}
    >
      {!isRight && (
        <TeamLogo
          src={logo}
          name={name}
        />
      )}

      <div
        className={
          isRight
            ? "text-right max-[600px]:text-center"
            : "text-left max-[600px]:text-center"
        }
      >
        <div className="mb-[5px] text-[13px] text-slate-400">
          {label}
        </div>

        <strong className="break-words text-white">
          {name}
        </strong>
      </div>

      {isRight && (
        <TeamLogo
          src={logo}
          name={name}
        />
      )}
    </div>
  );
}

function TeamLogo({
  src,
  name,
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={45}
        height={45}
        unoptimized
        className="h-[45px] w-[45px] shrink-0 object-contain"
      />
    );
  }

  return (
    <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-[10px] bg-[#0f172a] text-[12px] font-extrabold text-green-500">
      FC
    </div>
  );
}