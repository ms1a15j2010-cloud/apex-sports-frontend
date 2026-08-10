"use client";

export default function MatchInfo({ match }) {
  if (!match) return null;

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 18,
        padding: 25,
        marginBottom: 30,
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: 20,
        }}
      >
        Match Information
      </h2>

      <table
        width="100%"
        cellPadding="12"
      >
        <tbody>
          <tr>
            <td>📅 Kick-off</td>
            <td>{new Date(match.fixture.date).toLocaleString()}</td>
          </tr>

          <tr>
            <td>🏟 Stadium</td>
            <td>{match.fixture.venue.name || "Unknown"}</td>
          </tr>

          <tr>
            <td>📍 City</td>
            <td>{match.fixture.venue.city || "Unknown"}</td>
          </tr>

          <tr>
            <td>👨‍⚖️ Referee</td>
            <td>{match.fixture.referee || "TBA"}</td>
          </tr>

          <tr>
            <td>🌍 Timezone</td>
            <td>{match.fixture.timezone}</td>
          </tr>

          <tr>
            <td>🏆 Season</td>
            <td>{match.league.season}</td>
          </tr>

          <tr>
            <td>⚽ Round</td>
            <td>{match.league.round}</td>
          </tr>

          <tr>
            <td>League</td>
            <td>{match.league.name}</td>
          </tr>

          <tr>
            <td>Country</td>
            <td>{match.league.country}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}