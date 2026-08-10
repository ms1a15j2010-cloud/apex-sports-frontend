"use client";

export default function MatchPrediction({
  prediction = {},
}) {
  if (!prediction) {
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
          🔮 Match Prediction
        </h2>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          Prediction data unavailable.
        </p>
      </section>
    );
  }

  const {
    home = {},
    away = {},
    winner = null,
    advice = "",
  } = prediction;


  const homePercent =
    home.percent || 50;

  const awayPercent =
    away.percent || 50;


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
          marginBottom: 30,
        }}
      >
        🔮 Match Prediction
      </h2>


      {/* Win Probability */}

      <div
        style={{
          background: "#1f2937",
          borderRadius: 18,
          padding: 25,
          marginBottom: 25,
        }}
      >

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr auto 1fr",
            alignItems:
              "center",
            gap: 20,
          }}
        >

          <TeamPrediction
            team={home}
            percent={
              homePercent
            }
          />


          <div
            style={{
              color:
                "#94a3b8",
              fontSize: 24,
              fontWeight:
                "bold",
            }}
          >
            VS
          </div>


          <TeamPrediction
            team={away}
            percent={
              awayPercent
            }
          />

        </div>


        {/* Progress Bar */}

        <div
          style={{
            display: "flex",
            height: 18,
            borderRadius: 50,
            overflow:
              "hidden",
            marginTop: 30,
            background:
              "#374151",
          }}
        >

          <div
            style={{
              width:
                `${homePercent}%`,
              background:
                "#22c55e",
            }}
          />


          <div
            style={{
              width:
                `${awayPercent}%`,
              background:
                "#ef4444",
            }}
          />

        </div>

      </div>



      {/* Winner */}

      {winner && (
        <div
          style={{
            background:
              "#1f2937",
            borderRadius:
              16,
            padding: 20,
            marginBottom:
              25,
            textAlign:
              "center",
          }}
        >

          <h3
            style={{
              color:
                "#22c55e",
              marginBottom:
                10,
            }}
          >
            Expected Winner
          </h3>


          <p
            style={{
              color:
                "#fff",
              fontSize:
                22,
              fontWeight:
                "bold",
            }}
          >
            {winner}
          </p>

        </div>
      )}



      {/* AI Advice */}

      <div
        style={{
          background:
            "#1f2937",
          borderRadius:
            16,
          padding: 22,
        }}
      >

        <h3
          style={{
            color:
              "#fff",
            marginBottom:
              12,
          }}
        >
          🤖 Analysis
        </h3>


        <p
          style={{
            color:
              "#cbd5e1",
            lineHeight:
              1.8,
            margin:0,
          }}
        >
          {advice ||
            "Prediction is generated using team form, statistics and previous performance."}
        </p>

      </div>


    </section>
  );
}


/* ===================================== */


function TeamPrediction({
  team,
  percent,
}) {

  return (
    <div
      style={{
        textAlign:
          "center",
      }}
    >

      <h3
        style={{
          color:
            "#fff",
          marginBottom:
            12,
        }}
      >
        {team.name ||
          "Team"}
      </h3>


      <div
        style={{
          fontSize:
            42,
          fontWeight:
            "bold",
          color:
            "#22c55e",
        }}
      >
        {percent}%
      </div>


      <p
        style={{
          color:
            "#94a3b8",
          marginTop:
            8,
        }}
      >
        Win Chance
      </p>

    </div>
  );
}