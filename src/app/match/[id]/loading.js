export default function MatchLoading() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-[600px]">
        {/* Title skeleton */}
        <div className="mb-6 h-8 w-[80%] animate-pulse rounded-md bg-slate-800" />

        {/* Score skeleton */}
        <div className="mb-4 h-6 w-[40%] animate-pulse rounded-md bg-slate-800" />

        {/* Status skeleton */}
        <div className="h-[18px] w-[25%] animate-pulse rounded-md bg-slate-800" />
      </div>
    </main>
  );
}