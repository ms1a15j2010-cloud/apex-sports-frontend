export default function Loading() {
  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "50px auto",
        padding: "20px",
        color: "white",
      }}
    >
      <div
        style={{
          background: "#111827",
          padding: "40px",
          borderRadius: "16px",
          textAlign: "center",
        }}
      >
        <h2>Loading...</h2>

        <p>Please wait while data is loading.</p>
      </div>
    </main>
  );
}