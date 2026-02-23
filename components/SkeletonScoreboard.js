export default function SkeletonScoreboard() {
  return (
    <div style={{ padding: "1rem" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "1rem",
            padding: "0.75rem",
            marginBottom: "0.5rem",
            background: "#0f172a",
            borderRadius: 6,
          }}
        >
          <div className="skeleton" />
          <div className="skeleton" />
          <div className="skeleton" />
        </div>
      ))}
    </div>
  );
}
