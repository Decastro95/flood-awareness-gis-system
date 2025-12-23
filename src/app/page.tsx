"use client";

import { useEffect } from "react";
import Link from "next/link";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function HomePage() {
  useEffect(() => {
    // Set Mapbox access token
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    // Create map
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v11",
      center: [15.0, -17.8], // Northern Namibia (Oshana floodplain)
      zoom: 7,
      pitch: 45,
      bearing: 0,
      antialias: true,
    });

    // Add controls
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("load", () => {
      /* ===============================
         FLOOD ZONES (ESRI-STYLE COLORS)
         =============================== */
      map.addSource("flood-zones", {
        type: "geojson",
        data: "/data/flood_zones.geojson",
      });

      map.addLayer({
        id: "flood-zones-layer",
        type: "fill",
        source: "flood-zones",
        paint: {
          "fill-color": [
            "step",
            ["get", "severity"],
            "#edf8fb", // very low
            1, "#b2e2e2",
            2, "#66c2a4",
            3, "#2ca25f",
            4, "#006d2c" // extreme
          ],
          "fill-opacity": 0.65,
          "fill-outline-color": "#00441b",
        },
      });

      /* ===============================
         TERRAIN + HILLSHADE (HIGH GROUND)
         =============================== */
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.terrain-rgb",
        tileSize: 512,
        maxzoom: 14,
      });

      map.setTerrain({
        source: "mapbox-dem",
        exaggeration: 1.3,
      });

      map.addLayer({
        id: "hillshade",
        type: "hillshade",
        source: "mapbox-dem",
        paint: {
          "hillshade-exaggeration": 0.4,
        },
      });

      /* ===============================
         SMOOTH ENTRY (ARCGIS FEEL)
         =============================== */
      map.easeTo({
        zoom: 8,
        pitch: 50,
        duration: 2000,
      });
    });

    // Cleanup
    return () => map.remove();
  }, []);

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
              href="/alerts"
              className="btn btn-secondary"
              style={{ fontSize: "1.1rem", padding: "1rem 2rem" }}
            >
              🚨 Emergency Alerts
            </Link>
          </div>
        </div>
      </header>

      {/* Map Section */}
      <div style={{ flex: 1, position: "relative" }}>
        <div
          id="map"
          style={{
            height: "100%",
            width: "100%",
          }}
        />

        {/* Overlay Info */}
        <div className="card" style={{
          position: "absolute",
          bottom: "30px",
          left: "30px",
          maxWidth: "350px",
          border: "1px solid #e5e7eb"
        }}>
          <h3 style={{ margin: "0 0 1rem 0", color: "#1e3a8a", fontSize: "1.4rem", fontWeight: "600" }}>
            🏞️ Northern Namibia Overview
          </h3>
          <p style={{ margin: "0 0 1.5rem 0", fontSize: "1rem", color: "#64748b", lineHeight: 1.5 }}>
            This interactive map shows flood risk zones, terrain elevation, and safe areas across the region.
          </p>
          <div style={{ fontSize: "0.9rem", color: "#6b7280" }}>
            <div style={{ fontWeight: "600", marginBottom: "0.75rem", color: "#374151" }}>Map Legend:</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <div style={{
                width: "16px",
                height: "16px",
                background: "linear-gradient(to right, #edf8fb, #006d2c)",
                borderRadius: "3px",
                flexShrink: 0
              }}></div>
              <span>Flood Risk Zones</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                width: "16px",
                height: "16px",
                background: "#16a34a",
                opacity: 0.7,
                borderRadius: "3px",
                flexShrink: 0
              }}></div>
              <span>High Ground Safe Areas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
