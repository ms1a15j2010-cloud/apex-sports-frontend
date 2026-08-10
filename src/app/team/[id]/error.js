"use client";

export default function Error({
  error,
  reset,
}) {
  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "60px auto",
        padding: "20px",
        color: "white",
      }}
    >
      <div
        style={{
          background: "#7f1d1d",
          padding: "40px",
          borderRadius: "16px",
          textAlign: "center",
        }}
      >
        <h1>Something went wrong</h1>

        <p
          style={{
            marginTop: 15,
            color: "#ddd",
          }}
        >
          {error?.message}
        </p>

        <button
          onClick={() => reset()}
          style={{
            marginTop: 25,
            padding: "12px 30px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Try Again
        </button>
      </div>
    </main>
  );
}