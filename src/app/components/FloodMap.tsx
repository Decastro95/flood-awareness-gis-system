"use client";

import maplibregl from "maplibre-gl";
import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

export default function FloodMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
map.on("load", async () => {
  map.addSource("floodZones", {
    type: "geojson",
    data: "/data/flood_zones.geojson",
  });

  map.addLayer({
    id: "flood-zones-layer",
    type: "fill",
    source: "floodZones",
    paint: {
      "fill-color": "#ff0000",
      "fill-opacity": 0.5,
    },
  });
});

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [17.0, -18.0], // Central Namibia
      zoom: 5,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    return () => map.remove();
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "100vh" }}
    />
  );
}
