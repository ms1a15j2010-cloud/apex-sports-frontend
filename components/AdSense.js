"use client";

import { useEffect } from "react";

export default function AdSense() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div style={{ margin: "20px 0", textAlign: "center" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"  // Replace with your AdSense ID
        data-ad-slot="YYYYYYYYYY"                 // Replace with your Ad Unit ID
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
