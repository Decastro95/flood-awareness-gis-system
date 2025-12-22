import Link from "next/link";
import FloodSeasonIndicator from "@/components/FloodSeasonIndicator";
import EmergencyContacts from "@/components/EmergencyContacts";

export default function Home() {
  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ color: "#0f4c81", marginBottom: "0.5rem" }}>
          🌊 Flood Awareness & Risk Mapping System
        </h1>
        <p style={{ fontSize: "1.1rem", color: "#666" }}>
          Northern Namibia Flood Risk Management Platform
        </p>
      </header>

      <FloodSeasonIndicator />

      <div style={{ margin: "2rem 0" }}>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          This web-based GIS platform provides public flood awareness information by visualizing flood-prone zones and safe areas for evacuation. The system is developed as an academic prototype supporting disaster preparedness in Northern Namibia.
        </p>
      </div>

      <nav style={{ margin: "2rem 0" }}>
        <h2 style={{ color: "#0f4c81", marginBottom: "1rem" }}>Navigation</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
          <Link
            href="/map"
            style={{
              display: "block",
              padding: "1.5rem",
              background: "#f8f9fa",
              border: "2px solid #0f4c81",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#0f4c81",
              textAlign: "center",
              transition: "all 0.3s ease"
            }}
            className="hover-card"
          >
            <h3>🗺️ Interactive Map</h3>
            <p>View flood risk zones, safe areas, and real-time weather data</p>
          </Link>

          <Link
            href="/alerts"
            style={{
              display: "block",
              padding: "1.5rem",
              background: "#f8f9fa",
              border: "2px solid #f59e0b",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#f59e0b",
              textAlign: "center",
              transition: "all 0.3s ease"
            }}
            className="hover-card"
          >
            <h3>🚨 Flood Alerts</h3>
            <p>Current flood warnings and rainfall monitoring</p>
          </Link>
        </div>
      </nav>

      <section style={{ margin: "2rem 0" }}>
        <h2 style={{ color: "#0f4c81", marginBottom: "1rem" }}>Key Features</h2>
        <ul style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
          <li><strong>Interactive flood risk map</strong> with GIS layers for flood-prone zones</li>
          <li><strong>Real-time weather integration</strong> from OpenWeatherMap API</li>
          <li><strong>Safe zones database</strong> with evacuation shelters and capacity information</li>
          <li><strong>Early warning alerts</strong> with severity classification</li>
          <li><strong>Seasonal flood awareness</strong> with peak risk period indicators</li>
        </ul>
      </section>

      <EmergencyContacts />

      <footer style={{
        marginTop: "3rem",
        padding: "1rem",
        borderTop: "1px solid #e5e7eb",
        textAlign: "center",
        color: "#666",
        fontSize: "0.9rem"
      }}>
        <p>
          <em>This system is an academic prototype. For official flood warnings, consult government authorities.</em>
        </p>
        <p>© 2025 Immanuel T Ndatipo - Academic Project</p>
      </footer>
    </main>
  );
}
