// src/app/page.js
'use client';
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Drawer, IconButton, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RealTimeAlerts from '@/components/RealTimeAlerts'; // Create this component
import WeatherForecast from '@/components/WeatherForecast'; // Create this component

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN; // Add to .env.local

export default function Home() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(16.5);
  const [lat, setLat] = useState(-18);
  const [zoom, setZoom] = useState(6);
  const [globe, setGlobe] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Dark professional theme
      center: [lng, lat],
      zoom: zoom,
      projection: globe ? 'globe' : 'mercator',
    });
    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    // Example: Add flood zone layer (replace with your Supabase GeoJSON URL)
    map.current.on('load', () => {
      map.current.addSource('flood-zones', {
        type: 'geojson',
        data: 'https://your-supabase-url/storage/v1/object/public/flood_zones.geojson', // Or fetch dynamically
      });
      map.current.addLayer({
        id: 'flood-fill',
        type: 'fill',
        source: 'flood-zones',
        paint: {
          'fill-color': '#EF4444',
          'fill-opacity': 0.6,
        },
      });
    });
    // Update state on move
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, [globe]);

  return (
    <div className="relative w-full h-screen flex flex-col">
      {/* Mobile Header with Menu */}
      <div className="md:hidden bg-blue-800 p-4 flex justify-between items-center text-white">
        <Typography variant="h6">Flood Awareness GIS</Typography>
        <IconButton onClick={() => setMobileOpen(!mobileOpen)} color="inherit">
          <MenuIcon />
        </IconButton>
      </div>
      {/* Map Container - Full Screen */}
      <div ref={mapContainer} id="map-container" className="flex-1 absolute inset-0 md:relative" />
      {/* Desktop Sidebar */}
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-80 bg-blue-900 text-white p-4 overflow-y-auto">
        <Typography variant="h5" className="mb-4">Flood Dashboard</Typography>
        <RealTimeAlerts />
        <WeatherForecast />
      </div>
      {/* Mobile Drawer (Bottom Sheet Style) */}
      <Drawer
        anchor="bottom"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ style: { height: '80%', borderTopLeftRadius: 16, borderTopRightRadius: 16 } }}
      >
        <Box className="p-4 bg-blue-900 text-white h-full overflow-y-auto">
          <Typography variant="h6" className="text-center mb-4">Dashboard</Typography>
          <RealTimeAlerts />
          <WeatherForecast />
        </Box>
      </Drawer>
      {/* Touch-Friendly Controls Overlay */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button className="bg-white px-6 py-3 rounded-full shadow-lg text-lg">Interactive Map</button>
        <button className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg text-lg">Emergency Alerts</button>
      </div>
      {/* Overlay Header */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent text-white">
        <h1 className="text-3xl font-bold">Flood Awareness GIS System</h1>
        <p className="text-lg">Northern Namibia • Flood Season Active</p>
      </div>
      {/* Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <button
          onClick={() => setGlobe(!globe)}
          className="bg-white px-4 py-2 rounded shadow hover:bg-gray-200"
        >
          {globe ? '2D View' : '3D Globe'}
        </button>
        <div className="bg-white p-4 rounded shadow">
          <p>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</p>
        </div>
      </div>
      {/* Alerts Panel */}
      <div className="absolute bottom-4 left-4 bg-red-600 text-white p-4 rounded shadow max-w-sm">
        <h3 className="font-bold">Emergency Alert</h3>
        <p>High rainfall expected in Oshana Region – Prepare evacuation routes.</p>
      </div>
    </div>
  );
}
