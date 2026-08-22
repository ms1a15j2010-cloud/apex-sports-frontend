"use client";

import { useEffect, useState } from "react";

export default function FollowMatch({
  match,
}) {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (!match) return;

    const saved = JSON.parse(
      localStorage.getItem("followedMatches") || "[]"
    );

    setFollowing(saved.includes(match.fixture.id));
  }, [match]);

  function toggleFollow() {
    const saved = JSON.parse(
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
    <section className="mb-[25px] rounded-[18px] bg-gray-900 p-6">
      <h2 className="mb-5">
        Follow Match
      </h2>

      <button
        onClick={toggleFollow}
        className={`
          cursor-pointer
          rounded-xl
          border-0
          px-6
          py-[14px]
          text-base
          font-bold
          text-white
          transition
          ${
            following
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-500 hover:bg-green-600"
          }
        `}
      >
        {following
          ? "★ Following"
          : "☆ Follow Match"}
      </button>

      <p className="mt-[15px] text-slate-400">
        Save this match to quickly find it later.
      </p>
    </section>
  );
}