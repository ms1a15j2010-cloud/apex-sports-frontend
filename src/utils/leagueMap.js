export const leagueMap = {
  'epl': 39,
  'fa-cup': 45,
  'premier-league': 39,
  'laliga': 140,
  'la-liga': 140,
  'serie-a': 135,
  'bundesliga': 78,
  'ligue-1': 61,
  'champions-league': 2,
  'uefa-champions-league': 2,
  'europa-league': 3,
  'world-cup': 1,
  'euro': 4,
  'copa-america': 5,
  'africa-cup': 6,
};

export function getLeagueId(slug) {
  if (!slug) return null;
  
  // If it's already a number, return it
  if (!isNaN(slug)) {
    return Number(slug);
  }
  
  // Convert to lowercase and look up
  const key = slug.toLowerCase().trim();
  return leagueMap[key] || null;
}

export function getLeagueSlug(id) {
  // Find the first key with this value
  for (const [key, value] of Object.entries(leagueMap)) {
    if (value === Number(id)) {
      return key;
    }
  }
  return null;
}