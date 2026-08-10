"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname
    .split("/")
    .filter(Boolean);

  return (
    <nav
      style={{
        marginBottom: "25px",
        fontSize: "14px",
        color: "#94a3b8",
      }}
    >
      <Link
        href="/"
        style={{
          color: "#38bdf8",
          textDecoration: "none",
        }}
      >
        Home
      </Link>

      {segments.map((segment, index) => {
        const href =
          "/" + segments.slice(0, index + 1).join("/");

        const isLast =
          index === segments.length - 1;

        return (
          <span key={href}>
            {" "}
            /{" "}
            {isLast ? (
              <span
                style={{
                  color: "#fff",
                  fontWeight: 600,
                  textTransform: "capitalize",
                }}
              >
                {decodeURIComponent(segment).replaceAll("-", " ")}
              </span>
            ) : (
              <Link
                href={href}
                style={{
                  color: "#38bdf8",
                  textDecoration: "none",
                  textTransform: "capitalize",
                }}
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