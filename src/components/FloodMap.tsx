"use client";

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function FloodMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new maplibregl.Map({
      container: mapContainer.current!,
      style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
      center: [16.0, -18.0], // starting position [lng, lat] - approximate center of Namibia
      zoom: 6 // starting zoom
    });

    map.current.on('load', () => {
      // Add flood zones layer
      map.current!.addSource('flood-zones', {
        type: 'geojson',
        data: '/data/flood_zones.geojson'
      });

      map.current!.addLayer({
        id: 'flood-zones-fill',
        type: 'fill',
        source: 'flood-zones',
        paint: {
          'fill-color': [
            'match',
            ['get', 'risk_level'],
            'high', '#ff0000',
            'medium', '#ffa500',
            'low', '#ffff00',
            '#cccccc'
          ],
          'fill-opacity': 0.6
        }
      });

      // Add safe zones layer (assuming there's a safe_zones.geojson or similar)
      // This is a placeholder - adjust based on actual data
    });
  });

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
}