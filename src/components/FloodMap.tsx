"use client";

import maplibregl from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

export default function FloodMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  const [showRivers, setShowRivers] = useState(true);
  const [showHighGround, setShowHighGround] = useState(true);
  const [showSafeZones, setShowSafeZones] = useState(true);
  const [safeZones, setSafeZones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch safe zones data
  useEffect(() => {
    fetch("/api/safe-zones")
      .then(res => res.json())
      .then(data => {
        setSafeZones(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch safe zones:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!mapContainer.current || loading) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [17.5, -18.0],
      zoom: 5,
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    // Add scale control
    map.addControl(new maplibregl.ScaleControl(), "bottom-left");

    map.on("load", () => {
      // River flood buffers
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

      // High ground areas
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

      // Safe zones markers
      if (safeZones.length > 0) {
        const safeZonesGeoJSON: GeoJSON.FeatureCollection = {
          type: "FeatureCollection",
          features: safeZones.map((zone, index) => ({
            type: "Feature",
            properties: {
              name: zone.name,
              capacity: zone.capacity,
              id: index,
            },
            geometry: {
              type: "Point",
              coordinates: [zone.longitude, zone.latitude],
            },
          })),
        };

        map.addSource("safeZones", {
          type: "geojson",
          data: safeZonesGeoJSON,
        });

        // Add markers for safe zones
        safeZones.forEach((zone) => {
          const marker = new maplibregl.Marker({ color: "#16a34a" })
            .setLngLat([zone.longitude, zone.latitude])
            .addTo(map);

          // Create popup
          const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
            `<div style="font-family: Arial, sans-serif; max-width: 200px;">
              <h4 style="margin: 0 0 8px 0; color: #16a34a;">${zone.name}</h4>
              <p style="margin: 0; font-size: 14px;">Capacity: ${zone.capacity} people</p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #666;">Safe evacuation zone</p>
            </div>`
          );

          marker.setPopup(popup);
        });
      }
    });

    return () => map.remove();
  }, [loading, safeZones]);

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
      <div style={{
        padding: "1rem",
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        alignItems: "center"
      }}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              checked={showRivers}
              onChange={() => setShowRivers(!showRivers)}
            />
            <span style={{ fontSize: "0.9rem" }}>🌊 River Flood Buffers</span>
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              checked={showHighGround}
              onChange={() => setShowHighGround(!showHighGround)}
            />
            <span style={{ fontSize: "0.9rem" }}>🏔️ High-Ground Safe Areas</span>
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              checked={showSafeZones}
              onChange={() => setShowSafeZones(!showSafeZones)}
            />
            <span style={{ fontSize: "0.9rem" }}>🏫 Safe Zone Markers ({safeZones.length})</span>
          </label>
        </div>

        <div style={{ marginLeft: "auto", fontSize: "0.9rem", color: "#666" }}>
          Click markers for shelter details
        </div>
      </div>

      <div ref={mapContainer} style={{ width: "100%", height: "90vh" }} />

      {/* Legend */}
      <div style={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
        background: "white",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        fontSize: "0.9rem"
      }}>
        <h4 style={{ margin: "0 0 0.5rem 0", color: "#0f4c81" }}>Map Legend</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "16px", height: "16px", background: "#0284c7", opacity: 0.7, borderRadius: "2px" }}></div>
            <span>River Flood Risk</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "16px", height: "16px", background: "#16a34a", opacity: 0.7, borderRadius: "2px" }}></div>
            <span>High Ground Safe Areas</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "16px", height: "16px", background: "#16a34a", borderRadius: "50%" }}></div>
            <span>Safe Zone Shelters</span>
          </div>
        </div>
      </div>
    </>
  );
}
