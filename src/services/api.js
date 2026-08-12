/**
 * Full-Stack REST API Client with Authentication & Multi-AI Models
 */

const API_BASE_URL = 'http://localhost:5000/api/v1';

// Token Helper
function getAuthHeader() {
  const token = localStorage.getItem('suraksha_jwt_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// 1. AUTHENTICATION APIS
export async function loginUser(email, password) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('suraksha_jwt_token', data.token);
    }
    return data;
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function registerUser(name, email, password, phone) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, phone })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('suraksha_jwt_token', data.token);
    }
    return data;
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function fetchUserProfile() {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { ...getAuthHeader() }
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// 2. MULTI-AI MODELS APIS
export async function runAIRouteRiskModel(lightingPercent, crowdLevel, policeProximityMeters, openStoresCount) {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/route-risk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lightingPercent, crowdLevel, policeProximityMeters, openStoresCount })
    });
    return await res.json();
  } catch {
    return null;
  }
}

export async function runAITrajectoryAnomalyModel(currentLat, currentLon) {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/trajectory-anomaly`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentLat, currentLon })
    });
    return await res.json();
  } catch {
    return null;
  }
}

export async function runAIDriverBehaviorModel(speedKmH, accelerationSpikes) {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/driver-behavior`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ speedKmH, accelerationSpikes })
    });
    return await res.json();
  } catch {
    return null;
  }
}

export async function runAIAcousticDistressModel(decibelLevel, detectedKeywords) {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/distress-audio`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ decibelLevel, detectedKeywords })
    });
    return await res.json();
  } catch {
    return null;
  }
}

export async function runAICopilotNLP(prompt) {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/copilot-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    return await res.json();
  } catch {
    return null;
  }
}
