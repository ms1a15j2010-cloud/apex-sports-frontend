export default function LeagueSkeleton() {
  return (
    <div style={{ maxWidth: 900, margin: "2rem auto" }}>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            background: "#020617",
            border: "1px solid #1e293b",
            borderRadius: 8,
            height: 64,
            marginBottom: 12,
            opacity: 0.7
          }}
        />
      ))}
    </div>
  );
}