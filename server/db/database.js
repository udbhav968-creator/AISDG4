import { mockNightRoutes } from '../../src/data/mockRoutes.js';
import { mockTransitVehicles } from '../../src/data/mockTransitData.js';
import { mockSafeHavens, mockIncidents } from '../../src/data/mockSafeHavens.js';

// In-Memory & Persistent State Store for Full-Stack Engine
class DatabaseStore {
  constructor() {
    this.routes = [...mockNightRoutes];
    this.vehicles = [...mockTransitVehicles];
    this.safeHavens = [...mockSafeHavens];
    this.incidents = [...mockIncidents];
    this.alerts = [
      {
        id: 'SOS-9421',
        trigger: 'Smartwatch Wearable Triple-Press Panic Trigger',
        user: 'Ananya Verma (+91 98765-43210)',
        vehicle: 'Shared Cab #DL-3C-AZ-4921',
        location: [28.5910, 77.1960],
        addressName: 'Rear Railway Gate, Unlit Alley Segment #03',
        time: new Date().toLocaleTimeString(),
        transcript: 'Emergency! Cab DL-942 diverted off-route into unlit alley. Driver ignored route request.',
        status: 'POLICE_DISPATCHED',
        unitAssigned: 'Pink Patrol Mobile Unit #12 (ETA 4 mins)'
      }
    ];
    this.evidenceVault = [];
    this.communityAudits = [];
  }

  getRoutes() {
    return this.routes;
  }

  getVehicles() {
    return this.vehicles;
  }

  getVehicleById(id) {
    return this.vehicles.find(v => v.id === id);
  }

  updateVehicleLocation(id, location, status) {
    const v = this.getVehicleById(id);
    if (v) {
      v.currentLocation = location;
      if (status) v.geofenceStatus = status;
    }
    return v;
  }

  getSafeHavens() {
    return this.safeHavens;
  }

  getAlerts() {
    return this.alerts;
  }

  createAlert(alertData) {
    const newAlert = {
      id: `SOS-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: 'POLICE_DISPATCHED',
      ...alertData
    };
    this.alerts.unshift(newAlert);
    return newAlert;
  }

  updateAlertStatus(alertId, newStatus) {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = newStatus;
    }
    return alert;
  }
}

export const db = new DatabaseStore();
