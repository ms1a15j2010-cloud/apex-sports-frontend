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

      <div className="flex min-h-screen bg-[#0f172a]">
        <Sidebar open={open} />

        <main className="min-w-0 flex-1 p-[30px]">
          {children}
        </main>
      </div>

      <Footer />
    </>
  );
}