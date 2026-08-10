"use client";

import { useEffect, useState } from "react";

export default function MatchRefresh({
  interval = 30000,
}) {
  const [seconds, setSeconds] = useState(
    interval / 1000
  );

  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          window.location.reload();
          return interval / 1000;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [interval]);

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 18,
        padding: 18,
        marginBottom: 25,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <strong>Live Match Auto Refresh</strong>

        <div
          style={{
            color: "#94a3b8",
            marginTop: 6,
          }}
        >
          Match data refreshes automatically every{" "}
          {interval / 1000} seconds.
        </div>
      </div>

      <div
        style={{
          background: "#22c55e",
          color: "#fff",
          padding: "12px 18px",
          borderRadius: 12,
          fontWeight: "bold",
          minWidth: 70,
          textAlign: "center",
        }}
      >
        {seconds}s
      </div>
    </section>
  );
}