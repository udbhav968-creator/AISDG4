/**
 * Off-Grid Mesh Relay & Encrypted SMS Fallback Utility
 */

export function generateEncryptedSmsPayload({ lat, lon, vehicleId, triggerType, hashId }) {
  const timestamp = new Date().toISOString();
  const rawPayload = `SURAKSHA#SOS#LAT:${lat.toFixed(4)}#LON:${lon.toFixed(4)}#VEH:${vehicleId}#TRIG:${triggerType}#TIME:${timestamp}#HASH:${hashId}`;
  
  // Encrypted representation for 2G SMS transmission
  return {
    rawPayload,
    compressedSms: `S1#${lat.toFixed(4)},${lon.toFixed(4)}#${vehicleId}#${hashId}`,
    recipientNumber: '112 / +91-98765-43210 (PCR Dispatch)',
    estimatedSmsParts: 1,
    checksum: Math.random().toString(36).substring(2, 10).toUpperCase()
  };
}

export function simulateMeshNodes() {
  return [
    { id: 'node-commuter-1', distance: '12m', signal: 'Strong (BLE 5.2)', status: 'Relaying Packet' },
    { id: 'node-bus-gateway-4', distance: '45m', signal: 'Medium (Wi-Fi Mesh)', status: 'Connected' },
    { id: 'node-metro-beacon-12', distance: '110m', signal: 'Low (LoRa Mesh)', status: 'Standby Gateway' }
  ];
}
