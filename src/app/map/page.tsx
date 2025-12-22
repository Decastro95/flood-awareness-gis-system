import FloodMap from "@/components/FloodMap";

export default function MapPage() {
  return (
    <>
      <header style={{ background: "#0f4c81", color: "white", padding: "1rem" }}>
        <h1>Flood Awareness GIS Dashboard</h1>
        <p>River Flood Risk & High-Ground Safe Zones</p>
      </header>

      <FloodMap />
    </>
  );
}
