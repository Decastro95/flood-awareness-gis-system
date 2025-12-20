# flood-awareness-gis-system
A GIS-based flood awareness and risk mapping system for Northern Namibia.
🌊 Flood Awareness & Risk Mapping System

A GIS-Based Public Information Platform for Flood Preparedness and Response

The system implements GIS-based flood hazard visualization using GeoJSON polygon overlays rendered through MapLibre GL JS. Flood-prone zones are spatially represented and overlaid onto an interactive base map, enabling clear identification of high-risk areas.

A️⃣ Safe Zones & Shelters (Supabase + Map markers)
Supports evacuation & disaster response

B️⃣ Flood Alerts & Rainfall Indicators
Supports early warning system

A user-friendly public information dashboard designed to improve situational awareness and decision-making during flood events.

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