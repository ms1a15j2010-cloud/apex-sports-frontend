'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';

/* ============================================
   FETCH WITH TIMEOUT
============================================ */

async function fetchWithTimeout(url, options = {}, timeout = 30000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/* ============================================
   PAGE COMPONENT
============================================ */

export default function ResultsPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredMatch, setHoveredMatch] = useState(null);

  useEffect(() => {
    async function getResults() {
      try {
        console.log('🔍 Fetching results from:', `${API}/api/results`);
        
        const res = await fetchWithTimeout(
          `${API}/api/results`,
          {
            cache: "no-store",
            headers: {
              'Content-Type': 'application/json',
            },
          },
          30000
        );

        if (!res.ok) {
          throw new Error(`Backend unavailable: ${res.status}`);
        }

        const data = await res.json();
        console.log('✅ Results received:', data.matches?.length || 0, 'matches');
        setMatches(data.matches || []);
      } catch (err) {
        console.error('🔥 Error fetching results:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getResults();
  }, []);

  if (loading) {
    return (
      <main
        style={{
          maxWidth: 1200,
          margin: "40px auto",
          padding: 20,
          color: "white",
          textAlign: "center",
        }}
      >
        <h2>Loading results...</h2>
      </main>
    );
  }

  if (error) {
    return (
      <main
        style={{
          maxWidth: 1200,
          margin: "40px auto",
          padding: 20,
          color: "white",
          textAlign: "center",
        }}
      >
        <h2>Error loading results</h2>
        <p style={{ color: "#ef4444" }}>{error}</p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            marginTop: 20,
            color: "#22c55e",
            textDecoration: "none",
            background: "#1e293b",
            padding: "10px 20px",
            borderRadius: 8,
          }}
        >
          ← Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        padding: 20,
        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: 40,
          marginBottom: 30,
        }}
      >
        🏁 Latest Results
        <span
          style={{
            fontSize: 16,
            color: "#94a3b8",
            marginLeft: 15,
          }}
        >
          {matches.length} matches
        </span>
      </h1>

      {matches.length === 0 ? (
        <div
          style={{
            background: "#111827",
            borderRadius: 18,
            padding: 50,
            textAlign: "center",
          }}
        >
          <h2>No Results Available</h2>
          <p style={{ color: "#94a3b8", marginTop: 10 }}>
            Check back later for match results.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 20,
          }}
        >
          {matches.map((match) => (
            <Link
              key={match.id}
              href={`/match/${match.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  background: hoveredMatch === match.id ? "#1e293b" : "#111827",
                  borderRadius: 18,
                  padding: 22,
                  border: hoveredMatch === match.id ? "1px solid #22c55e" : "1px solid #1e293b",
                  transition: "all 0.2s ease",
                  transform: hoveredMatch === match.id ? "scale(1.01)" : "scale(1)",
                }}
                onMouseEnter={() => setHoveredMatch(match.id)}
                onMouseLeave={() => setHoveredMatch(null)}
              >
                {/* League */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 20,
                  }}
                >
                  {match.league?.logo && (
                    <Image
                      src={match.league.logo}
                      alt={match.league.name || 'League'}
                      width={30}
                      height={30}
                      unoptimized
                    />
                  )}
                  <strong>{match.league?.name || 'Unknown League'}</strong>
                  <span
                    style={{
                      marginLeft: "auto",
                      color: match.status?.short === 'FT' ? "#22c55e" : "#f59e0b",
                      fontWeight: "bold",
                    }}
                  >
                    {match.status?.short || '?'}
                  </span>
                </div>

                {/* Teams */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr",
                    alignItems: "center",
                    gap: 20,
                  }}
                >
                  {/* Home */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    {match.teams?.home?.logo && (
                      <Image
                        src={match.teams.home.logo}
                        alt={match.teams.home.name || 'Home'}
                        width={55}
                        height={55}
                        unoptimized
                      />
                    )}
                    <strong>{match.teams?.home?.name || 'Home'}</strong>
                  </div>

                  {/* Score */}
                  <div
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: 40,
                        margin: 0,
                        color: "#22c55e",
                      }}
                    >
                      {match.goals?.home ?? '-'} - {match.goals?.away ?? '-'}
                    </h2>
                    <div
                      style={{
                        color: "#94a3b8",
                        marginTop: 10,
                      }}
                    >
                      {match.status?.long || 'Scheduled'}
                    </div>
                  </div>

                  {/* Away */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <strong>{match.teams?.away?.name || 'Away'}</strong>
                    {match.teams?.away?.logo && (
                      <Image
                        src={match.teams.away.logo}
                        alt={match.teams.away.name || 'Away'}
                        width={55}
                        height={55}
                        unoptimized
                      />
                    )}
                  </div>
                </div>

                {/* Date */}
                <div
                  style={{
                    marginTop: 20,
                    textAlign: "center",
                    color: "#94a3b8",
                    fontSize: 14,
                  }}
                >
                  {match.date ? new Date(match.date).toLocaleString() : 'TBD'}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}