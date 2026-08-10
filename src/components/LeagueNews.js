"use client";

import Link from "next/link";

export default function LeagueNews({
  news = [],
}) {

  return (
    <section className="league-news">

      <h2 className="league-news-title">
        📰 League News
      </h2>

      {news.length === 0 ? (

        <div className="league-news-empty">
          No latest news available.
        </div>

      ) : (

        <div className="league-news-list">

          {news.map((article, index) => (

            <Link
              key={index}
              href={article.url}
              target="_blank"
              className="league-news-card"
            >

              <h3 className="league-news-heading">
                {article.title}
              </h3>

              <p className="league-news-description">
                {article.description}
              </p>

              <span className="league-news-source">
                {article.source}
              </span>

            </Link>

          ))}

        </div>

      )}

    </section>
  );
}