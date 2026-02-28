"use client";

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
            animation: "pulse 1.5s infinite",
          }}
        />
      ))}

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}