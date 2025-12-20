"use client";

import { useEffect, useState } from "react";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/alerts")
      .then(res => res.json())
      .then(setAlerts);
  }, []);

  return (
    <>
      <header>
        <h1>Flood Alerts & Rainfall Monitoring</h1>
        <p>Early warning information for flood preparedness</p>
      </header>

      <main style={{ padding: "2rem" }}>
        {alerts.map(alert => (
          <div
            key={alert.id}
            style={{
              background: "#ffffff",
              borderLeft: `6px solid ${
                alert.alert_level === "High"
                  ? "#dc2626"
                  : alert.alert_level === "Moderate"
                  ? "#f59e0b"
                  : "#16a34a"
              }`,
              padding: "1rem",
              marginBottom: "1rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}
          >
            <h3>{alert.region} Region</h3>
            <p><strong>Alert Level:</strong> {alert.alert_level}</p>
            <p><strong>Rainfall:</strong> {alert.rainfall_mm} mm</p>
            <p>{alert.message}</p>
          </div>
        ))}
      </main>
    </>
  );
}
