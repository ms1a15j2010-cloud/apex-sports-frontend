"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="mb-[25px] text-[14px] text-slate-400">
      <Link
        href="/"
        className="text-sky-400 hover:underline no-underline"
      >
        Home
      </Link>

      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;

        return (
          <span key={href}>
            {" / "}
            {isLast ? (
              <span className="text-white font-semibold capitalize">
                {decodeURIComponent(segment).replaceAll("-", " ")}
              </span>
            ) : (
              <Link
                href={href}
                className="text-sky-400 hover:underline no-underline capitalize"
              >
                {decodeURIComponent(segment).replaceAll("-", " ")}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}