"use client";

import Image from "next/image";
import Link from "next/link";

export default function MatchNews({ news = [] }) {
  if (!news.length) return null;

  const featured = news[0];
  const articles = news.slice(1);

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 28,
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#fff",
            fontSize: 30,
          }}
        >
          📰 Match News
        </h2>

        <div
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 40,
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          {news.length} Articles
        </div>
      </div>

      {/* Featured Article */}
      <Link
        href={featured.url || "#"}
        target="_blank"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg,#1f2937,#0f172a)",
            borderRadius: 18,
            overflow: "hidden",
            marginBottom: 28,
            border: "1px solid #374151",
          }}
        >
          {featured.image && (
            <Image
              src={featured.image}
              alt={featured.title || "Featured News"}
              width={1200}
              height={600}
              style={{
                width: "100%",
                height: 300,
                objectFit: "cover",
              }}
            />
          )}

          <div
            style={{
              padding: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  background: "#ef4444",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: 30,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                BREAKING
              </span>

              <span
                style={{
                  background: "#374151",
                  color: "#cbd5e1",
                  padding: "6px 12px",
                  borderRadius: 30,
                  fontSize: 12,
                }}
              >
                {featured.source || "Unknown"}
              </span>
            </div>

            <h2
              style={{
                color: "#fff",
                marginBottom: 16,
                lineHeight: 1.35,
              }}
            >
              {featured.title}
            </h2>

            <p
              style={{
                color: "#cbd5e1",
                lineHeight: 1.7,
                marginBottom: 20,
              }}
            >
              {featured.description}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16,
                marginTop: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 18,
                  flexWrap: "wrap",
                  color: "#94a3b8",
                  fontSize: 14,
                }}
              >
                <span>👤 {featured.author || "Staff Writer"}</span>

                <span>
                  🕒 {featured.date || featured.publishedAt || "Today"}
                </span>
              </div>

              <div
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  padding: "10px 18px",
                  borderRadius: 12,
                  fontWeight: 700,
                }}
              >
                Read Full Story →
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Other News */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(330px,1fr))",
          gap: 22,
        }}
      >
        {articles.map((article, index) => (
          <Link
            key={index}
            href={article.url || "#"}
            target="_blank"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                background: "#1f2937",
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid #374151",
                transition: "transform .25s ease, box-shadow .25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 18px 30px rgba(0,0,0,.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {article.image && (
                <Image
                  src={article.image}
                  alt={article.title || "Match News"}
                  width={800}
                  height={450}
                  style={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                  }}
                />
              )}

              <div
                style={{
                  padding: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 10,
                    marginBottom: 14,
                  }}
                >
                  <NewsBadge
                    color="#2563eb"
                    text={article.category || "Football"}
                  />

                  <div
                    style={{
                      color: "#94a3b8",
                      fontSize: 12,
                    }}
                  >
                    🕒 {article.date || article.publishedAt || "Today"}
                  </div>
                </div>

                <h3
                  style={{
                    margin: "0 0 14px",
                    color: "#fff",
                    fontSize: 21,
                    lineHeight: 1.45,
                  }}
                >
                  {article.title}
                </h3>

                <p
                  style={{
                    color: "#cbd5e1",
                    lineHeight: 1.7,
                    fontSize: 15,
                    marginBottom: 20,
                  }}
                >
                  {article.description || "No description available."}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <span
                      style={{
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      {article.source || "Unknown Source"}
                    </span>

                    <span
                      style={{
                        color: "#94a3b8",
                        fontSize: 12,
                        marginTop: 4,
                      }}
                    >
                      👤 {article.author || "Staff Reporter"}
                    </span>
                  </div>

                  <div
                    style={{
                      background: "#22c55e",
                      color: "#fff",
                      padding: "8px 14px",
                      borderRadius: 10,
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    Read →
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 30,
          textAlign: "center",
          color: "#94a3b8",
          fontSize: 14,
        }}
      >
        News updates are refreshed automatically whenever new articles become available.
      </div>
    </section>
  );
}

function NewsBadge({ color, text }) {
  return (
    <div
      style={{
        background: color,
        color: "#fff",
        padding: "6px 12px",
        borderRadius: 30,
        fontSize: 12,
        fontWeight: 700,
        whiteSpace: "nowrap",
        letterSpacing: ".4px",
      }}
    >
      {text}
    </div>
  );
}