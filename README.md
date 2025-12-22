# flood-awareness-gis-system
A GIS-based flood awareness and risk mapping system for Northern Namibia.
🌊 Flood Awareness & Risk Mapping System

#REPORT#

A GIS-Based Public Information Platform for Flood Preparedness and Response

The system is deployed on Vercel, providing a publicly accessible, cloud-hosted GIS dashboard. The deployment uses serverless API routes for flood alerts, safe zones, and weather data integration. Environment variables are securely managed through Vercel’s settings to protect API keys and database credentials.

The system incorporates seasonal flood awareness logic, with heightened alert sensitivity during the peak flood months of January to March.

Schools and community facilities were selected as safe zones due to their accessibility, structural capacity, and historical use during flood displacement events.

The system is designed for the oshana floodplain environment of northern Namibia, where seasonal efundja flooding shapes settlement patterns, livelihoods, and disaster vulnerability.

The system focuses on Namibia’s northern regions, particularly the Four O regions and adjoining flood-prone basins, where seasonal efundja flooding is a recurring hazard. By integrating spatial floodplain data, elevation models, population-sensitive alert prioritization, and live meteorological indicators, the dashboard provides situational awareness tailored to the environmental and socio-cultural context of northern Namibia

The system implements GIS-based flood hazard visualization using GeoJSON polygon overlays rendered through MapLibre GL JS. Flood-prone zones are spatially represented and overlaid onto an interactive base map, enabling clear identification of high-risk areas.

The system integrates real-time and near–real-time meteorological data from authoritative open APIs, elevation data derived from digital elevation models, and spatial datasets representing flood-prone and flood-free zones. These datasets are visualized through an interactive GIS dashboard to support flood awareness, early warning, and evacuation planning in Northern Namibia.

The system integrates a spatially enabled database using Supabase and PostGIS to store flood-free safe zones and evacuation shelters. These locations are dynamically retrieved and visualized on the GIS dashboard using map markers, enabling users to identify nearby safe areas during flood events.

The system supports near–real-time flood monitoring through periodic data updates, simulating live sensor feeds.

The system integrates data from authoritative open meteorological APIs.

Real-time rainfall and weather indicators are retrieved from OpenWeatherMap’s public API.

Digital Elevation Models (DEM) were used to identify high-ground areas suitable for evacuation and shelter placement.

Safe zones include public infrastructure such as schools and community halls identified through OpenStreetMap and validated through literature and historical flood response reports.

The system integrates an early warning module that displays flood alerts and rainfall indicators using a spatially enabled backend. Alerts are dynamically retrieved from the database and visually classified by severity, supporting timely public awareness and disaster preparedness.

The dashboard integrates live meteorological data via OpenWeatherMap’s API. Rainfall, temperature, humidity, and weather conditions are dynamically visualized, providing near-real-time flood risk awareness. Color-coded alerts assist in identifying areas requiring immediate attention.

A️⃣ Safe Zones & Shelters (Supabase + Map markers)
Supports evacuation & disaster response

B️⃣ Flood Alerts & Rainfall Indicators
Supports early warning system

Kavango and Zambezi river flood buffer zones were implemented using GIS polygon overlays to represent areas at elevated risk of flooding during peak rainfall seasons. These buffers improve spatial awareness of river-related flood hazards in northern and north-eastern Namibia.

1️⃣ SYSTEM ARCHITECTURE DIAGRAM (FOR REPORT / README)

You can include this exact diagram in your assignment (as text or redraw it in Draw.io / PowerPoint).

┌────────────────────────────────────────────┐
│            Public Web Browser               │
│        (Students / Community Users)         │
└────────────────────────────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────────┐
│          Vercel (Next.js Frontend)           │
│  - Flood Awareness Dashboard                 │
│  - MapLibre GIS Map                           │
│  - Weather & Alert Panels                    │
└────────────────────────────────────────────┘
         │                     │
         │                     │
         ▼                     ▼
