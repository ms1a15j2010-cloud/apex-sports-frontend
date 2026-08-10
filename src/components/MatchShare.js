"use client";

export default function MatchShare({
  match,
}) {
  if (!match) return null;

  const url =
    typeof window !== "undefined"
      ? window.location.href
      : "";

  const title = `${match.home.name} vs ${match.away.name} | Apex Sports`;

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: title,
          url,
        });
      } catch {}
    } else {
      navigator.clipboard.writeText(url);

      alert("Match link copied!");
    }
  };

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 18,
        padding: 24,
        marginBottom: 25,
      }}
    >
      <h2
        style={{
          marginBottom: 20,
        }}
      >
        Share Match
      </h2>

      <div
        style={{
          display: "flex",
          gap: 15,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={share}
          style={button}
        >
          📤 Share
        </button>

        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title
          )}&url=${encodeURIComponent(url)}`}
          target="_blank"
          style={buttonLink}
        >
          𝕏 Twitter
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`}
          target="_blank"
          style={buttonLink}
        >
          Facebook
        </a>

        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
            `${title} ${url}`
          )}`}
          target="_blank"
          style={buttonLink}
        >
          WhatsApp
        </a>
      </div>
    </section>
  );
}

const button = {
  padding: "12px 22px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  background: "#22c55e",
  color: "#fff",
  fontWeight: "bold",
};

const buttonLink = {
  padding: "12px 22px",
  borderRadius: 10,
  textDecoration: "none",
  background: "#1f2937",
  color: "#fff",
  fontWeight: "bold",
};