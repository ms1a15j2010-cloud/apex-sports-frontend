"use client";

export default function Events({ events }) {
  if (!events?.length) {
    return (
      <section className="mt-[30px] rounded-[18px] bg-gray-900 p-7 text-center text-white">
        No events available.
      </section>
    );
  }

  const badge = (type, detail) => {
    const t = (type || "").toLowerCase();
    const d = (detail || "").toLowerCase();

    if (d.includes("own goal")) {
      return {
        icon: "🥅",
        color: "#ea580c",
      };
    }

    if (t.includes("goal")) {
      return {
        icon: "⚽",
        color: "#16a34a",
      };
    }

    if (d.includes("yellow")) {
      return {
        icon: "🟨",
        color: "#ca8a04",
      };
    }

    if (d.includes("red")) {
      return {
        icon: "🟥",
        color: "#dc2626",
      };
    }

    if (
      t.includes("subst") ||
      t.includes("substitution")
    ) {
      return {
        icon: "🔄",
        color: "#2563eb",
      };
    }

    if (
      t.includes("penalty") ||
      d.includes("penalty")
    ) {
      return {
        icon: "❌",
        color: "#b91c1c",
      };
    }

    if (t.includes("var")) {
      return {
        icon: "📺",
        color: "#9333ea",
      };
    }

    return {
      icon: "•",
      color: "#475569",
    };
  };

  return (
    <section className="mt-[30px] rounded-[18px] bg-gray-900 p-7">
      <h2 className="mb-[25px] text-[28px]">
        📝 Match Events
      </h2>

      <div className="grid gap-4">
        {events.map((event, index) => {
          const b = badge(
            event.type,
            event.detail
          );

          return (
            <div
              key={`${event.time?.elapsed}-${event.type}-${event.player?.id || index}`}
              className="
                flex
                items-center
                gap-[18px]
                rounded-xl
                bg-slate-800
                p-[18px]
              "
            >
              <div className="w-[70px] shrink-0 text-center font-bold text-green-500">
                {event.time?.elapsed ?? "-"}
              </div>

              <div
                className="
                  flex
                  h-[46px]
                  w-[46px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-[22px]
                "
                style={{
                  background: b.color,
                }}
              >
                {b.icon}
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-[18px] font-bold">
                  {event.player?.name ||
                    "Unknown Player"}
                </div>

                <div className="mt-1 text-slate-400">
                  {event.team?.name ||
                    "Unknown Team"}
                </div>

                <div className="mt-2 text-slate-200">
                  {event.type || "Event"}

                  {event.detail && (
                    <>
                      {" • "}
                      {event.detail}
                    </>
                  )}
                </div>

                {event.assist?.name && (
                  <div className="mt-1.5 text-green-500">
                    Assist: {event.assist.name}
                  </div>
                )}

                {event.comments && (
                  <div className="mt-1.5 text-[13px] text-slate-400">
                    {event.comments}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}