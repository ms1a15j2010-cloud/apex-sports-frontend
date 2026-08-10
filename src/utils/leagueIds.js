// frontend/src/utils/leagueIds.js
export const LEAGUE_ID_MAP = {
  'epl': '39',
  'pl': '39',
  'premier-league': '39',
  'premier_league': '39',
  'championship': '40',
  'fa-cup': '45',
  'league-cup': '48',
  'bundesliga': '78',
  'la-liga': '140',
  'serie-a': '135',
  'ligue-1': '61',
  'eredivisie': '88',
  'primeira-liga': '94',
  'mls': '253',
  'champions-league': '2',
  'europa-league': '3',
};

export function getLeagueId(slug) {
  return LEAGUE_ID_MAP[slug?.toLowerCase()] || slug;
}