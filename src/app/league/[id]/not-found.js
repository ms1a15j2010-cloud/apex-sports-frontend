import Link from "next/link";

export default function NotFound() {
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
          background: "#111827",
          padding: "50px",
          borderRadius: "16px",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            marginBottom: "20px",
          }}
        >
          404
        </h1>

        <h2>Page Not Found</h2>

        <p
          style={{
            color: "#9ca3af",
            marginTop: "10px",
          }}
        >
          The page you are looking for doesn't exist.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-block",
            marginTop: "30px",
            background: "#2563eb",
            color: "white",
            padding: "12px 30px",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}