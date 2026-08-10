export default function LiveMatchCard({ match }) {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800 transition">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">{match.league}</span>
        <span className="text-xs bg-red-600 px-2 py-1 rounded-full">
          LIVE
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span>{match.home}</span>
        <span className="font-bold text-lg">
          {match.homeScore} - {match.awayScore}
        </span>
        <span>{match.away}</span>
      </div>
    </div>
  );
}
