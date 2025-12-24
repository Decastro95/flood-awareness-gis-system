'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import {
  Drawer,
  IconButton,
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import OptimizedImage from '@/components/OptimizedImage';
import RealTimeAlerts from '@/components/RealTimeAlerts';
import WeatherForecast from '@/components/WeatherForecast';

import { createClient } from '@supabase/supabase-js';

// =======================
// CONFIG
// =======================
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// =======================
// TYPES
// =======================
interface CommunityPhoto {
  id: string;
  url: string;
  description: string;
  location?: { lat: number; lng: number };
  timestamp: string;
  approved: boolean;
}

// =======================
// COMPONENT
// =======================
export default function Home() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  // Map state
  const [lng, setLng] = useState(16.5);
  const [lat, setLat] = useState(-18);
  const [zoom, setZoom] = useState(6);

  // UI
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);

  // Community uploads
  const [communityPhotos, setCommunityPhotos] = useState<CommunityPhoto[]>([]);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Admin (mock)
  const [isAdmin, setIsAdmin] = useState(true);

  // =======================
  // SMS ALERT STATE
  // =======================
  const [alertMessage, setAlertMessage] = useState('');
  const [alertRegion, setAlertRegion] = useState('all');
  const [sendingAlert, setSendingAlert] = useState(false);

  const [subscribePhone, setSubscribePhone] = useState('');
  const [subscribeRegion, setSubscribeRegion] = useState('');

  // =======================
  // FETCH APPROVED PHOTOS
  // =======================
  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase
        .from('community_reports')
        .select('*')
        .eq('approved', true)
        .order('timestamp', { ascending: false });

      if (!error && data) setCommunityPhotos(data);
    };

    fetchPhotos();
  }, []);

  // =======================
  // MAP MARKERS
  // =======================
  useEffect(() => {
    if (!map.current) return;

    markers.current.forEach((m) => m.remove());
    markers.current = [];

    communityPhotos.forEach((photo) => {
      if (!photo.location) return;

      const popup = new mapboxgl.Popup().setHTML(`
        <img src="${photo.url}" style="width:200px;border-radius:8px" />
        <p>${photo.description}</p>
        <small>${new Date(photo.timestamp).toLocaleString()}</small>
      `);

      const marker = new mapboxgl.Marker({ color: '#d32f2f' })
        .setLngLat([photo.location.lng, photo.location.lat])
        .setPopup(popup)
        .addTo(map.current!);

      markers.current.push(marker);
    });
  }, [communityPhotos]);

  // =======================
  // SEND SMS ALERT (DEMO)
  // =======================
  const sendSMSAlert = async (message: string, region = 'all') => {
    setSendingAlert(true);

    const query =
      region === 'all'
        ? supabase.from('sms_subscribers').select('phone_number')
        : supabase.from('sms_subscribers').select('phone_number').eq('region', region);

    const { data, error } = await query;

    if (error || !data?.length) {
      alert('No subscribers found.');
      setSendingAlert(false);
      return;
    }

    alert(`SMS would be sent to ${data.length} subscribers.\n\n"${message}"`);

    await supabase.from('flood_alerts').insert({
      message,
      region: region === 'all' ? null : region,
    });

    setSendingAlert(false);
    setAlertMessage('');
  };

  // =======================
  // RENDER
  // =======================
  return (
    <Box className="p-6">
      <Typography variant="h4" className="mb-6">
        Flood Awareness GIS – Northern Namibia
      </Typography>

      {/* ADMIN ALERT PANEL */}
      {isAdmin && (
        <Box className="mb-10 p-4 bg-yellow-100 rounded-lg">
          <Typography variant="h6">Send Flood SMS Alert</Typography>

          <TextField
            fullWidth
            label="Alert Message"
            value={alertMessage}
            onChange={(e) => setAlertMessage(e.target.value)}
            className="my-4"
          />

          <FormControl fullWidth>
            <InputLabel>Region</InputLabel>
            <Select
              value={alertRegion}
              label="Region"
              onChange={(e) => setAlertRegion(e.target.value)}
            >
              <MenuItem value="all">All Regions</MenuItem>
              <MenuItem value="Ohangwena">Ohangwena</MenuItem>
              <MenuItem value="Oshana">Oshana</MenuItem>
              <MenuItem value="Omusati">Omusati</MenuItem>
              <MenuItem value="Oshikoto">Oshikoto</MenuItem>
            </Select>
          </FormControl>

          <Button
            className="mt-4"
            variant="contained"
            disabled={!alertMessage || sendingAlert}
            onClick={() => sendSMSAlert(alertMessage, alertRegion)}
          >
            {sendingAlert ? 'Sending…' : 'Send Alert'}
          </Button>
        </Box>
      )}

      {/* SUBSCRIBE */}
      <Box className="mb-12 text-center">
        <Typography variant="h6">Subscribe to SMS Flood Alerts</Typography>

        <TextField
          label="Phone (+264...)"
          value={subscribePhone}
          onChange={(e) => setSubscribePhone(e.target.value)}
          className="m-2"
        />

        <Select
          value={subscribeRegion}
          onChange={(e) => setSubscribeRegion(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">Select Region</MenuItem>
          <MenuItem value="Ohangwena">Ohangwena</MenuItem>
          <MenuItem value="Oshana">Oshana</MenuItem>
        </Select>

        <Button
          className="ml-4"
          onClick={async () => {
            await supabase.from('sms_subscribers').insert({
              phone_number: subscribePhone,
              region: subscribeRegion,
            });
            alert('Subscribed!');
            setSubscribePhone('');
          }}
        >
          Subscribe
        </Button>
      </Box>
    </Box>
  );
}
