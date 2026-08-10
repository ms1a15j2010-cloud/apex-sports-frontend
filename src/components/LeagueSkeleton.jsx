export default function LeagueSkeleton() {
  return (
    <div className="league-skeleton">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="league-skeleton-card"
        />
      ))}
    </div>
  );
}