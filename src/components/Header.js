"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Live", href: "/live" },
    { name: "Fixtures", href: "/fixtures/epl" },
    { name: "Results", href: "/results/epl" },
    { name: "Standings", href: "/standings/39" },
    { name: "Top Scorers", href: "/top-scorers/39" },
  ];

  return (
    <header className="sticky top-0 z-[1000] bg-[#020617] border-b border-[#1e293b]">
      <div className="max-w-[1400px] mx-auto h-[70px] flex items-center justify-end px-[20px]">
        {/* Commented brand logo preserved */}
        {/* <Link
          href="/"
          className="text-white text-[28px] font-bold no-underline"
        >
          ▲ Apex Sports
        </Link> */}

        <nav className="hidden md:flex gap-[25px]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[#cbd5e1] hover:text-white font-medium no-underline transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="block md:hidden bg-transparent text-white border-none text-[26px] cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#111827] p-[20px] flex flex-col gap-[15px]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white no-underline hover:text-[#cbd5e1] transition-colors"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}