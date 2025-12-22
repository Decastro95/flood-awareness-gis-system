"use client";

import maplibregl from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

export default function FloodMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  const [showRivers, setShowRivers] = useState(true);
  const [showHighGround, setShowHighGround] = useState(true);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [17.5, -18.0],
      zoom: 5,
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      map.addSource("riverFloodBuffers", {
        type: "geojson",
        data: "/data/river_flood_buffers.geojson",
      });

      map.addLayer({
        id: "river-fill",
        type: "fill",
        source: "riverFloodBuffers",
        paint: {
          "fill-color": "#0284c7",
          "fill-opacity": 0.35,
        },
      });

      map.addLayer({
        id: "river-outline",
        type: "line",
        source: "riverFloodBuffers",
        paint: {
          "line-color": "#075985",
          "line-width": 2,
        },
      });

      map.addSource("highGround", {
        type: "geojson",
        data: "/data/high_ground_elevation.geojson",
      });

      map.addLayer({
        id: "high-ground-fill",
        type: "fill",
        source: "highGround",
        paint: {
          "fill-color": "#16a34a",
          "fill-opacity": 0.35,
        },
      });

      map.addLayer({
        id: "high-ground-outline",
        type: "line",
        source: "highGround",
        paint: {
          "line-color": "#166534",
          "line-width": 2,
        },
      });
    });

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setLayoutProperty(
      "river-fill",
      "visibility",
      showRivers ? "visible" : "none"
    );
    mapRef.current.setLayoutProperty(
      "river-outline",
      "visibility",
      showRivers ? "visible" : "none"
    );
  }, [showRivers]);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setLayoutProperty(
      "high-ground-fill",
      "visibility",
      showHighGround ? "visible" : "none"
    );
    mapRef.current.setLayoutProperty(
      "high-ground-outline",
      "visibility",
      showHighGround ? "visible" : "none"
    );
  }, [showHighGround]);

  return (
    <>
      <div style={{ padding: "0.5rem", background: "#ffffff" }}>
        <label style={{ marginRight: "1rem" }}>
          <input
            type="checkbox"
            checked={showRivers}
            onChange={() => setShowRivers(!showRivers)}
          />{" "}
          River Flood Buffers
        </label>

        <label>
          <input
            type="checkbox"
            checked={showHighGround}
            onChange={() => setShowHighGround(!showHighGround)}
          />{" "}
          High-Ground Safe Areas
        </label>
      </div>

      <div ref={mapContainer} style={{ width: "100%", height: "90vh" }} />
    </>
  );
}
