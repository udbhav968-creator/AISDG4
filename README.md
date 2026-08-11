# SurakshaOne 🛡️
### Full-Stack AI Real-Time Public Transport Safety & Dynamic Safe-Route System

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey.svg)](https://expressjs.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8-black.svg)](https://socket.io/)
[![Python AI](https://img.shields.io/badge/Python%20AI-FastAPI%2FHTTP-yellow.svg)](https://python.org/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green.svg)](https://leafletjs.com/)
[![Hackathon](https://img.shields.io/badge/Theme-Women's%20Safety%20%26%20Empowerment-pink.svg)]()

---

## 📌 Full-Stack System Architecture

**SurakshaOne** is a production-grade full-stack solution integrating a Node.js Express REST API, a Socket.io WebSocket real-time engine, a Python Machine Learning AI microservice, and a React + Vite frontend.

```
                  ┌──────────────────────────────────────────┐
                  │    React 18 + Vite Frontend Dashboard    │
                  └─────┬──────────────────────────────┬─────┘
                        │                              │
         Socket.io Live │ Real-Time Telemetry          │ REST API
         Stream (Port 5000)                            │ (Port 5000)
                        ▼                              ▼
            ┌──────────────────────────────────────────────┐
            │   Express.js + Socket.io Node Server         │
            │   (Database State & SOS Broadcast Router)    │
            └──────────────────────┬───────────────────────┘
                                   │ HTTP Microservice (Port 8000)
                                   ▼
            ┌──────────────────────────────────────────────┐
            │   Python AI Risk & Anomaly Engine            │
            │   (ML Trajectory Anomaly & Risk Model)       │
            └──────────────────────────────────────────────┘
```

---

## 🚀 Key Modules & Endpoints

### 1. **Express Backend REST API (`/api/v1`)**
* `GET /api/v1/transit/vehicles` - Real-time transit telemetry, crowd level, and CCTV feeds.
* `GET /api/v1/routes/night-routes` - Night route risk scores (0-100), lighting levels, and police points.
* `POST /api/v1/sos/trigger` - Discreet SOS activation, generating SHA-256 evidence hashes and broadcasting alerts.
* `GET /api/v1/safe-havens` - 24/7 Pink Police Booths, hospitals, and open commercial sanctuaries.
* `POST /api/v1/fir/generate` - Legal First Information Report (FIR) generator API.
* `POST /api/v1/ai/copilot` - Conversational AI Copilot endpoint.

### 2. **Python AI Machine Learning Engine (`ai_engine/`)**
* `POST /predict-risk` - Machine learning model predicting risk scores based on street lighting, crowd presence, and police proximity.
* `POST /detect-anomaly` - Geofence trajectory deviation classifier.

### 3. **Socket.io Real-Time Telemetry Stream**
* Bi-directional WebSockets pushing live vehicle GPS updates, CCTV camera streams, and emergency control room alert broadcasts.

---

## 🛠️ Running the Full-Stack Application

### 1. Install Node.js Dependencies
```bash
npm install
```

### 2. Start Express Backend Server
```bash
npm run server
# Express listening on http://localhost:5000
```

### 3. Start Python AI Microservice Engine
```bash
python ai_engine/server.py
# Python AI Engine listening on http://localhost:8000
```

### 4. Start React Frontend Client
```bash
npm run dev
# React Vite running on http://localhost:3000
```

---

## 📄 License & Hackathon Info
Developed for **Innovate 4 Impact - AI SDG Global Hackathon 2026** under **Women's Safety & Empowerment** track (PS-B06 & PS-B07).
