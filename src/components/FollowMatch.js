"use client";

import { useEffect, useState } from "react";

export default function FollowMatch({
  match,
}) {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (!match) return;

    const saved =
      JSON.parse(
        localStorage.getItem("followedMatches") || "[]"
      );

    setFollowing(saved.includes(match.fixture.id));
  }, [match]);

  function toggleFollow() {
    const saved =
      JSON.parse(
        localStorage.getItem("followedMatches") || "[]"
      );

    let updated;

    if (saved.includes(match.fixture.id)) {
      updated = saved.filter(
        (id) => id !== match.fixture.id
      );

      setFollowing(false);
    } else {
      updated = [...saved, match.fixture.id];

      setFollowing(true);
    }

    localStorage.setItem(
      "followedMatches",
      JSON.stringify(updated)
    );
  }

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 18,
        padding: 24,
        marginBottom: 25,
      }}
    >
      <h2
        style={{
          marginBottom: 20,
        }}
      >
        Follow Match
      </h2>

      <button
        onClick={toggleFollow}
        style={{
          padding: "14px 24px",
          borderRadius: 12,
          border: "none",
          cursor: "pointer",
          fontSize: 16,
          fontWeight: "bold",
          background: following
            ? "#dc2626"
            : "#22c55e",
          color: "#fff",
        }}
      >
        {following
          ? "★ Following"
          : "☆ Follow Match"}
      </button>

      <p
        style={{
          marginTop: 15,
          color: "#94a3b8",
        }}
      >
        Save this match to quickly find it later.
      </p>
    </section>
  );
}