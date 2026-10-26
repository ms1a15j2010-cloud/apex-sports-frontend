"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Live", href: "/live" },
    { name: "Fixtures", href: "/fixtures/epl" },
    { name: "Results", href: "/results/epl" },
    { name: "Standings", href: "/standings/epl" },
    { name: "Top Scorers", href: "/top-scorers/epl" },
    { name: "Leagues", href: "/leagues" },
    { name: "Articles", href: "/articles" },
  ];

  return (
    <header className="sticky top-0 z-[1000] bg-[#020617] border-b border-[#1e293b]">
      <div className="max-w-[1400px] mx-auto h-[70px] flex items-center justify-between px-[20px] md:justify-end">
        <Link
          href="/"
          className="shrink-0 text-white text-xl sm:text-2xl font-extrabold tracking-tight no-underline md:hidden"
          aria-label="Apex Sports home"
        >
          <span className="text-green-500">▲</span> Apex Sports
        </Link>

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
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          ☰
        </button>
      </div>

      {open && (
        <div id="mobile-navigation" className="md:hidden bg-[#111827] p-[20px] flex flex-col gap-[15px]">
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