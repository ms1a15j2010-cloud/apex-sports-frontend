"use client";

export default function LeagueStats({
  stats = {},
}) {

  return (
    <section className="league-stats">

      <h2 className="league-stats-title">
        📊 League Statistics
      </h2>

      <div className="league-stats-grid">

        <div className="league-stat-card">
          <span>⚽ Goals</span>
          <strong>{stats.goals || 0}</strong>
        </div>

        <div className="league-stat-card">
          <span>🎮 Matches</span>
          <strong>{stats.matches || 0}</strong>
        </div>

        <div className="league-stat-card">
          <span>🟨 Yellow Cards</span>
          <strong>{stats.yellowCards || 0}</strong>
        </div>

        <div className="league-stat-card">
          <span>🟥 Red Cards</span>
          <strong>{stats.redCards || 0}</strong>
        </div>

        <div className="league-stat-card">
          <span>🥅 Clean Sheets</span>
          <strong>{stats.cleanSheets || 0}</strong>
        </div>

        <div className="league-stat-card">
          <span>🎯 Assists</span>
          <strong>{stats.assists || 0}</strong>
        </div>

      </div>

    </section>
  );
}