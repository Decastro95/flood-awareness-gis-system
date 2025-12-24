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
import { createClient } from '@supabase/supabase-js'; // Import Supabase

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// Supabase setup (add to .env.local)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface CommunityPhoto {
  id: string;
  url: string;
  description: string;
  location?: { lat: number; lng: number };
  timestamp: string;
  approved: boolean;
}

export default function Home() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]); // Track markers
  const [lng, setLng] = useState(16.5);
  const [lat, setLat] = useState(-18);
  const [zoom, setZoom] = useState(6);
  const [globe, setGlobe] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Community uploads
  const [communityPhotos, setCommunityPhotos] = useState<CommunityPhoto[]>([]);
  const [openUpload, setOpenUpload] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isAdmin, setIsAdmin] = useState(true); // Mock: Replace with real auth check

  // Fetch approved photos from Supabase
  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from('community_reports')
        .select('*')
        .eq('approved', true)
        .order('timestamp', { ascending: false });

      if (error) console.error('Error fetching photos:', error);
      else setCommunityPhotos(data || []);
    };
    fetchPhotos();
  }, []);

  // Add map pins for approved photos with location
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    communityPhotos.forEach((photo) => {
      if (photo.location) {
        const popup = new mapboxgl.Popup().setHTML(`
          <img src="${photo.url}" alt="${photo.description}" style="width: 200px; height: auto;" />
          <p>${photo.description}</p>
          <p>${new Date(photo.timestamp).toLocaleString()}</p>
        `);

        const marker = new mapboxgl.Marker({ color: 'red' })
          .setLngLat([photo.location.lng, photo.location.lat])
          .setPopup(popup)
          .addTo(map.current!);

        markers.current.push(marker);
      }
    });
  }, [communityPhotos]);

  // ... (keep map initialization useEffect unchanged) ...

  // Handle upload with Supabase
  const handleUpload = async () => {
    if (!photoFile) return;
    setUploading(true);

    // Upload to Storage
    const fileName = `${Date.now()}-${photoFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from('community-photos')
      .upload(fileName, photoFile);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      setUploading(false);
      return;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('community-photos')
      .getPublicUrl(fileName);

    // Insert to DB (approved: false)
    const { error: insertError } = await supabase
      .from('community_reports')
      .insert({
        url: publicUrl,
        description,
        location: userLocation,
        timestamp: new Date().toISOString(),
        approved: false,
      });

    if (insertError) console.error('Insert error:', insertError);
    else alert('Photo submitted! Awaiting moderation.');

    setUploading(false);
    setOpenUpload(false);
    setPhotoFile(null);
    setDescription('');
  };

  // Approve photo (admin only)
  const handleApprove = async (id: string) => {
    const { error } = await supabase
      .from('community_reports')
      .update({ approved: true })
      .eq('id', id);

    if (error) console.error('Approve error:', error);
    else {
      // Refresh photos
      const updatedPhotos = communityPhotos.map((p) =>
        p.id === id ? { ...p, approved: true } : p
      );
      setCommunityPhotos(updatedPhotos);
    }
  };

  // ... (keep handleOpenUpload unchanged) ...

  return (
    // ... (keep existing return structure) ...

    {/* Gallery with Sharing & Moderation */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
      {communityPhotos.map((photo) => (
        <div key={photo.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img src={photo.url} alt={photo.description} className="w-full h-64 object-cover" />
          <div className="p-4">
            <p className="font-semibold">{photo.description || 'Flood report'}</p>
            <p className="text-sm text-gray-600">
              {new Date(photo.timestamp).toLocaleString()}
              {photo.location ? ` • ${photo.location.lat.toFixed(2)}, ${photo.location.lng.toFixed(2)}` : ''}
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href={`https://api.whatsapp.com/send?text=Check this flood report: ${encodeURIComponent(photo.description)} ${encodeURIComponent(photo.url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-4 py-2 rounded font-semibold"
              >
                Share on WhatsApp
              </a>
              {isAdmin && !photo.approved && (
                <Button
                  variant="outlined"
                  onClick={() => handleApprove(photo.id)}
                >
                  Approve
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Fallback historical */}
      {communityPhotos.length === 0 && (
        // ... (keep your historical OptimizedImage blocks) ...
      )}
    </div>
  );
}
