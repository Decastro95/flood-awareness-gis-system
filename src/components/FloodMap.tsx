"use client";

import maplibregl from "maplibre-gl";
import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

export default function FloodMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [18.5, -17.8],
      zoom: 5,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      // Kavango & Zambezi River Flood Buffers
      map.addSource("riverFloodBuffers", {
        type: "geojson",
        data: "/data/river_flood_buffers.geojson",
      });

      map.addLayer({
        id: "river-flood-buffers-fill",
        type: "fill",
        source: "riverFloodBuffers",
        paint: {
          "fill-color": "#0284c7",
          "fill-opacity": 0.35,
        },
      });

      map.addLayer({
        id: "river-flood-buffers-outline",
        type: "line",
        source: "riverFloodBuffers",
        paint: {
          "line-color": "#075985",
          "line-width": 2,
        },
      });

      // Click popup
      map.on("click", "river-flood-buffers-fill", (e) => {
        const feature = e.features?.[0];
        if (!feature) return;

        new maplibregl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(
            `<strong>${feature.properties?.river}</strong><br/>High Flood Risk Zone`
          )
          .addTo(map);
      });

      map.on("mouseenter", "river-flood-buffers-fill", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "river-flood-buffers-fill", () => {
        map.getCanvas().style.cursor = "";
      });
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
}
