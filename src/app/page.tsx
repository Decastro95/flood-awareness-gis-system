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
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Hero Header */}
      <header style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)",
        color: "white",
        padding: "2rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"20\" cy=\"20\" r=\"2\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"80\" cy=\"80\" r=\"1\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"60\" cy=\"30\" r=\"1.5\" fill=\"rgba(255,255,255,0.1)\"/></svg>')",
          opacity: 0.3
        }}></div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{
            fontSize: "3rem",
            fontWeight: "bold",
            margin: "0 0 1rem 0",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)"
          }}>
            🌊 Flood Awareness GIS System
          </h1>
          <p style={{
            fontSize: "1.25rem",
            margin: "0 0 2rem 0",
            opacity: 0.9,
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto"
          }}>
            Interactive flood risk mapping and public awareness platform for Northern Namibia
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/map"
              style={{
                background: "white",
                color: "#1e3a8a",
                padding: "1rem 2rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "1rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                transition: "transform 0.2s"
              }}
            >
              🗺️ View Interactive Map
            </Link>
            <Link
              href="/alerts"
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "white",
                padding: "1rem 2rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "1rem",
                border: "2px solid white",
                transition: "background 0.2s"
              }}
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
        <div style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          background: "white",
          padding: "1.5rem",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          maxWidth: "300px"
        }}>
          <h3 style={{ margin: "0 0 1rem 0", color: "#1e3a8a", fontSize: "1.25rem" }}>
            🏞️ Northern Namibia Overview
          </h3>
          <p style={{ margin: "0 0 1rem 0", fontSize: "0.9rem", color: "#64748b" }}>
            This map shows flood risk zones, terrain elevation, and safe areas across the region.
          </p>
          <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
            <strong>Legend:</strong>
            <div style={{ display: "flex", alignItems: "center", marginTop: "0.5rem" }}>
              <div style={{
                width: "12px",
                height: "12px",
                background: "linear-gradient(to right, #edf8fb, #006d2c)",
                borderRadius: "2px",
                marginRight: "0.5rem"
              }}></div>
              <span>Flood Risk Zones</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
