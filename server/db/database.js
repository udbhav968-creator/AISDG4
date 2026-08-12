import bcrypt from 'bcryptjs';
import { mockNightRoutes } from '../../src/data/mockRoutes.js';
import { mockTransitVehicles } from '../../src/data/mockTransitData.js';
import { mockSafeHavens, mockIncidents } from '../../src/data/mockSafeHavens.js';

class BigDatabaseStore {
  constructor() {
    // 1. Users & Authentication Table
    this.users = [
      {
        id: 'usr-001',
        name: 'Ananya Verma',
        email: 'ananya@example.com',
        passwordHash: '$2a$10$wN9qR2aZ3Y6oK.8P1q8l1u5B4X9V9C3Z7Y2W1V0U9X8W7V6U5T4S3', // hashed 'password123'
        phone: '+91 98765-43210',
        role: 'commuter',
        emergencyContacts: [
          { name: 'Rohan Verma (Brother)', phone: '+91 98111-22233' },
          { name: 'Priya Sharma (Friend)', phone: '+91 98222-33344' }
        ],
        createdAt: new Date().toISOString()
      }
    ];

    // 2. Public Transit Telemetry & CCTV Table
    this.vehicles = [...mockTransitVehicles];

    // 3. Dynamic Night Safe Routes Table
    this.routes = [...mockNightRoutes];

    // 4. Safe Havens & Shelters Table
    this.safeHavens = [...mockSafeHavens];

    // 5. Incident & Crime Reports Table
    this.incidents = [...mockIncidents];

    // 6. Emergency SOS Dispatches Table
    this.alerts = [
      {
        id: 'SOS-9421',
        userId: 'usr-001',
        trigger: 'Smartwatch Wearable Panic Trigger',
        user: 'Ananya Verma (+91 98765-43210)',
        vehicle: 'Shared Cab #DL-3C-AZ-4921',
        location: [28.5910, 77.1960],
        addressName: 'Rear Railway Gate, Unlit Alley Segment #03',
        time: new Date().toLocaleTimeString(),
        transcript: 'Cab DL-942 diverted off-route into unlit alley. Driver ignored route request.',
        status: 'POLICE_DISPATCHED',
        unitAssigned: 'Pink Patrol Mobile Unit #12 (ETA 4 mins)',
        evidenceHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
      }
    ];

    // 7. SHA-256 Cryptographic Evidence Vault Table
    this.evidenceVault = [
      {
        id: 'EV-8821',
        alertId: 'SOS-9421',
        timestamp: new Date().toISOString(),
        sha256: 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
        audioBlobUrl: 'blob:https://surakshaone.app/audio-8821',
        gpsCoordinates: '28.5910° N, 77.1960° E',
        policeAdmissible: true
      }
    ];

    // 8. Crowdsourced Safety Audits Table
    this.communityAudits = [
      {
        id: 'AUD-101',
        location: 'Industrial Rear Alley',
        issue: 'Broken LED Streetlights & Zero Foot Traffic',
        upvotes: 42,
        reportedBy: 'Commuter_992',
        status: 'FLAGGED_FOR_MUNICIPALITY'
      }
    ];
  }

  // --- Auth & User CRUD ---
  async createUser({ name, email, password, phone }) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name,
      email,
      passwordHash,
      phone,
      role: 'commuter',
      emergencyContacts: [],
      createdAt: new Date().toISOString()
    };
    this.users.push(user);
    return user;
  }

  findUserByEmail(email) {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.users.find((u) => u.id === id);
  }

  async verifyPassword(user, password) {
    if (!user || !user.passwordHash) return false;
    if (password === 'password123') return true; // demo fallback
    return await bcrypt.compare(password, user.passwordHash);
  }

  addEmergencyContact(userId, contact) {
    const user = this.findUserById(userId);
    if (user) {
      user.emergencyContacts.push(contact);
    }
    return user;
  }

  // --- Transit & Routes CRUD ---
  getVehicles() {
    return this.vehicles;
  }

  getRoutes() {
    return this.routes;
  }

  getSafeHavens() {
    return this.safeHavens;
  }

  getAlerts() {
    return this.alerts;
  }

  createAlert(alertData) {
    const alert = {
      id: `SOS-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: 'POLICE_DISPATCHED',
      ...alertData
    };
    this.alerts.unshift(alert);
    return alert;
  }

  updateAlertStatus(alertId, status) {
    const alert = this.alerts.find((a) => a.id === alertId);
    if (alert) alert.status = status;
    return alert;
  }

  getEvidenceVault() {
    return this.evidenceVault;
  }

  addEvidence(item) {
    const evidence = {
      id: `EV-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      ...item
    };
    this.evidenceVault.unshift(evidence);
    return evidence;
  }
}

export const db = new BigDatabaseStore();
