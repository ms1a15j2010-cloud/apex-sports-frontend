"use client";

import Link from "next/link";
import SearchBar from "./SearchBar"; // Import SearchBar

export default function HomeHero({ onSearch }) { // Accept onSearch prop
  return (
    <section className="hero-section">
      <div className="hero-content">
        <span className="hero-badge">
          ⚽ LIVE FOOTBALL SCORES
        </span>

        <h1>
          Welcome to
          <span> Apex Sports</span>
        </h1>

        <p>
          Follow live football scores, fixtures, results, league
          tables, player rankings and match statistics for the
          football competitions currently covered by Apex Sports.
        </p>

        {/* Add SearchBar here */}
        <SearchBar onSearch={onSearch} />

        <div className="hero-buttons">
          <Link
            href="/leagues"
            className="hero-btn primary"
          >
            Browse Leagues
          </Link>

          <Link
            href="/today"
            className="hero-btn secondary"
          >
            Today's Matches
          </Link>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <h2>Live</h2>
            <span>Scores &amp; Match Status</span>
          </div>

          <div className="hero-stat">
            <h2>Season</h2>
            <span>Fixtures &amp; Standings</span>
          </div>

          <div className="hero-stat">
            <h2>Stats</h2>
            <span>Players &amp; Teams</span>
          </div>
        </div>
      </div>
    </section>
  );
}