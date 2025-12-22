import FloodMap from "@/components/FloodMap";

export default function MapPage() {
  return (
    <>
      <header style={{ padding: "1rem", background: "#0f4c81", color: "white" }}>
        <h1>Flood Awareness Dashboard</h1>
        <p>Kavango & Zambezi River Flood Risk Zones</p>
      </header>

      <div style={{ height: "90vh" }}>
        <FloodMap />
      </div>
    </>
  );
}
