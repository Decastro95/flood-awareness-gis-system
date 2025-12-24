'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Drawer, IconButton, Box, Typography, Button, Modal, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import OptimizedImage from '@/components/OptimizedImage';
import RealTimeAlerts from '@/components/RealTimeAlerts';
import WeatherForecast from '@/components/WeatherForecast';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// Types for community photos
interface CommunityPhoto {
  id: string;
  url: string;
  description: string;
  location?: { lat: number; lng: number };
  timestamp: string;
}

export default function Home() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(16.5);
  const [lat, setLat] = useState(-18);
  const [zoom, setZoom] = useState(6);
  const [globe, setGlobe] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Community uploads state
  const [communityPhotos, setCommunityPhotos] = useState<CommunityPhoto[]>([]);
  const [openUpload, setOpenUpload] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

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
      // Your flood zones layer here
    });

    map.current.on('move', () => {
      const center = map.current!.getCenter();
      setLng(center.lng.toFixed(4));
      setLat(center.lat.toFixed(4));
      setZoom(map.current!.getZoom().toFixed(2));
    });

    return () => map.current?.remove();
  }, [globe]);

  // Handle photo upload (mock for now)
  const handleUpload = async () => {
    if (!photoFile) return;
    setUploading(true);

    // Mock: Create object URL for preview
    const previewUrl = URL.createObjectURL(photoFile);

    // In real app: Upload to Supabase Storage, get public URL, save metadata to DB
    const newPhoto: CommunityPhoto = {
      id: Date.now().toString(),
      url: previewUrl,
      description,
      location: userLocation || undefined,
      timestamp: new Date().toISOString(),
    };

    setCommunityPhotos([newPhoto, ...communityPhotos]);
    setUploading(false);
    setOpenUpload(false);
    setPhotoFile(null);
    setDescription('');
  };

  // Get user location on upload open
  const handleOpenUpload = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.warn('Geolocation error:', err)
    );
    setOpenUpload(true);
  };

  return (
    <div className="relative w-full h-screen flex flex-col overflow-hidden">
      {/* Subtle Hero Background */}
      <OptimizedImage
        src="/pdna-2009-cover.jpg"
        alt="2009 Namibia Floods"
        className="absolute inset-0 z-0 opacity-30 object-cover"
        width={1920}
        height={1080}
      />

      {/* Map & Existing Overlays (unchanged for brevity) */}
      <div ref={mapContainer} className="flex-1 relative z-10" />
      {/* ... (keep your existing sidebar, drawer, controls, alerts) ... */}

      {/* Floating Report Button */}
      <Button
        variant="contained"
        color="error"
        size="large"
        startIcon={<CameraAltIcon />}
        onClick={handleOpenUpload}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 px-8 py-4 text-lg font-bold shadow-2xl"
      >
        Report Flood Photo
      </Button>

      {/* Upload Modal */}
      <Modal open={openUpload} onClose={() => setOpenUpload(false)}>
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-2xl w-11/12 max-w-md">
          <Typography variant="h5" className="mb-6 text-center">Report a Flood Situation</Typography>
          <input
            type="file"
            accept="image/*"
            capture="environment" // Mobile camera
            onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
            className="mb-4 w-full"
          />
          {photoFile && <img src={URL.createObjectURL(photoFile)} alt="Preview" className="w-full rounded mb-4" />}
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description (e.g., location, water level)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-6"
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleUpload}
            disabled={uploading || !photoFile}
          >
            {uploading ? 'Uploading...' : 'Submit Report'}
          </Button>
        </Box>
      </Modal>

      {/* Community Photo Gallery (scrollable below map) */}
      <div className="relative z-20 bg-white/95 backdrop-blur-md py-20">
        <div className="container mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
            Community-Reported Flood Photos
          </h2>
          <p className="text-center text-lg text-gray-700 mb-12 max-w-4xl mx-auto">
            Real-time photos submitted by citizens in Northern Namibia. Help build awareness — report what you see!
          </p>

          {communityPhotos.length === 0 ? (
            <div className="text-center text-gray-500">
              <p className="text-xl mb-8">No community photos yet — be the first to report!</p>
              <p className="mb-12">In the meantime, here are historical flood impacts:</p>
            </div>
          ) : null}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Dynamic community photos */}
            {communityPhotos.map((photo) => (
              <div key={photo.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img src={photo.url} alt={photo.description} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <p className="font-semibold">{photo.description || 'Flood report'}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(photo.timestamp).toLocaleDateString()} 
                    {photo.location ? ` • ${photo.location.lat.toFixed(2)}, ${photo.location.lng.toFixed(2)}` : ''}
                  </p>
                </div>
              </div>
            ))}

            {/* Fallback historical photos if no submissions */}
            {communityPhotos.length === 0 && (
              <>
                <OptimizedImage src="/dref-floods-cover.png" alt="2009 Flooded household in Ohangwena" />
                <OptimizedImage src="/pdna-2009-cover.jpg" alt="2009 Aerial flood view & relief camp" />
                <OptimizedImage src="/thesis-cover.png" alt="2011 Oshoopala settlement floods" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
