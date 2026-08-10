"use client";

function getWeatherIcon(condition = "") {
  const c = condition.toLowerCase();

  if (c.includes("sun"))
    return "☀️";

  if (c.includes("clear"))
    return "☀️";

  if (c.includes("cloud"))
    return "☁️";

  if (c.includes("rain"))
    return "🌧️";

  if (c.includes("drizzle"))
    return "🌦️";

  if (c.includes("storm"))
    return "⛈️";

  if (c.includes("thunder"))
    return "⛈️";

  if (c.includes("snow"))
    return "❄️";

  if (c.includes("mist"))
    return "🌫️";

  if (c.includes("fog"))
    return "🌫️";

  if (c.includes("wind"))
    return "💨";

  return "🌤️";
}

function weatherColor(condition = "") {
  const c = condition.toLowerCase();

  if (c.includes("sun"))
    return "#f59e0b";

  if (c.includes("clear"))
    return "#f59e0b";

  if (c.includes("cloud"))
    return "#64748b";

  if (c.includes("rain"))
    return "#2563eb";

  if (c.includes("storm"))
    return "#7c3aed";

  if (c.includes("snow"))
    return "#06b6d4";

  return "#22c55e";
}

export default function WeatherCard({
  weather,
}) {
  if (!weather) return null;

  const accent = weatherColor(
    weather.condition
  );

  const icon = getWeatherIcon(
    weather.condition
  );

  return (
    <section
      style={{
        background: "#111827",
        borderRadius: 18,
        padding: 28,
        marginBottom: 25,
      }}
    >
      <h2
        style={{
          color: "#fff",
          marginBottom: 25,
          fontSize: 28,
        }}
      >
        🌤 Match Weather
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1.2fr 2fr",
          gap: 24,
          alignItems: "center",
          marginBottom: 28,
        }}
      >
        <div
          style={{
            background: "#1f2937",
            borderRadius: 18,
            padding: 25,
            textAlign: "center",
            border: `2px solid ${accent}`,
          }}
        >
          <div
            style={{
              fontSize: 72,
              marginBottom: 10,
            }}
          >
            {icon}
          </div>

          <div
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: accent,
            }}
          >
            {weather.temperature ?? "-"}°
          </div>

          <div
            style={{
              color: "#fff",
              marginTop: 10,
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            {weather.condition ||
              "Unknown"}
          </div>

          <div
            style={{
              marginTop: 8,
              color: "#94a3b8",
            }}
          >
            Feels like{" "}
            {weather.feelsLike ?? "-"}°
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(180px,1fr))",
            gap: 18,
          }}
        >
                    <WeatherInfoCard
            icon="🌡️"
            title="Temperature"
            value={
              weather.temperature != null
                ? `${weather.temperature}°C`
                : "-"
            }
            color={accent}
          />

          <WeatherInfoCard
            icon="🥶"
            title="Feels Like"
            value={
              weather.feelsLike != null
                ? `${weather.feelsLike}°C`
                : "-"
            }
            color="#3b82f6"
          />

          <WeatherInfoCard
            icon="💧"
            title="Humidity"
            value={
              weather.humidity != null
                ? `${weather.humidity}%`
                : "-"
            }
            color="#06b6d4"
          />

          <WeatherInfoCard
            icon="🌬️"
            title="Wind Speed"
            value={
              weather.wind != null
                ? `${weather.wind} km/h`
                : "-"
            }
            color="#8b5cf6"
          />

          <WeatherInfoCard
            icon="🧭"
            title="Wind Direction"
            value={
              weather.windDirection ||
              weather.direction ||
              "-"
            }
            color="#f97316"
          />

          <WeatherInfoCard
            icon="🌧️"
            title="Rain Chance"
            value={
              weather.rainChance != null
                ? `${weather.rainChance}%`
                : "-"
            }
            color="#2563eb"
          />

          <WeatherInfoCard
            icon="☀️"
            title="UV Index"
            value={
              weather.uv ??
              weather.uvIndex ??
              "-"
            }
            color="#facc15"
          />

          <WeatherInfoCard
            icon="📊"
            title="Pressure"
            value={
              weather.pressure != null
                ? `${weather.pressure} hPa`
                : "-"
            }
            color="#22c55e"
          />

          <WeatherInfoCard
            icon="👁️"
            title="Visibility"
            value={
              weather.visibility != null
                ? `${weather.visibility} km`
                : "-"
            }
            color="#0ea5e9"
          />

          <WeatherInfoCard
            icon="🌅"
            title="Sunrise"
            value={
              weather.sunrise || "-"
            }
            color="#fb923c"
          />

          <WeatherInfoCard
            icon="🌇"
            title="Sunset"
            value={
              weather.sunset || "-"
            }
            color="#ec4899"
          />

          <WeatherInfoCard
            icon="☁️"
            title="Cloud Cover"
            value={
              weather.clouds != null
                ? `${weather.clouds}%`
                : "-"
            }
            color="#64748b"
          />
        </div>
      </div>
            <div
        style={{
          marginTop: 18,
          padding: 18,
          borderRadius: 16,
          background: "#1f2937",
          borderLeft: `5px solid ${accent}`,
          color: "#cbd5e1",
          lineHeight: 1.7,
        }}
      >
        <strong
          style={{
            color: "#fff",
            display: "block",
            marginBottom: 8,
          }}
        >
          🌍 Match Conditions
        </strong>

        {weather.condition || "Unknown"} conditions with a temperature of{" "}
        <strong>
          {weather.temperature ?? "-"}°C
        </strong>
        . Humidity is{" "}
        <strong>
          {weather.humidity ?? "-"}%
        </strong>{" "}
        while winds are blowing at{" "}
        <strong>
          {weather.wind ?? "-"} km/h
        </strong>
        . These conditions may influence player stamina, passing accuracy,
        and overall match intensity.
      </div>
    </section>
  );
}

function WeatherInfoCard({
  icon,
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        borderRadius: 16,
        padding: 18,
        border: `2px solid ${color}`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        transition: "all .25s ease",
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            color: "#94a3b8",
            fontSize: 13,
            marginBottom: 6,
          }}
        >
          {title}
        </div>

        <div
          style={{
            color: "#fff",
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}