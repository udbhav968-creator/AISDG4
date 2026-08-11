/**
 * Full-Stack REST API Service Client
 */

const API_BASE_URL = 'http://localhost:5000/api/v1';
const AI_ENGINE_URL = 'http://localhost:8000';

export async function fetchTransitVehicles() {
  try {
    const res = await fetch(`${API_BASE_URL}/transit/vehicles`);
    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

export async function fetchNightRoutes() {
  try {
    const res = await fetch(`${API_BASE_URL}/routes/night-routes`);
    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

export async function triggerDiscreetSOS(sosPayload) {
  try {
    const res = await fetch(`${API_BASE_URL}/sos/trigger`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sosPayload)
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function predictAIRiskScore(lighting, crowd, policeDist, openStores) {
  try {
    const res = await fetch(`${AI_ENGINE_URL}/predict-risk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lighting, crowd, police_dist_m: policeDist, open_stores: openStores })
    });
    return await res.json();
  } catch {
    return null;
  }
}
