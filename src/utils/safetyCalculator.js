/**
 * Geospatial & Safety Score Calculation Engine (PS-B07)
 */

export function calculateSafetyScore({
  lightingPercent = 80,
  crowdLevel = 'medium',
  policeProximityMeters = 500,
  openStoresCount = 5,
  recentIncidentsCount = 0,
  isNightTime = true
}) {
  let score = 50; // Base score

  // 1. Street Lighting Impact (Weight 30%)
  const lightingScore = (lightingPercent / 100) * 30;
  score += lightingScore;

  // 2. Crowd Level Impact (Weight 25%)
  let crowdScore = 15;
  if (crowdLevel === 'high' || crowdLevel === 'Very High') crowdScore = 25;
  else if (crowdLevel === 'medium' || crowdLevel === 'Medium') crowdScore = 18;
  else if (crowdLevel === 'low' || crowdLevel === 'Low') crowdScore = 8;
  else if (crowdLevel === 'isolated' || crowdLevel === 'Isolated') crowdScore = 2;
  score += crowdScore;

  // 3. Police Proximity Impact (Weight 25%)
  let policeScore = 5;
  if (policeProximityMeters <= 300) policeScore = 25;
  else if (policeProximityMeters <= 800) policeScore = 18;
  else if (policeProximityMeters <= 1500) policeScore = 10;
  score += policeScore;

  // 4. Open Commercial Businesses (Weight 10%)
  const businessScore = Math.min(openStoresCount * 2, 10);
  score += businessScore;

  // 5. Incident Penalty (Weight -15% per recent incident)
  const incidentPenalty = recentIncidentsCount * 12;
  score -= incidentPenalty;

  // Night time multiplier adjustment
  if (isNightTime) {
    score = score * 0.95;
  }

  // Clamp score between 10 and 99
  return Math.min(Math.max(Math.round(score), 10), 99);
}

export function getSafetyGrade(score) {
  if (score >= 90) return { label: 'VERY SAFE', color: '#10b981', badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' };
  if (score >= 75) return { label: 'SAFE', color: '#10b981', badgeClass: 'bg-green-500/20 text-green-400 border-green-500/40' };
  if (score >= 60) return { label: 'MODERATE RISK', color: '#f59e0b', badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/40' };
  if (score >= 40) return { label: 'HIGH RISK', color: '#f97316', badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/40' };
  return { label: 'CRITICAL DANGER', color: '#ef4444', badgeClass: 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse' };
}
