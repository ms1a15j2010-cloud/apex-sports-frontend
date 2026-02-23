export default function Scoreboard({ matches }) {
  return (
    <div className="scoreboard">
      <div className="scoreboard-header">
        <span>Match</span>
        <span>Score</span>
        <span>Status</span>
      </div>

      {matches.map((m) => (
        <a
          key={m.id}
          href={`/match/${m.id}`}
          className="scoreboard-row"
        >
          <span>{m.home} vs {m.away}</span>
          <span>{m.goalsHome} – {m.goalsAway}</span>
          <span className={`status ${m.status.toLowerCase()}`}>
            {m.status}
          </span>
        </a>
      ))}
    </div>
  );
}
