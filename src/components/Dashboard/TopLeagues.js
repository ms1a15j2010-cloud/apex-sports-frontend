"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import Link from "next/link";

import { api } from "@/lib/api";

export default function TopLeagues() {

  const [leagues, setLeagues] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function load() {

      const data = await api.getTopLeagues();

      if (data.success) {
        setLeagues(data.leagues);
      }

      setLoading(false);

    }

    load();

  }, []);

  if (loading)
    return (
      <section style={styles.section}>
        Loading leagues...
      </section>
    );

  return (

    <section style={styles.section}>

      <h2 style={styles.title}>
        🏆 Top Leagues
      </h2>

      <div style={styles.grid}>

        {leagues.map(league => (

          <Link
            key={league.id}
            href={`/league/${league.id}`}
            style={styles.card}
          >

            <Image
              src={league.logo}
              width={60}
              height={60}
              alt={league.name}
            />

            <h3>{league.name}</h3>

            <p>{league.country}</p>

          </Link>

        ))}

      </div>

    </section>

  );

}

const styles = {

  section: {
    background: "#111827",
    borderRadius: 20,
    padding: 25,
    color: "white",
  },

  title: {
    fontSize: 28,
    marginBottom: 20,
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
    gap: 20,
  },

  card: {
    background: "#1f2937",
    borderRadius: 15,
    padding: 20,
    textAlign: "center",
    color: "white",
    textDecoration: "none",
    transition: ".2s",
  },

};