"use client";

import { useState, useEffect } from "react";
import { useFeatureFlag } from "@josys-src/josys-ff-ui-commons";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { enabled: isAlertsEnabled, ready: isFlagsReady } =
    useFeatureFlag("EP");

  console.log("Enabled : ", isAlertsEnabled);
  console.log("Flags Ready : ", isFlagsReady);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isFlagsReady) {
    return <p>⏳ Loading flags...</p>;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "200px",
          padding: "20px",
          backgroundColor: "#f4f4f4",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Sidebar</h2>
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          <li>
            <a href="#">Dashboard</a>
          </li>
          <li>
            <a href="#">Security</a>
          </li>
          {isAlertsEnabled && (
            <li>
              <a href="#">Alerts</a>
            </li>
          )}
        </ul>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Test App</h1>
        <p>
          {isAlertsEnabled
            ? "✅ Alerts Feature is ON"
            : "🚫 Alerts Feature is OFF"}
        </p>
      </div>
    </div>
  );
}
