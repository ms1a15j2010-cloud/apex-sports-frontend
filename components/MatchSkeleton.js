export default function MatchSkeleton() {
  const line = {
    height: 18,
    background: "#1e293b",
    borderRadius: 6,
    marginBottom: 12,
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ ...line, width: "60%" }} />
      <div style={{ ...line, width: "40%" }} />
      <div style={{ ...line, width: "50%" }} />
      <div style={{ ...line, width: "30%" }} />
    </div>
  );
}
