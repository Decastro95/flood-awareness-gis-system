'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Drawer, IconButton, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import OptimizedImage from '@/components/OptimizedImage'; // Your component
import RealTimeAlerts from '@/components/RealTimeAlerts';
import WeatherForecast from '@/components/WeatherForecast';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Home() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(16.5);
  const [lat, setLat] = useState(-18);
  const [zoom, setZoom] = useState(6);
  const [globe, setGlobe] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [lng, lat],
      zoom: zoom,
      projection: globe ? 'globe' : 'mercator',
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      // Replace with your actual flood data source
      map.current!.addSource('flood-zones', {
        type: 'geojson',
        data: 'https://example.com/flood_zones.geojson',
      });
      map.current!.addLayer({
        id: 'flood-fill',
        type: 'fill',
        source: 'flood-zones',
        paint: { 'fill-color': '#EF4444', 'fill-opacity': 0.6 },
      });
    });

    map.current.on('move', () => {
      const center = map.current!.getCenter();
      setLng(center.lng.toFixed(4));
      setLat(center.lat.toFixed(4));
      setZoom(map.current!.getZoom().toFixed(2));
    });

    return () => map.current?.remove();
  }, [globe]);

  return (
    <div className="relative w-full h-screen flex flex-col overflow-hidden">
      {/* Hero Background Image (subtle overlay) */}
      <OptimizedImage
        src="/pdna-2009-cover.jpg"
        alt="2009 Namibia Floods – Aerial view of inundated areas and relief camp"
        className="absolute inset-0 z-0 opacity-30 object-cover"
        width={1920}
        height={1080}
      />

      {/* Mobile Header */}
      <div className="md:hidden bg-blue-800/90 p-4 flex justify-between items-center text-white z-20">
        <Typography variant="h6">Flood Awareness GIS</Typography>
        <IconButton onClick={() => setMobileOpen(!mobileOpen)} color="inherit">
          <MenuIcon />
        </IconButton>
      </div>

      {/* Map Container */}
      <div ref={mapContainer} className="flex-1 relative z-10" />

      {/* Desktop Sidebar */}
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-80 bg-blue-900/95 text-white p-6 overflow-y-auto z-20">
        <Typography variant="h5" className="mb-6">Flood Dashboard</Typography>
        <RealTimeAlerts />
        <WeatherForecast />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        anchor="bottom"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ style: { height: '80%', borderTopLeftRadius: 16, borderTopRightRadius: 16 } }}
      >
        <Box className="p-6 bg-blue-900 text-white h-full overflow-y-auto">
          <Typography variant="h6" className="text-center mb-6">Dashboard</Typography>
          <RealTimeAlerts />
          <WeatherForecast />
        </Box>
      </Drawer>

      {/* Overlay Controls & Info */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-8 py-4 rounded-lg z-20 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Flood Awareness GIS System</h1>
        <p className="text-lg">Northern Namibia • Real-time Risk Mapping</p>
      </div>

      <div className="absolute top-4 right-4 space-y-4 z-20">
        <button
          onClick={() => setGlobe(!globe)}
          className="bg-white px-6 py-3 rounded-lg shadow-lg font-semibold"
        >
          {globe ? '2D View' : '3D Globe'}
        </button>
        <div className="bg-white/90 text-black p-4 rounded-lg shadow-lg text-sm">
          <p>Lng: {lng} | Lat: {lat} | Zoom: {zoom}</p>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 bg-red-600 text-white p-6 rounded-lg shadow-xl max-w-sm z-20">
        <h3 className="text-xl font-bold mb-2">Current Alert</h3>
        <p>High rainfall expected in Oshana & Ohangwena – Monitor water levels closely.</p>
      </div>

      {/* Scrollable Content Below Map (Historical Context) */}
      <div className="relative z-20 bg-white/95 backdrop-blur-md py-20">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
            Historical Context & System Prototypes
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
            <OptimizedImage
              src="/dref-floods-cover.png"
              alt="2009 IFRC DREF – Flooded household in Ohangwena Region"
            />
            <OptimizedImage
              src="/regions-constituencies.png"
              alt="Namibia Regions, Municipalities & Constituencies – Administrative boundaries"
              width={1000}
              height={800}
            />
            <OptimizedImage
              src="/thesis-cover.png"
              alt="2011 Floods Thesis – Oshoopala Informal Settlement, Oshakati"
            />
            <OptimizedImage
              src="/prototype-home-blue.png"
              alt="System Prototype – Blue Homepage Design"
            />
            <OptimizedImage
              src="/prototype-alerts-orange.png"
              alt="System Prototype – Alerts & Risk Mapping Interface"
            />
            <OptimizedImage
              src="/dsm-paper.png"
              alt="Directorate of Survey and Mapping – Namibia Digital Cadastral System"
            />
          </div>

          <div className="text-center text-lg text-gray-700 max-w-4xl mx-auto">
            <p>
              This platform builds on lessons from the devastating 2009 and 2011 floods,
              as documented in the Government PDNA, IFRC reports, and academic research.
              Community-driven reporting and accurate administrative boundaries are key to effective early warning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