┌───────────────────┐   ┌────────────────────┐
│ Next.js API Routes │   │ External APIs       │
│ (Serverless)       │   │                    │
│                    │   │ • OpenWeatherMap   │
│ • /api/weather     │   │   (Rainfall, Temp) │
│ • /api/alerts      │   │                    │
│ • /api/safe-zones  │   └────────────────────┘
└───────────────────┘
         │
         ▼
┌────────────────────────────────────────────┐
│          Supabase (PostgreSQL + PostGIS)     │
│                                            │
│ • Safe Zones (schools, halls)               │
│ • Flood Alerts                              │
│ • Historical flood data                     │
└────────────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────┐
│          Spatial Data Files (GeoJSON)        │
│                                            │
│ • Flood Risk Zones                          │
│ • Elevation / High Ground Areas             │
└────────────────────────────────────────────┘

The system follows a cloud-based architecture where a Next.js frontend deployed on Vercel consumes serverless API routes that integrate spatial datasets, live weather services, and a PostGIS-enabled Supabase backend.

The system is deployed on Vercel and is publicly accessible via a live URL, allowing real-time demonstration of the flood awareness dashboard, GIS layers, and weather integration.

A user-friendly public information dashboard designed to improve situational awareness and decision-making during flood events.

2️⃣ LIVE URL (HOW TO PRESENT IT)

In your README or assignment, include this section:

Live System URL:
https://your-project-name.vercel.app

3️⃣ WEATHER INTEGRATION (OPENWEATHERMAP)
What is integrated

Live rainfall (mm)

Temperature

Humidity

Weather condition (rain, clouds, storms)

How it works (technical but simple)

OpenWeatherMap API provides real-time weather data

Data is fetched via a Next.js API route

The dashboard updates automatically every 60 seconds

Rainfall values are used as flood risk indicators

Example flow:
OpenWeatherMap API
      ↓
/api/weather (Next.js)
      ↓
Weather Widget (Dashboard)

The system integrates live meteorological data from OpenWeatherMap through a serverless API. Rainfall intensity, temperature, and humidity are dynamically displayed and updated periodically, supporting early flood warning and situational awareness.

4️⃣ FLOOD LAYERS (GIS CORE OF YOUR PROJECT)
Flood Risk Zones

Stored as GeoJSON polygon layers

Represent flood-prone low-lying areas

Displayed in red on the map

High Ground / Safe Areas

Derived from Digital Elevation Models (DEM)

Areas with higher elevation classified as safer

Used to support evacuation planning

Safe Zones (Schools & Halls)

Stored in Supabase (PostGIS)

Displayed as green markers

Include:

Schools

Community halls

Shelters

How layers are combined
Base Map (MapLibre)
   + Flood Risk Polygons
   + Elevation / High Ground Overlay
   + Safe Zone Markers


📌:

Flood-prone zones are visualized using GeoJSON polygon overlays, while flood-free safe zones such as schools and community halls are represented as spatial point features. These GIS layers enable clear identification of high-risk areas and suitable evacuation locations.

📌 Project Overview

Flooding is a recurring natural hazard in Northern Namibia, particularly affecting regions such as Ovamboland (Oshana, Oshikoto, Ohangwena, Omusati), Kavango, Kunene, and Zambezi. These flood events frequently result in displacement of communities, damage to infrastructure, and disruption of livelihoods.

This project implements a web-based GIS flood awareness system designed to provide public access to flood risk information, improve early awareness, and support emergency preparedness and evacuation planning. The system visualizes flood-prone zones, safe areas for evacuation, and near–real-time environmental indicators using interactive digital maps.

The system serves as a functional prototype developed for academic purposes and aligns with the research proposal titled:

“Identifying Flood Risk and Flood-Free Areas for Emergency Evacuations and Temporary Shelters in Northern Namibia Using GIS-Based Systems”

🎯 Project Aim

The main aim of this project is to develop a user-friendly, GIS-based flood risk management platform that enhances disaster preparedness and response by:

