export const FALLBACK_MATCHES = [
  {
    fixture: { id: "1" },
    league: { name: "Test League" },
    teams: {
      home: { name: "Manchester City" },
      away: { name: "Arsenal" },
    },
    goals: { home: 2, away: 1 },
    fixtureStatus: { short: "67'", elapsed: 67 },
  },
  {
    fixture: { id: "2" },
    league: { name: "Test League" },
    teams: {
      home: { name: "Barcelona" },
      away: { name: "Real Madrid" },
    },
    goals: { home: 0, away: 0 },
    fixtureStatus: { short: "NS", elapsed: null },
  },
  {
    fixture: { id: "3" },
    league: { name: "Test League" },
    teams: {
      home: { name: "Bayern Munich" },
      away: { name: "Dortmund" },
    },
    goals: { home: 3, away: 2 },
    fixtureStatus: { short: "FT", elapsed: null },
  },
];
