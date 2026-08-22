// src/app/settings/page.js

"use client";

import { useEffect, useState } from "react";

/* =====================================================
   SETTINGS PAGE
===================================================== */

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    liveUpdates: true,
    notifications: true,
    sound: false,
    compactMode: false,
  });

  /* =====================================================
     LOAD SETTINGS
  ===================================================== */

  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        "apex-sports-settings"
      );

      if (saved) {
        setSettings((prev) => ({
          ...prev,
          ...JSON.parse(saved),
        }));
      }
    } catch (error) {
      console.error(
        "Failed to load settings:",
        error
      );
    }
  }, []);

  /* =====================================================
     UPDATE SETTING
  ===================================================== */

  function updateSetting(key, value) {
    const updated = {
      ...settings,
      [key]: value,
    };

    setSettings(updated);

    try {
      localStorage.setItem(
        "apex-sports-settings",
        JSON.stringify(updated)
      );
    } catch (error) {
      console.error(
        "Failed to save settings:",
        error
      );
    }
  }

  /* =====================================================
     RESET
  ===================================================== */

  function resetSettings() {
    const defaults = {
      liveUpdates: true,
      notifications: true,
      sound: false,
      compactMode: false,
    };

    setSettings(defaults);

    try {
      localStorage.setItem(
        "apex-sports-settings",
        JSON.stringify(defaults)
      );
    } catch (error) {
      console.error(
        "Failed to reset settings:",
        error
      );
    }
  }

  /* =====================================================
     TOGGLE
  ===================================================== */

  function Toggle({ checked, onChange }) {
    return (
      <button
        type="button"
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
        className={`flex h-[26px] w-12 shrink-0 cursor-pointer items-center rounded-full border-0 p-[3px] transition-colors duration-200 ease-in-out ${
          checked
            ? "justify-end bg-red-500"
            : "justify-start bg-gray-700"
        }`}
      >
        <span className="block h-5 w-5 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.35)]" />
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
      <div className="flex items-center justify-between gap-5 border-b border-gray-800 py-5 last:border-b-0">
        <div className="min-w-0">
          <h3 className="m-0 text-[15px] font-bold text-white">
            {title}
          </h3>

          <p className="mt-1.5 text-[13px] leading-[1.5] text-gray-400">
            {description}
          </p>
        </div>

        <Toggle
          checked={settings[settingKey]}
          onChange={(value) =>
            updateSetting(settingKey, value)
          }
        />
      </div>
    );
  }

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <main className="min-h-screen bg-gray-950 px-5 pb-[70px] pt-10 text-white">
      <div className="mx-auto w-full max-w-[900px]">
        {/* HEADER */}

        <header className="mb-[30px]">
          <div className="mb-2 text-xs font-extrabold uppercase tracking-[1.2px] text-red-500">
            ⚽ Apex Sports
          </div>

          <h1 className="m-0 text-[clamp(30px,5vw,44px)] font-extrabold">
            Settings
          </h1>

          <p className="mt-2.5 text-[15px] text-gray-400">
            Customize your Apex Sports
            experience.
          </p>
        </header>

        {/* LIVE EXPERIENCE */}

        <section className="mb-5 rounded-[20px] border border-gray-800 bg-[linear-gradient(145deg,#111827,#0b1220)] px-6 pb-1 pt-2">
          <div className="px-0 pb-2 pt-4">
            <h2 className="m-0 text-lg font-extrabold text-white">
              Live Experience
            </h2>

            <p className="mt-[5px] text-xs text-gray-500">
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

        <section className="mb-5 rounded-[20px] border border-gray-800 bg-[linear-gradient(145deg,#111827,#0b1220)] px-6 pb-1 pt-2">
          <div className="px-0 pb-2 pt-4">
            <h2 className="m-0 text-lg font-extrabold text-white">
              Display
            </h2>

            <p className="mt-[5px] text-xs text-gray-500">
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

        {/* ACCOUNT INFORMATION */}

        <section className="mb-5 rounded-[20px] border border-gray-800 bg-[linear-gradient(145deg,#111827,#0b1220)] p-6">
          <h2 className="mb-2 text-lg font-extrabold text-white">
            Apex Sports
          </h2>

          <p className="m-0 text-[13px] leading-[1.6] text-gray-400">
            Your preferences are stored
            locally in this browser.
          </p>
        </section>

        {/* RESET */}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={resetSettings}
            className="cursor-pointer rounded-[10px] border border-gray-700 bg-transparent px-[18px] py-[11px] text-[13px] font-bold text-gray-300 transition hover:border-gray-600 hover:bg-gray-900 hover:text-white"
          >
            Reset Settings
          </button>
        </div>
      </div>
    </main>
  );
}