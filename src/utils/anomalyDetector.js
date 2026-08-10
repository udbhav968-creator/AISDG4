/**
 * Public Transport & Journey Anomaly Engine (PS-B06 & PS-B07)
 */

// Helper distance between two lat/lng in meters
export function getHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in metres
}

/**
 * Checks if current location is within geofenced polyline corridor
 */
export function detectRouteDeviation(currentCoord, expectedPolyline, thresholdMeters = 250) {
  if (!expectedPolyline || expectedPolyline.length === 0) return false;

  let minDistance = Infinity;
  for (let point of expectedPolyline) {
    const dist = getHaversineDistance(currentCoord[0], currentCoord[1], point[0], point[1]);
    if (dist < minDistance) {
      minDistance = dist;
    }
  }

  return {
    isDeviated: minDistance > thresholdMeters,
    distanceOffRouteMeters: Math.round(minDistance),
    severity: minDistance > 600 ? 'HIGH' : minDistance > 250 ? 'MEDIUM' : 'NORMAL'
  };
}

/**
 * Detects prolonged stop in unlit or low-safety area
 */
export function detectProlongedStop(speedKmH, stoppedDurationSec, areaSafetyScore) {
  const isStopped = speedKmH === 0 || speedKmH === '0 km/h';
  const isUnsafeArea = areaSafetyScore < 60;
  const isProlonged = stoppedDurationSec > 120; // > 2 minutes

  if (isStopped && isUnsafeArea && isProlonged) {
    return {
      isAnomaly: true,
      reason: 'Prolonged vehicle halt in low-safety unlit area (> 2 minutes)',
      suggestCheckIn: true
    };
  }

  return { isAnomaly: false };
}
