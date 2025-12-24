'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

type FloodFeature = {
  id: string;
  name: string;
  risk_level: 'Low' | 'Medium' | 'High';
  geom: any; // PostGIS geometry (will be converted to GeoJSON)
};

type Props = {
  map: mapboxgl.Map | null;
};

export default function SupabaseFloodLayer({ map }: Props) {
  useEffect(() => {
    if (!map) return;

    const loadFloodData = async () => {
      // Option A: Simple – fetch rows and use PostGIS function ST_AsGeoJSON
      const { data, error } = await supabase
        .rpc('get_flood_zones_geojson') // ← recommended (see SQL below)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        return;
      }

      const geojson = data?.get_flood_zones_geojson || { type: 'FeatureCollection', features: [] };

      // Add / update source
      if (map.getSource('supabase-flood-zones')) {
        (map.getSource('supabase-flood-zones') as mapboxgl.GeoJSONSource).setData(geojson);
      } else {
        map.addSource('supabase-flood-zones', {
          type: 'geojson',
          data: geojson,
        });

        map.addLayer({
          id: 'supabase-flood-fill',
          type: 'fill',
          source: 'supabase-flood-zones',
          paint: {
            'fill-color': [
              'match',
              ['get', 'risk_level'],
              'High', '#ef4444',
              'Medium', '#f59e0b',
              'Low', '#10b981',
              '#cccccc',
            ],
            'fill-opacity': 0.6,
          },
        });

        map.addLayer({
          id: 'supabase-flood-outline',
          type: 'line',
          source: 'supabase-flood-zones',
          paint: {
            'line-color': '#000',
            'line-width': 1,
          },
        });
      }
    };

    // Load once when map is ready
    if (map.isStyleLoaded()) {
      loadFloodData();
    } else {
      map.on('load', loadFloodData);
    }

    // Optional: reload when map moves (for very large datasets)
    // map.on('moveend', loadFloodData);
  }, [map]);

  return null;
}
