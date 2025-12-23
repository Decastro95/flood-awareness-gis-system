"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="app-container">
      {/* Hero Header */}
      <header className="app-header">
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          <h1 style={{
            fontSize: "3.5rem",
            fontWeight: "bold",
            margin: "0 0 1.5rem 0",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)"
          }}>
            🌊 Flood Awareness GIS System
          </h1>
          <p style={{
            fontSize: "1.4rem",
            margin: "0 0 3rem 0",
            opacity: 0.9,
            lineHeight: 1.4
          }}>
            Interactive flood risk mapping and public awareness platform for Northern Namibia
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <Link
              href="/map"
              className="btn btn-primary"
              style={{ fontSize: "1.1rem", padding: "1rem 2rem" }}
            >
              🗺️ View Interactive Map
            </Link>
            <Link
              href="/globe"
              className="btn btn-secondary"
              style={{ fontSize: "1.1rem", padding: "1rem 2rem" }}
            >
              🌍 Globe View
            </Link>
            <Link
              href="/alerts"
              className="btn btn-secondary"
              style={{ fontSize: "1.1rem", padding: "1rem 2rem" }}
            >
              🚨 Emergency Alerts
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <main className="main-content" style={{ padding: "4rem 2rem", background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "600", color: "#1e293b", marginBottom: "1rem" }}>
              Advanced Flood Risk Management
            </h2>
            <p style={{ fontSize: "1.2rem", color: "#64748b", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
              Leveraging cutting-edge GIS technology and real-time data to protect communities in Northern Namibia from flood disasters.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
            <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🗺️</div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem", color: "#1e293b" }}>
                Interactive Mapping
              </h3>
              <p style={{ color: "#64748b", lineHeight: 1.6 }}>
                Explore detailed flood risk zones, terrain elevation, and safe evacuation routes with our advanced interactive map interface.
              </p>
            </div>

            <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌍</div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem", color: "#1e293b" }}>
                Global Perspective
              </h3>
              <p style={{ color: "#64748b", lineHeight: 1.6 }}>
                View flood patterns from a global perspective with our 3D globe visualization, featuring spinning animations and regional focus.
              </p>
            </div>

            <div className="card" style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚨</div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem", color: "#1e293b" }}>
                Real-time Alerts
              </h3>
              <p style={{ color: "#64748b", lineHeight: 1.6 }}>
                Stay informed with real-time weather updates, flood warnings, and emergency contact information for rapid response.
              </p>
            </div>
          </div>

          <div style={{ textAlign: "center", padding: "3rem", background: "white", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
            <h3 style={{ fontSize: "2rem", fontWeight: "600", color: "#1e293b", marginBottom: "1rem" }}>
              Ready for Action
            </h3>
            <p style={{ fontSize: "1.1rem", color: "#64748b", marginBottom: "2rem", maxWidth: "700px", margin: "0 auto 2rem" }}>
              Our system integrates satellite imagery, weather data, and community feedback to provide comprehensive flood awareness and preparedness tools.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link
                href="/map"
                className="btn btn-primary"
                style={{ fontSize: "1rem", padding: "0.75rem 1.5rem" }}
              >
                Explore Interactive Map
              </Link>
              <Link
                href="/globe"
                className="btn btn-secondary"
                style={{ fontSize: "1rem", padding: "0.75rem 1.5rem" }}
              >
                View Global Globe
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
