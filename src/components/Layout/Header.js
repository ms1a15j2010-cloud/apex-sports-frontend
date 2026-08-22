"use client";

import Link from "next/link";
import { Search, Menu } from "lucide-react";

export default function Header({ onMenu }) {
  return (
    <header className="sticky top-0 z-[100] flex h-[70px] items-center justify-between border-b border-[#1f2937] bg-[#111827] px-6">
      <div className="flex items-center gap-5">
        <button
          onClick={onMenu}
          className="cursor-pointer border-0 bg-transparent text-white"
          aria-label="Open menu"
        >
          <Menu size={26} />
        </button>

        <Link
          href="/dashboard"
          className="text-2xl font-bold text-[#22c55e] no-underline"
        >
          Apex Sports
        </Link>
      </div>

      <div className="flex items-center gap-5">
        <Link href="/search" aria-label="Search">
          <Search color="white" />
        </Link>
      </div>
    </header>
  );
}