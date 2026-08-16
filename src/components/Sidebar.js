"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    title: "MAIN",
    items: [
      { name: "Home", href: "/", icon: "🏠" },
      { name: "Live Scores", href: "/live", icon: "🔴" },
      { name: "Fixtures", href: "/fixtures/epl", icon: "📅" },
      { name: "Results", href: "/results/epl", icon: "✅" },
      { name: "Standings", href: "/standings/epl", icon: "📊" },
      { name: "Top Scorers", href: "/top-scorers/epl", icon: "⚽" },
    ],
  },
  {
    title: "ENGLAND",
    items: [
      {
        name: "Premier League",
        href: "/league/epl",
        icon: "🏆",
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="apex-sidebar fixed left-0 top-0 z-50 h-screen w-[280px] overflow-y-auto border-r border-slate-800 bg-slate-950 pb-[50px] text-white"
    >
      <div className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950 p-5 text-[26px] font-bold">
        ⚽ Apex Sports
      </div>

      {sections.map((section) => (
        <div key={section.title}>
          <div className="px-5 pb-2.5 pt-[18px] text-[13px] font-bold uppercase text-slate-400">
            {section.title}
          </div>

          {section.items.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-[14px] border-l-4 px-5 py-3 no-underline transition-all duration-200 ${
                  active
                    ? "border-green-500 bg-slate-800 font-bold text-green-500"
                    : "border-transparent font-medium text-slate-200"
                }`}
              >
                <span className="w-6 text-center">{item.icon}</span>

                {item.name}
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}