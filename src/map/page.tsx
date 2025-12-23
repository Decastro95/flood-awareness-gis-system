import Link from "next/link";
import FloodMap from "@/components/FloodMap";
import FloodSeasonIndicator from "@/components/FloodSeasonIndicator";
import WeatherPanel from "@/components/WeatherPanel";
import FloodRiskCard from "@/components/FloodRiskCard";
import EmergencyContacts from "@/components/EmergencyContacts";

export default function MapPage() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{
        background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}>
        <div>
          <Link
            href="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "0.9rem",
              opacity: 0.8,
              marginRight: "1rem"
            }}
          >
            ← Back to Home
          </Link>
          <h1 style={{ margin: "0.5rem 0", fontSize: "1.8rem", fontWeight: "bold" }}>
            🗺️ Flood Awareness GIS Dashboard
          </h1>
          <p style={{ margin: 0, opacity: 0.9, fontSize: "1rem" }}>
            Northern Namibia Flood Risk Visualization & Emergency Response
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <Link
            href="/alerts"
            style={{
              color: "white",
              textDecoration: "none",
              background: "rgba(255,255,255,0.2)",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "500",
              transition: "background 0.3s"
            }}
          >
            🚨 View Alerts
          </Link>
        </div>
      </header>

      <div style={{
        padding: "1rem 2rem",
        background: "#f8fafc",
        borderBottom: "1px solid #e2e8f0"
      }}>
        <FloodSeasonIndicator />
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        <aside style={{
          width: "350px",
          background: "white",
          borderRight: "1px solid #e2e8f0",
          padding: "1.5rem",
          overflowY: "auto",
          boxShadow: "2px 0 10px rgba(0,0,0,0.05)"
        }}>
          <WeatherPanel />
          <FloodRiskCard rainfall={12} />
          <EmergencyContacts />
        </aside>

        <main style={{ flex: 1, position: "relative" }}>
          <FloodMap />
        </main>
      </div>
    </div>
  );
}
