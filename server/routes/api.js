import express from 'express';
import { db } from '../db/database.js';
import { calculateSafetyScore } from '../../src/utils/safetyCalculator.js';
import { detectRouteDeviation } from '../../src/utils/anomalyDetector.js';
import { generateFirReport } from '../../src/utils/firGenerator.js';
import { analyzeAudioStream } from '../../src/utils/voiceClassifier.js';

const router = express.Router();

// 1. Transit Vehicles API
router.get('/transit/vehicles', (req, res) => {
  res.json({ success: true, count: db.getVehicles().length, data: db.getVehicles() });
});

router.get('/transit/vehicles/:id', (req, res) => {
  const vehicle = db.getVehicleById(req.params.id);
  if (!vehicle) return res.status(404).json({ success: false, error: 'Vehicle not found' });
  res.json({ success: true, data: vehicle });
});

// 2. Safe Night Routes API
router.get('/routes/night-routes', (req, res) => {
  res.json({ success: true, data: db.getRoutes() });
});

// 3. Dynamic Safety Score Calculator API
router.post('/routes/calculate-risk', (req, res) => {
  const { lightingPercent, crowdLevel, policeProximityMeters, openStoresCount, recentIncidentsCount } = req.body;
  const score = calculateSafetyScore({
    lightingPercent,
    crowdLevel,
    policeProximityMeters,
    openStoresCount,
    recentIncidentsCount
  });
  res.json({ success: true, safetyScore: score });
});

// 4. Discreet Emergency SOS API
router.post('/sos/trigger', (req, res) => {
  const alert = db.createAlert(req.body);
  
  // Also emit real-time WebSocket if io attached
  const io = req.app.get('io');
  if (io) {
    io.emit('emergency_sos_alert', alert);
  }

  res.status(201).json({ success: true, data: alert });
});

router.get('/sos/alerts', (req, res) => {
  res.json({ success: true, data: db.getAlerts() });
});

router.patch('/sos/alerts/:id/status', (req, res) => {
  const alert = db.updateAlertStatus(req.params.id, req.body.status);
  
  const io = req.app.get('io');
  if (io) {
    io.emit('alert_status_updated', alert);
  }

  res.json({ success: true, data: alert });
});

// 5. Safe Havens Radar API
router.get('/safe-havens', (req, res) => {
  res.json({ success: true, data: db.getSafeHavens() });
});

// 6. FIR Report Generator API
router.post('/fir/generate', (req, res) => {
  const fir = generateFirReport(req.body);
  res.json({ success: true, data: fir });
});

// 7. AI Conversational Copilot API
router.post('/ai/copilot', (req, res) => {
  const { prompt } = req.body;
  const lower = (prompt || '').toLowerCase();
  
  let reply = 'Suraksha AI is monitoring your route. You are currently in a well-lit corridor.';
  if (lower.includes('bus') || lower.includes('512')) {
    reply = 'DTC Bus #512 is currently ON-ROUTE with a High Safety Index (92/100). Verified driver with 14 female commuters onboard.';
  } else if (lower.includes('hospital') || lower.includes('safe')) {
    reply = 'Nearest Safe Haven: AIIMS Emergency Trauma Care (1.2 km away) and 24 Seven All-Night Pharmacy (1.8 km).';
  } else if (lower.includes('check-in')) {
    reply = 'Automated silent check-in countdown set for 15 minutes.';
  }

  res.json({ success: true, reply });
});

export default router;
