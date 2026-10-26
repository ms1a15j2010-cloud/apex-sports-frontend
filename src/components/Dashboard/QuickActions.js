"use client";

import Link from "next/link";

const actions = [
  {
    title: "Live Matches",
    href: "/live",
    icon: "🔴",
    color: "border-red-500",
    textColor: "text-red-500",
  },
  {
    title: "Today's Matches",
    href: "/today",
    icon: "📅",
    color: "border-blue-500",
    textColor: "text-blue-500",
  },
  {
    title: "Leagues",
    href: "/leagues",
    icon: "🏆",
    color: "border-amber-500",
    textColor: "text-amber-500",
  },
  {
    title: "Search",
    href: "/search",
    icon: "🔍",
    color: "border-cyan-500",
    textColor: "text-cyan-500",
  },
];

export default function QuickActions() {
  return (
    <section className="rounded-[20px] bg-[#111827] p-6 text-white sm:p-7">
      <h2 className="mb-6 text-2xl font-bold sm:text-[28px]">
        ⚡ Quick Actions
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
        {actions.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-white no-underline"
          >
            <div
              className={`cursor-pointer rounded-2xl border-2 ${item.color} bg-[#1f2937] p-6 text-center transition duration-300 hover:-translate-y-1 hover:bg-[#273449]`}
            >
              <div className="mb-3 text-[42px]">
                {item.icon}
              </div>

              <h3 className="mb-2 text-lg font-semibold">
                {item.title}
              </h3>

              <span
                className={`font-bold ${item.textColor}`}
              >
                Open →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}