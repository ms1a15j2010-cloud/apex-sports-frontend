// components/MatchSummary.js

export default function MatchSummary({ match }) {
  if (!match) return null;

  const home = match.home;
  const away = match.away;
  const goals = match.goals;
  const fixture = match.fixture;
  const league = match.league;
  const status = match.status;

  const winner =
  (goals?.home ?? 0) > (goals?.away ?? 0)
    ? home?.name || "-"
    : (goals?.away ?? 0) > (goals?.home ?? 0)
    ? away?.name || "-"
    : "Draw";

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 16,
        padding: 24,
        marginBottom: 25,
      }}
    >
      <h2
        style={{
          marginBottom: 20,
          fontSize: 24,
        }}
      >
        Match Summary
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 18,
        }}
      >
        <SummaryCard
          title="Competition"
          value={league?.name || "-"}
        />

        <SummaryCard
          title="Round"
          value={league?.round || "-"}
        />

        <SummaryCard
          title="Status"
          value={`${status?.short || "-"} ${
            status?.elapsed ? `(${status.elapsed}')` : ""
          }`}
        />

        <SummaryCard
          title="Winner"
          value={winner}
        />

        <SummaryCard
          title="Final Score"
          value={`${goals?.home ?? "-"} - ${goals?.away ?? "-"}`}
        />

        <SummaryCard
          title="Referee"
          value={fixture?.referee || "TBA"}
        />

        <SummaryCard
          title="Venue"
          value={fixture?.venue?.name || "-"}
        />

        <SummaryCard
          title="City"
          value={fixture?.venue?.city || "-"}
        />

        <SummaryCard
          title="Kick Off"
          value={
            fixture?.date
              ? new Date(fixture.date).toLocaleString()
              : "-"
          }
        />

        <SummaryCard
          title="Season"
          value={league?.season || "-"}
        />
      </div>
    </section>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div
      style={{
        background: "#1f2937",
        padding: 16,
        borderRadius: 12,
        border: "1px solid #374151",
      }}
    >
      <div
        style={{
          color: "#9ca3af",
          fontSize: 13,
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#fff",
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        {value}
      </div>
    </div>
  );
}