"use client";

import { useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function DashboardLayout({
  children,
}) {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Header
        onMenu={() => setOpen(!open)}
      />

      <div
        style={{
          display: "flex",
          background: "#0f172a",
          minHeight: "100vh",
        }}
      >
        <Sidebar open={open} />

        <main
          style={{
            flex: 1,
            padding: 30,
          }}
        >
          {children}
        </main>
      </div>

      <Footer />
    </>
  );
}