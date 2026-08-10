# SurakshaOne 🛡️
### AI Real-Time Public-Transport Safety & Dynamic Safe-Route Planning for Women

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple.svg)](https://vitejs.dev/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green.svg)](https://leafletjs.com/)
[![Hackathon](https://img.shields.io/badge/Theme-Women's%20Safety%20%26%20Empowerment-pink.svg)]()

---

## 📌 Executive Summary

**SurakshaOne** is an end-to-end, AI-powered women's safety platform that unifies real-time public transport monitoring (**PS-B06**) and dynamic night safe-route navigation (**PS-B07**) into a seamless, high-performance web application.

Designed for commuters in urban public transit (buses, metro, shared cabs) and night travellers, SurakshaOne combines vehicle location telemetry, crowd level heatmaps, street lighting indices, discreet SOS triggers, wearable integration, and automated emergency control room dispatches.

---

## 🎯 Problem Statements Solved

### 1. PS-B06: Real-Time Public-Transport Safety System for Women
* **Live Transit Monitoring**: Continuous GPS tracking for electric buses, metro coaches, and shared cabs with stop-by-stop safety ratings.
* **Anomaly & Route Deviation Engine**: Automatic detection when a public bus or cab departs from its designated geofenced route or halts unexpectedly in low-safety areas (> 2 mins).
* **Discreet SOS Activation**: Shake gesture, secret PIN duress code, smartwatch BLE trigger, and volume key sequence demo.
* **Ambient Audio & Evidence Capture**: Simulated real-time speech-to-text transcript recording and snapshot stream to Pink Patrol emergency control rooms.

### 2. PS-B07: Dynamic Safe-Route Planning for Women Travelling at Night
* **Multi-Route Safety Comparison**: Compares **Safest Route**, **Fastest Route**, and **Balanced Route** with dynamic Safety Score (0-100).
* **Transparent Risk Scoring**: Clear explanations detailing why a route is recommended (e.g. "+35% Smart LED lighting", "4 Pink Booths on path", "Avoids unlit underpass").
* **Live Environmental Blackout Simulation**: Evaluators can trigger a simulated streetlight blackout event to observe real-time AI auto-rerouting to safer corridors.
* **Nearest Safe Haven Radar**: One-tap navigation to 24/7 Pink Police Booths, hospitals, and open commercial sanctuaries.

---

## 🛠️ Technology Stack

* **Frontend Framework**: React 18 + Vite
* **Styling**: Tailwind CSS + Custom Dark Glassmorphism Design System
* **Mapping Engine**: Leaflet + React-Leaflet + OpenStreetMap CartoDB Dark Tiles
* **Icons & Visuals**: Lucide Icons + Canvas Confetti
* **Analytics & Graphs**: Recharts

---

## 🚀 Quick Start & Installation

```bash
# 1. Clone the repository
git clone https://github.com/udbhav968-creator/AISDG4.git
cd AISDG4

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open your browser at `http://localhost:3000` to view the application.

---

## 🧪 Evaluator Simulation Guide (1-Tap Toolbar)

The bottom floating toolbar provides instant evaluation controls for hackathon judges:

| Action Button | Feature Tested | Description |
| :--- | :--- | :--- |
| **Route Deviation** | PS-B06 | Moves Shared Cab #DL-942 off-route into an unlit alley, triggering an alert banner & silent check-in prompt. |
| **Prolonged Halt** | PS-B06 | Simulates vehicle stopping in an unsafe zone for > 4 minutes, triggering automated safety check-in countdown. |
| **Night Blackout** | PS-B07 | Simulates a sudden streetlight outage on the shortcut path, triggering instant AI rerouting & score updates. |
| **Smartwatch SOS** | Wearable | Triggers the discreet emergency SOS modal with 10s countdown, audio transcript, and Pink Patrol dispatch. |

---

## 📄 License & Team
Developed for Hackathon submission under **Women's Safety & Empowerment** track.
