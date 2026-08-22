"use client";

import Link from "next/link";

const links = [
  ["Dashboard", "/dashboard"],
  ["Live", "/live"],
  ["Today", "/today"],
  ["Leagues", "/league"],
  ["Teams", "/team"],
  ["Players", "/player"],
  ["Search", "/search"],
  ["Favorites", "/favorites"],
  ["Settings", "/settings"],
];

export default function Sidebar({ open }) {
  return (
    <aside
      className={`overflow-hidden bg-[#111827] border-r border-[#1f2937] transition-all duration-300 ${
        open ? "w-[250px]" : "w-0"
      }`}
    >
      <div className="flex min-h-screen flex-col gap-[14px] p-5">
        {links.map(([name, href]) => (
          <Link
            key={href}
            href={href}
            className="rounded-[10px] bg-[#1f2937] p-3 text-white no-underline"
          >
            {name}
          </Link>
        ))}
      </div>
    </aside>
  );
}