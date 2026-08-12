import express from 'express';
import { db } from '../db/database.js';
import { calculateSafetyScore } from '../../src/utils/safetyCalculator.js';
import { generateFirReport } from '../../src/utils/firGenerator.js';
import authRoutes from './authRoutes.js';
import { analyzeIncidentWithGemini } from '../services/geminiService.js';
import { generateLegalFirWithClaude } from '../services/claudeService.js';
import { fetchRealStreetlampDensity } from '../services/osmService.js';

const router = express.Router();

// Mount Authentication Sub-Router
router.use('/auth', authRoutes);

// --- 1. Public Transit Telemetry APIs ---
router.get('/transit/vehicles', (req, res) => {
  res.json({ success: true, count: db.getVehicles().length, data: db.getVehicles() });
});

router.get('/transit/vehicles/:id', (req, res) => {
  const vehicle = db.getVehicles().find(v => v.id === req.params.id);
  if (!vehicle) return res.status(404).json({ success: false, error: 'Vehicle not found' });
  res.json({ success: true, data: vehicle });
});

// --- 2. Dynamic Night Safe Routes APIs ---
router.get('/routes/night-routes', (req, res) => {
  res.json({ success: true, data: db.getRoutes() });
});

// --- 3. Discreet SOS Emergency APIs ---
router.post('/sos/trigger', (req, res) => {
  const alert = db.createAlert(req.body);
  
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

// --- 4. Safe Havens & Shelters API ---
router.get('/safe-havens', (req, res) => {
  res.json({ success: true, data: db.getSafeHavens() });
});

// --- 5. Legal FIR Generator API ---
router.post('/fir/generate', (req, res) => {
  const fir = generateFirReport(req.body);
  res.json({ success: true, data: fir });
});

// --- 6. REAL AI SERVICES (Google Gemini 1.5 & Anthropic Claude 3.5 Sonnet) ---
router.post('/ai/gemini-threat', async (req, res) => {
  const { transcript, userLocation, vehicleInfo } = req.body;
  const analysis = await analyzeIncidentWithGemini(transcript, userLocation, vehicleInfo);
  res.json(analysis);
});

router.post('/ai/claude-fir', async (req, res) => {
  const firDraft = await generateLegalFirWithClaude(req.body);
  res.json(firDraft);
});

// --- 7. REAL GIS OVERPASS LIGHTING INFRASTRUCTURE API ---
router.get('/gis/osm-lighting', async (req, res) => {
  const lat = parseFloat(req.query.lat) || 28.6105;
  const lon = parseFloat(req.query.lon) || 77.2185;
  const lightingData = await fetchRealStreetlampDensity(lat, lon);
  res.json(lightingData);
});

export default router;
