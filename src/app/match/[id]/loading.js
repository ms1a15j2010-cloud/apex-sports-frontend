export default function MatchLoading() {
  return (
    <main
      style={{
        padding: "2rem",
        background: "#020617",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {/* Title skeleton */}
        <div
          style={{
            height: 32,
            width: "80%",
            background: "#1e293b",
            borderRadius: 6,
            marginBottom: 24,
          }}
        />

        {/* Score skeleton */}
        <div
          style={{
            height: 24,
            width: "40%",
            background: "#1e293b",
            borderRadius: 6,
            marginBottom: 16,
          }}
        />

        {/* Status skeleton */}
        <div
          style={{
            height: 18,
            width: "25%",
            background: "#1e293b",
            borderRadius: 6,
          }}
        />
      </div>
    </main>
  );
}
