"use client";

import Image from "next/image";

export default function TeamCoach({ coach }) {
  if (!coach) {
    return (
      <section
        style={{
          background: "#111827",
          borderRadius: 20,
          padding: 30,
          marginBottom: 30,
        }}
      >
        <h2
          style={{
            color: "#fff",
            marginBottom: 20,
          }}
        >
          👔 Head Coach
        </h2>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          Coach information unavailable.
        </p>
      </section>
    );
  }

  const age =
    coach.age ||
    coach.birth?.age ||
    "-";

  const nationality =
    coach.nationality ||
    coach.country ||
    "-";

  const birthDate =
    coach.birth?.date || "-";

  const birthPlace = [
    coach.birth?.place,
    coach.birth?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 20,
        padding: 30,
        marginBottom: 30,
      }}
    >
      <h2
        style={{
          color: "#fff",
          marginBottom: 25,
        }}
      >
        👔 Head Coach
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "300px 1fr",
          gap: 30,
        }}
      >
        {/* Left */}

        <div
          style={{
            background: "#1f2937",
            borderRadius: 18,
            padding: 25,
            textAlign: "center",
          }}
        >
          <Image
            src={
              coach.photo ||
              "/coach.png"
            }
            alt={
              coach.name ||
              "Coach"
            }
            width={180}
            height={180}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <h2
            style={{
              marginTop: 20,
              color: "#fff",
            }}
          >
            {coach.name}
          </h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Head Coach
          </p>
        </div>

        {/* Right */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: 18,
          }}
        >
          <InfoCard
            title="Nationality"
            value={nationality}
          />

          <InfoCard
            title="Age"
            value={age}
          />

          <InfoCard
            title="Birth Date"
            value={birthDate}
          />

          <InfoCard
            title="Birth Place"
            value={
              birthPlace || "-"
            }
          />

          <InfoCard
            title="First Name"
            value={
              coach.firstname ||
              "-"
            }
          />

          <InfoCard
            title="Last Name"
            value={
              coach.lastname ||
              "-"
            }
          />
        </div>
      </div>

      {/* Biography */}

      <div
        style={{
          marginTop: 35,
          background: "#1f2937",
          borderRadius: 18,
          padding: 25,
        }}
      >
        <h3
          style={{
            color: "#fff",
            marginBottom: 15,
          }}
        >
          Coach Profile
        </h3>

        <p
          style={{
            color: "#cbd5e1",
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          {coach.name} is currently the
          head coach of this football
          club.

          {coach.nationality &&
            ` He is from ${coach.nationality}.`}

          {coach.age &&
            ` He is ${coach.age} years old.`}

          {" "}
          This information is
          automatically updated from the
          football data provider whenever
          new coach information becomes
          available.
        </p>
      </div>
    </section>
  );
}

function InfoCard({
  title,
  value,
}) {
  return (
    <div
      style={{
        background: "#1f2937",
        borderRadius: 14,
        padding: 20,
      }}
    >
      <div
        style={{
          color: "#94a3b8",
          fontSize: 14,
          marginBottom: 10,
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}