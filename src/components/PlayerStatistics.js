"use client";

import Image from "next/image";

export default function PlayerStatistics({ players }) {
  if (!players || players.length === 0) return null;

  const getRatingColor = (rating) => {
    if (!rating) return "#94a3b8";

    const value = Number(rating);

    if (value >= 8) return "#22c55e";
    if (value >= 6.5) return "#eab308";

    return "#ef4444";
  };


  return (
    <section
      style={{
        marginTop: 35,
        background:
          "linear-gradient(145deg,#0f172a,#111827)",
        borderRadius:20,
        padding:30,
        border:"1px solid #1e293b"
      }}
    >

      <h2
        style={{
          color:"#fff",
          fontSize:26,
          marginBottom:30
        }}
      >
        ⭐ Player Performance
      </h2>


      {players.map((team,index)=>(

        <div key={index} style={{marginBottom:45}}>


          {/* TEAM HEADER */}

          <div
            style={{
              display:"flex",
              alignItems:"center",
              gap:15,
              marginBottom:25
            }}
          >

            <Image
              src={team.team?.logo || "/team.png"}
              unoptimized
              width={55}
              height={55}
              alt="team"
            />


            <div>

              <h3
                style={{
                  color:"#fff",
                  margin:0,
                  fontSize:20
                }}
              >
                {team.team?.name}
              </h3>


              <span
                style={{
                  color:"#94a3b8",
                  fontSize:13
                }}
              >
                Match Statistics
              </span>

            </div>


          </div>



          {/* PLAYER GRID */}


          <div
            style={{
              display:"grid",
              gridTemplateColumns:
              "repeat(auto-fill,minmax(300px,1fr))",
              gap:20
            }}
          >


          {
          team.players?.map((item,i)=>{


            const player=item.player || {};
            const stats=item.statistics?.[0] || {};


            return (

            <div
            key={i}
            style={{
              background:"#1e293b",
              padding:20,
              borderRadius:18,
              border:"1px solid #334155",
              transition:"0.3s",
            }}

            >


            {/* PLAYER HEADER */}

            <div
            style={{
              display:"flex",
              alignItems:"center",
              gap:15
            }}
            >


            <div
            style={{
              position:"relative"
            }}
            >

            <Image
            src={player.photo || "/player.png"}
            unoptimized
            width={70}
            height={70}
            alt={player.name || "player"}
            style={{
              borderRadius:"50%",
              objectFit:"cover"
            }}
            />


            <span
            style={{
              position:"absolute",
              bottom:-5,
              right:-5,
              background:"#2563eb",
              color:"#fff",
              width:25,
              height:25,
              borderRadius:"50%",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              fontSize:12,
              fontWeight:"bold"
            }}
            >
              {i+1}
            </span>
            </div>
            <div>
            <h4
            style={{
              color:"#fff",
              margin:0,
              fontSize:17
            }}
            >
              {player.name}
            </h4>

            <div
            style={{
              color:"#94a3b8",
              marginTop:5,
              fontSize:13
            }}
            >
              {stats.games?.position || "N/A"}
            </div>

            </div>

            </div>

            {/* RATING */}

            <div
            style={{
              marginTop:20,
              background:"#0f172a",
              padding:12,
              borderRadius:12,
              display:"flex",
              justifyContent:"space-between"
            }}
            >

            <span style={{color:"#94a3b8"}}>
              Rating
            </span>


            <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 8,
  }}
>
  <span
    style={{
      color: getRatingColor(stats.games?.rating),
      fontSize: 18,
      fontWeight: 700,
    }}
  >
    {stats.games?.rating || "-"}
  </span>

  <span
    style={{
      color: "#facc15",
      fontSize: 15,
      letterSpacing: 1,
    }}
  >
    {(() => {
      const rating = Number(stats.games?.rating || 0);

      if (rating >= 9) return "★★★★★";
      if (rating >= 8) return "★★★★☆";
      if (rating >= 7) return "★★★☆☆";
      if (rating >= 6) return "★★☆☆☆";
      if (rating > 0) return "★☆☆☆☆";

      return "☆☆☆☆☆";
    })()}
  </span>
</div>

            </div>




            {/* STATS GRID */}


            <div
            style={{
              marginTop:18,
              display:"grid",
              gridTemplateColumns:"1fr 1fr",
              gap:10
            }}
            >


            <Stat
            title="Minutes"
            value={stats.games?.minutes}
            />


            <Stat
            title="Goals"
            value={stats.goals?.total}
            />


            <Stat
            title="Assists"
            value={stats.goals?.assists}
            />


            <Stat
            title="Shots"
            value={stats.shots?.total}
            />


            <Stat
            title="Pass"
            value={
              stats.passes?.accuracy
              ? stats.passes.accuracy+"%"
              : "-"
            }
            />


            <Stat
            title="Tackles"
            value={stats.tackles?.total}
            />


            <Stat
            title="🟨"
            value={stats.cards?.yellow}
            />


            <Stat
            title="🟥"
            value={stats.cards?.red}
            />



            </div>


            </div>


            );


          })
          }



          </div>


        </div>

      ))}


    </section>
  );
}




function Stat({title,value}){

return (

<div
style={{
background:"#0f172a",
padding:12,
borderRadius:10,
textAlign:"center"
}}
>

<div
style={{
color:"#94a3b8",
fontSize:12
}}
>
{title}
</div>


<strong
style={{
color:"#fff",
fontSize:17
}}
>
{value ?? 0}
</strong>


</div>

)

}