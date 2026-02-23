const API_BASE =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL_PROD // deployed backend URL
    : process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getHelloMessage() {
  try {
    const res = await fetch(`${API_BASE}/api/hello`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Hello API fetch failed, status:", res.status);
      throw new Error("Failed to fetch hello message");
    }

    return res.json();
  } catch (err) {
    console.error("Hello API network error:", err);
    throw err;
  }
}

export async function getLiveMatchesAPI() {
  try {
    const res = await fetch(`${API_BASE}/api/live`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Live matches API fetch failed, status:", res.status);
      throw new Error("Failed to fetch live matches");
    }

    return res.json();
  } catch (err) {
    console.error("Live matches API network error:", err);
    throw err;
  }
}