Identifying flood-prone zones

Delineating flood-free areas suitable for evacuation and shelters

Providing spatial flood awareness to the public and decision-makers

✅ Key Objectives

Visualize historical and simulated flood risk zones using GIS mapping techniques

Display safe zones and temporary shelter locations

Integrate near–real-time rainfall or flood indicator data

Demonstrate how GIS technology can support early warning and evacuation planning

Provide a scalable and accessible web-based prototype for flood awareness

🗺️ System Features

🌍 Interactive Web Map

Zoomable and pannable map interface

Base maps for geographic context

🔴 Flood Risk Zones

Flood-prone areas visualized using GeoJSON polygon layers

Risk classification (e.g., High, Medium)

🟢 Flood-Free / Safe Zones

Locations suitable for evacuation and temporary shelters

Stored as spatial point data

📡 Simulated Live Data Feeds

Rainfall or flood indicators updated periodically

Demonstrates real-time monitoring capability

🗄️ Spatial Database

Centralized data storage using PostGIS-enabled PostgreSQL

Supports spatial queries for proximity and risk analysis

🧠 System Architecture
Frontend (Next.js / React)
│
│── Interactive Map (MapLibre / Leaflet)
│── Flood Risk Layers (GeoJSON)
│── Safe Zones & Alerts Dashboard
│
Backend (Supabase)
│
│── PostgreSQL + PostGIS
│── Flood Reports Table
│── Safe Zones Table
│── REST & Realtime APIs
│
Deployment
│
│── GitHub (Version Control)
│── Vercel (Hosting & CI/CD)
│── CodeSandbox (Prototyping)

🛠️ Technologies Used
Frontend

Next.js (React Framework)

MapLibre GL JS / Leaflet

TypeScript

Backend

Supabase

PostgreSQL

PostGIS (Spatial Extensions)

Realtime APIs

Deployment & Tools

GitHub – Source code management

Vercel – Cloud deployment

CodeSandbox – Rapid prototyping

🧪 Data Sources (Academic & Open)

OpenStreetMap (base map and settlements)

Open satellite-derived flood datasets (e.g., Sentinel, Copernicus – where applicable)

Simulated hydrological and rainfall data for demonstration purposes

⚠️ Note: Live sensor feeds are simulated to demonstrate system capability in an academic environment.

📊 Database Design (Supabase)
Flood Reports Table
Field	Description
id	Unique identifier
location	Geographic point (PostGIS)
severity	Flood severity level
description	Flood details
created_at	Timestamp
Safe Zones Table
Field	Description
id	Unique identifier
name	Shelter or safe area name
location	Geographic point
capacity	Estimated shelter capacity
🔍 GIS & Spatial Analysis Concepts Applied

Spatial data visualization using GeoJSON

Overlay analysis (flood zones vs settlements)

Proximity analysis (safe zones near affected areas)

GIS-based risk mapping principles

Disaster Risk Reduction (DRR) framework alignment

📚 Academic Alignment

This project aligns with the following concepts outlined in the research proposal:

Disaster Risk Reduction (DRR)

Hazard, Vulnerability, and Capacity (HVC) model

GIS-based flood hazard mapping

Community-focused disaster preparedness

Early warning and evacuation planning

🚀 Deployment

The system is publicly accessible via Vercel and automatically redeploys on every GitHub update.

🔗 Live Demo: (add your Vercel URL here)

📂 GitHub Repository: (this repository)

🔐 Ethics & Data Considerations

No personal or sensitive data is collected

All spatial data used is open, simulated, or anonymized

System is designed strictly for educational and research purposes

🧾 Disclaimer

This project is a prototype developed for academic purposes.
It is not an official flood warning system and should not replace government-issued alerts.

👨‍🎓 Author

Name: Immanuel T Ndatipo
Programme: Bachelor of Science in Computer Science & Information Technology (Honours) NQA LEVEL 7
Institution: Triumphant College (Distance Programme)
Year: 2025