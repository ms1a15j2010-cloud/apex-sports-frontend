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
          Follow live football scores, fixtures, standings,
          match statistics, lineups, events and breaking
          football news from leagues all around the world.
        </p>

        {/* Add SearchBar here */}
        <SearchBar onSearch={onSearch} />

        <div className="hero-buttons">
          <Link
            href="/league/epl"
            className="hero-btn primary"
          >
            Browse Leagues
          </Link>

          <Link
            href="#today"
            className="hero-btn secondary"
          >
            Today's Fixtures
          </Link>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <h2>1000+</h2>
            <span>Matches Daily</span>
          </div>

          <div className="hero-stat">
            <h2>300+</h2>
            <span>Competitions</span>
          </div>

          <div className="hero-stat">
            <h2>24/7</h2>
            <span>Live Updates</span>
          </div>
        </div>
      </div>
    </section>
  );
}