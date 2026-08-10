"use client";

import { useEffect, useState } from "react";

/* =====================================================
   DEFAULT SETTINGS
===================================================== */

const DEFAULT_SETTINGS = {
  liveUpdates: true,
  notifications: true,
  sound: false,
  compactMode: false,
};

/* =====================================================
   STORAGE KEY
===================================================== */

const STORAGE_KEY =
  "apex-sports-settings";

/* =====================================================
   SETTING CLIENT
===================================================== */

export default function SettingClient() {
  const [
    settings,
    setSettings,
  ] = useState(
    DEFAULT_SETTINGS
  );

  const [
    loaded,
    setLoaded,
  ] = useState(false);

  /* =====================================================
     LOAD SETTINGS
  ===================================================== */

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (saved) {
        const parsed =
          JSON.parse(saved);

        setSettings({
          ...DEFAULT_SETTINGS,
          ...parsed,
        });
      }
    } catch (error) {
      console.error(
        "Settings load error:",
        error
      );
    } finally {
      setLoaded(true);
    }
  }, []);

  /* =====================================================
     SAVE SETTINGS
  ===================================================== */

  useEffect(() => {
    if (!loaded) {
      return;
    }

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(settings)
      );
    } catch (error) {
      console.error(
        "Settings save error:",
        error
      );
    }
  }, [
    settings,
    loaded,
  ]);

  /* =====================================================
     UPDATE SETTING
  ===================================================== */

  function updateSetting(
    key,
    value
  ) {
    setSettings(
      (previous) => ({
        ...previous,
        [key]: value,
      })
    );
  }

  /* =====================================================
     RESET SETTINGS
  ===================================================== */

  function resetSettings() {
    setSettings(
      DEFAULT_SETTINGS
    );
  }

  /* =====================================================
     TOGGLE
  ===================================================== */

  function Toggle({
    checked,
    onChange,
  }) {
    return (
      <button
        type="button"
        aria-pressed={checked}
        onClick={() =>
          onChange(!checked)
        }
        style={{
          width: 48,
          height: 26,
          padding: 3,
          border: "none",
          borderRadius: 20,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent:
            checked
              ? "flex-end"
              : "flex-start",
          background: checked
            ? "#ef4444"
            : "#374151",
          transition:
            "all 0.2s ease",
        }}
      >
        <span
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#fff",
            boxShadow:
              "0 1px 5px rgba(0,0,0,0.35)",
          }}
        />
      </button>
    );
  }

  /* =====================================================
     SETTING ROW
  ===================================================== */

  function SettingRow({
    title,
    description,
    settingKey,
  }) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",
          gap: 20,
          padding:
            "20px 0",
          borderBottom:
            "1px solid #1f2937",
        }}
      >
        <div
          style={{
            flex: 1,
          }}
        >
          <h3
            style={{
              margin: 0,
              color: "#fff",
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            {title}
          </h3>

          <p
            style={{
              margin:
                "6px 0 0",
              color: "#9ca3af",
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>
        </div>

        <Toggle
          checked={
            settings[
              settingKey
            ]
          }
          onChange={(value) =>
            updateSetting(
              settingKey,
              value
            )
          }
        />
      </div>
    );
  }

  /* =====================================================
     LOADING
  ===================================================== */

  if (!loaded) {
    return (
      <section
        style={{
          minHeight:
            "60vh",
          display: "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          color: "#9ca3af",
        }}
      >
        Loading settings...
      </section>
    );
  }

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <section
      style={{
        width: "100%",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          marginBottom: 30,
        }}
      >
        <div
          style={{
            color: "#ef4444",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing:
              "1.2px",
            textTransform:
              "uppercase",
            marginBottom: 8,
          }}
        >
          ⚽ Apex Sports
        </div>

        <h1
          style={{
            margin: 0,
            color: "#fff",
            fontSize:
              "clamp(30px, 5vw, 44px)",
            fontWeight: 800,
          }}
        >
          Settings
        </h1>

        <p
          style={{
            margin:
              "10px 0 0",
            color: "#9ca3af",
            fontSize: 15,
          }}
        >
          Customize your Apex Sports
          experience.
        </p>
      </div>

      {/* LIVE EXPERIENCE */}

      <section
        style={{
          background:
            "linear-gradient(145deg, #111827, #0b1220)",
          border:
            "1px solid #1f2937",
          borderRadius: 20,
          padding:
            "8px 24px 4px",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            padding:
              "16px 0 8px",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#fff",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            Live Experience
          </h2>

          <p
            style={{
              margin:
                "5px 0 0",
              color: "#6b7280",
              fontSize: 12,
            }}
          >
            Control live scores and
            match updates.
          </p>
        </div>

        <SettingRow
          title="Live Updates"
          description="Automatically refresh live match scores and events."
          settingKey="liveUpdates"
        />

        <SettingRow
          title="Notifications"
          description="Receive notifications when important match events occur."
          settingKey="notifications"
        />

        <SettingRow
          title="Match Sounds"
          description="Enable sound alerts for important live match events."
          settingKey="sound"
        />
      </section>

      {/* DISPLAY */}

      <section
        style={{
          background:
            "linear-gradient(145deg, #111827, #0b1220)",
          border:
            "1px solid #1f2937",
          borderRadius: 20,
          padding:
            "8px 24px 4px",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            padding:
              "16px 0 8px",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#fff",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            Display
          </h2>

          <p
            style={{
              margin:
                "5px 0 0",
              color: "#6b7280",
              fontSize: 12,
            }}
          >
            Adjust how match information
            is displayed.
          </p>
        </div>

        <SettingRow
          title="Compact Mode"
          description="Use a more compact layout for match cards and lists."
          settingKey="compactMode"
        />
      </section>

      {/* STORAGE INFO */}

      <section
        style={{
          background:
            "linear-gradient(145deg, #111827, #0b1220)",
          border:
            "1px solid #1f2937",
          borderRadius: 20,
          padding: 24,
          marginBottom: 20,
        }}
      >
        <h2
          style={{
            margin:
              "0 0 8px",
            color: "#fff",
            fontSize: 18,
            fontWeight: 800,
          }}
        >
          Preferences
        </h2>

        <p
          style={{
            margin: 0,
            color: "#9ca3af",
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          Your Apex Sports preferences
          are saved locally in this
          browser.
        </p>
      </section>

      {/* RESET */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "flex-end",
        }}
      >
        <button
          type="button"
          onClick={resetSettings}
          style={{
            border:
              "1px solid #374151",
            background:
              "transparent",
            color: "#d1d5db",
            borderRadius: 10,
            padding:
              "11px 18px",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          Reset Settings
        </button>
      </div>
    </section>
  );
}