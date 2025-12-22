import Link from "next/link";
import FloodMap from "@/components/FloodMap";
import FloodSeasonIndicator from "@/components/FloodSeasonIndicator";

export default function MapPage() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <header style={{
        background: "linear-gradient(90deg, #0f4c81, #1e88e5)",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <Link
            href="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "0.9rem",
              opacity: 0.8
            }}
          >
            ← Back to Home
          </Link>
          <h1 style={{ margin: "0.5rem 0", fontSize: "1.5rem" }}>
            🗺️ Flood Awareness GIS Dashboard
          </h1>
          <p style={{ margin: 0, opacity: 0.9 }}>
            Northern Namibia Flood Risk Visualization
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <Link
            href="/alerts"
            style={{
              color: "white",
              textDecoration: "none",
              background: "rgba(255,255,255,0.2)",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              fontSize: "0.9rem"
            }}
          >
            🚨 View Alerts
          </Link>
        </div>
      </header>

      <div style={{
        padding: "1rem 2rem",
        background: "#f8f9fa",
        borderBottom: "1px solid #e5e7eb"
      }}>
        <FloodSeasonIndicator />
      </div>

      <FloodMap />
    </div>
  );
}
