export default function Footer() {
  return (
    <footer
      style={{
        background: "#111827",
        borderTop: "1px solid #1f2937",
        color: "#94a3b8",
        textAlign: "center",
        padding: 30,
      }}
    >
      © {new Date().getFullYear()} Apex Sports

      <br />

      Live Scores • Fixtures • Statistics • Football Data
    </footer>
  );
}