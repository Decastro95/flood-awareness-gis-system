import FloodMap from "@/components/FloodMap";

export default function MapPage() {
  return (
    <>
      <header>
        <h1>Flood Awareness Dashboard</h1>
        <p>Public Flood Risk & Safe Zone Information System</p>
      </header>

      <div className="dashboard">
        <aside className="sidebar">
          <h3>Map Legend</h3>

          <div className="legend-item">
            <div className="legend-color" style={{ background: "red" }} />
            <span>High Flood Risk Zone</span>
          </div>

          <div className="legend-item">
            <div className="legend-color" style={{ background: "green" }} />
            <span>Safe Zone / Shelter</span>
          </div>

          <hr />

          <a href="/alerts" style={{ color: "#1e88e5", fontWeight: "bold" }}>
  View Flood Alerts →
</a>


          <h3>Safe Zones</h3>
          <p>
            Designated flood-free areas suitable for evacuation and
            temporary shelter during flood events.
          </p>
        </aside>

        <FloodMap />
      </div>
    </>
  );
}
